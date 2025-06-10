// const bcrypt = require('bcrypt');
//
//
// module.exports = (app, svc, jwt) => {
//
//     app.get("/useraccount", jwt.validateJWT, async (req, res) => {
//         try {
//             const userAccounts = await svc.dao.getAll();
//             res.json(userAccounts);
//         } catch (error) {
//             console.error("Erreur lors de la récupération de tous les comptes utilisateur :", error);
//             res.status(500).json({ error: "Erreur interne du serveur" });
//         }
//     });
//
//     app.get("/useraccount/logout",async (req, res) => {
//         res.json({ message: "Déconnexion réussie" });
//     });
//
//     app.post("/useraccount/register", async (req, res) => {
//         try {
//             const useraccount = req.body;
//
//             // Insertion de l'utilisateur dans la base de données
//             svc.insert(useraccount.displayName, useraccount.login, useraccount.password, useraccount.isEnterprise)
//                 .then(_ => {
//                     res.status(201).json({ message: "Utilisateur enregistré avec succès" });
//                 })
//                 .catch(e => {
//                     console.error("Erreur lors de l'inscription de l'utilisateur :", e);
//                     res.status(500).json({ error: "Erreur interne du serveur" });
//                 });
//         } catch (e) {
//             console.error("Erreur lors de l'inscription de l'utilisateur :", e);
//             res.status(500).json({ error: "Erreur interne du serveur" });
//         }
//     });
//
//     app.post('/useraccount/authenticate', (req, res) => {
//         try {
//             const { login, password } = req.body;
//             if ((login === undefined) || (password === undefined)) {
//                 res.status(400).end();
//                 return;
//             }
//             svc.validatePassword(login, password)
//                 .then(authenticated => {
//                     if (!authenticated) {
//                         res.status(401).end();
//                         return;
//                     }
//                     // Génération du token JWT en cas d'authentification réussie
//                     res.json({ 'token': jwt.generateJWT(login) });
//                 })
//                 .catch(e => {
//                     console.error("Erreur lors de l'authentification :", e);
//                     res.status(500).end();
//                 });
//         } catch (e) {
//             console.error("Erreur lors de l'authentification :", e);
//             res.status(500).end();
//         }
//     });
//
// };
const bcrypt = require('bcrypt');

module.exports = (app, svc, jwt) => {
    app.get("/useraccount", jwt.validateJWT, async (req, res) => {
        try {
            const userAccounts = await svc.dao.getAll();
            res.json(userAccounts);
        } catch (error) {
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.get("/useraccount/logout", async (req, res) => {
        res.json({ message: "Déconnexion réussie" });
    });

    app.post("/useraccount/register", async (req, res) => {
        const { displayName, login, password, isEnterprise, role = "user" } = req.body;

        const parsedIsEnterprise = isEnterprise === 'true' ? true : isEnterprise === 'false' ? false : isEnterprise;

        console.log("🧪 Champs reçus :", {
            displayName,
            login,
            password,
            isEnterprise,
            role,
            type_isEnterprise: typeof isEnterprise
        });

        if (!displayName || !login || !password || (parsedIsEnterprise !== true && parsedIsEnterprise !== false)) {
            console.log("❌ Champs invalides : envoi 400");
            return res.status(400).json({ error: "Tous les champs sont requis (displayName, login, password, isEnterprise)" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await svc.insert(displayName, login, hashedPassword, parsedIsEnterprise, role);
            res.status(201).json({ message: "Utilisateur enregistré avec succès" });
        } catch (e) {
            console.error("❌ Erreur dans /register:", e);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.post('/useraccount/authenticate', async (req, res) => {
        try {
            const { login, password } = req.body;
            if (!login || !password) {
                return res.status(400).json({ error: "Identifiants manquants" });
            }
            const authenticated = await svc.validatePassword(login, password);
            if (!authenticated) {
                return res.status(401).json({ error: "Identifiants invalides" });
            }
            const token = await jwt.generateJWT(login);
            res.json({ token });
        } catch (e) {
            console.error("Erreur d'authentification:", e);
            res.status(500).json({ error: "Erreur serveur" });
        }
    });

    app.get('/admin/only', jwt.validateJWT, (req, res) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Accès interdit : rôle insuffisant" });
        }
        res.status(200).json({ message: "Bienvenue, admin !" });
    });

    app.get('/useraccount/profile', jwt.validateJWT, async (req, res) => {
        const user = req.user;
        res.json({
            id: user.id,
            displayName: user.displayName,
            login: user.login,
            isEnterprise: user.isEnterprise,
            role: user.role || 'user'
        });
    });
    app.put('/useraccount/update', jwt.validateJWT, async (req, res) => {
        try {
            const { displayName, password } = req.body;
            const userId = req.user.id;

            await svc.updateProfile(userId, displayName, password);
            res.status(200).json({ message: "Profil mis à jour avec succès" });
        } catch (error) {
            console.error("Erreur update profile:", error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    });
    app.get('/admin/users', jwt.validateJWT, jwt.authorizeRole(['admin']), async (req, res) => {
        try {
            console.log("✅ Requête admin/users par :", req.user.login); // Ajout
            const users = await svc.dao.getAll(); // Assure-toi que cette fonction existe dans le DAO
            res.json(users);
        } catch (error) {
            console.error("❌ Erreur dans /admin/users:", error);
            res.status(500).json({ error: "Erreur interne serveur" });
        }
    });
    app.get("/admin/dashboardData", jwt.validateJWT, jwt.authorizeRole(['admin']), async (req, res) => {
        try {
            const users = await svc.dao.getAll();
            const factures = await app.locals.factureService.dao.getAllFacture();
            const produits = await app.locals.factureService.dao.getAllProducts();
            res.json({ users, factures, produits });
        } catch (err) {
            console.error("Erreur /admin/dashboardData:", err);
            res.status(500).json({ error: "Erreur serveur" });
        }
    });

    app.get('/admin/test', jwt.validateJWT, jwt.authorizeRole(['admin']), (req, res) => {
        res.send('👑 Bienvenue admin !');
    });


};