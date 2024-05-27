const bcrypt = require('bcrypt');


module.exports = (app, svc, jwt) => {

    app.get("/useraccount", jwt.validateJWT, async (req, res) => {
        try {
            const userAccounts = await svc.dao.getAll();
            res.json(userAccounts);
        } catch (error) {
            console.error("Erreur lors de la récupération de tous les comptes utilisateur :", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.get("/useraccount/logout",async (req, res) => {
        res.json({ message: "Déconnexion réussie" });
    });

    app.post("/useraccount/register", async (req, res) => {
        try {
            const useraccount = req.body;

            // Insertion de l'utilisateur dans la base de données
            svc.insert(useraccount.displayName, useraccount.login, useraccount.password, useraccount.isEnterprise)
                .then(_ => {
                    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
                })
                .catch(e => {
                    console.error("Erreur lors de l'inscription de l'utilisateur :", e);
                    res.status(500).json({ error: "Erreur interne du serveur" });
                });
        } catch (e) {
            console.error("Erreur lors de l'inscription de l'utilisateur :", e);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.post('/useraccount/authenticate', (req, res) => {
        try {
            const { login, password } = req.body;
            if ((login === undefined) || (password === undefined)) {
                res.status(400).end();
                return;
            }
            svc.validatePassword(login, password)
                .then(authenticated => {
                    if (!authenticated) {
                        res.status(401).end();
                        return;
                    }
                    // Génération du token JWT en cas d'authentification réussie
                    res.json({ 'token': jwt.generateJWT(login) });
                })
                .catch(e => {
                    console.error("Erreur lors de l'authentification :", e);
                    res.status(500).end();
                });
        } catch (e) {
            console.error("Erreur lors de l'authentification :", e);
            res.status(500).end();
        }
    });

};