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
        try {
            const { displayName, login, password, isEnterprise } = req.body;
            if (!login || !password || password.length < 6) {
                return res.status(400).json({ error: "Identifiants invalides" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("👤 DONNÉES ENVOYÉES :", { displayName, login, password, isEnterprise });
            await svc.insert(displayName, login, hashedPassword, isEnterprise);
            res.status(201).json({ message: "Utilisateur enregistré avec succès" });
        } catch (e) {
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.post('/useraccount/authenticate', async (req, res) => {
        try {
            const { login, password } = req.body;
            if (!login || !password) {
                return res.status(400).end();
            }
            const authenticated = await svc.validatePassword(login, password);
            if (!authenticated) {
                return res.status(401).end();
            }
            const token = await jwt.generateJWT(login);
            res.json({ token });
        } catch (e) {
            res.status(500).end();
        }
    });

    app.get('/admin/only', jwt.validateJWT, (req, res) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Accès interdit : rôle insuffisant" });
        }
        res.status(200).json({ message: "Bienvenue, admin !" });
    });
};