// module.exports = (app, svc, jwt) => {
//
//     app.get("/produitWithUser", jwt.validateJWT, async (req, res) => {
//         if (!req.user || !req.user.id) {
//             return res.status(401).json({ error: "Utilisateur non authentifié" });
//         }
//         try {
//             const produits = await svc.dao.getProduitsByUser(req.user.id);
//             res.json(produits);
//         } catch (e) {
//             console.error("Erreur lors de la récupération des produits :", e);
//             res.status(500).json({ error: "Erreur interne du serveur" });
//         }
//     });
//     app.get("/produit/:id", async (req, res) => {
//         try {
//             const produit = await svc.dao.getById(req.params.id);
//             if (produit === undefined) {
//                 return res.status(404).end();
//             }
//             return res.json(produit);
//         } catch (e) {
//             res.status(400).end();
//         }
//     });
//
//     app.post("/produit/registerProduit", jwt.validateJWT, async (req, res) => {
//         try {
//             const produit = req.body;
//
//             if (!req.user || !req.user.id) {
//                 console.error("Informations de l'utilisateur manquantes dans la requête");
//                 return res.status(401).json({ error: "Informations de l'utilisateur manquantes" });
//             }
//
//             const id_useraccount = req.user.id;
//
//             svc.insertProduit(produit.titrep, produit.categorie_p, produit.prix_p, id_useraccount)
//                 .then(_ => {
//                     res.status(201).json({ message: "Produit enregistré avec succès" });
//                 })
//                 .catch(e => {
//                     console.error("Erreur lors de l'enregistrement du produit :", e);
//                     res.status(500).json({ error: "Erreur interne du serveur" });
//                 });
//         } catch (e) {
//             console.error("Erreur lors de l'enregistrement du produit :", e);
//             res.status(500).json({ error: "Erreur interne du serveur" });
//         }
//     });
//
//
//     app.delete("/produit/:id", async (req, res) => {
//         const produit = await svc.dao.getById(req.params.id);
//         if (produit === undefined) {
//             return res.status(404).end();
//         }
//         svc.dao.delete(req.params.id)
//             .then(_ => res.status(200).end())
//             .catch(e => {
//                 console.log(e);
//                 res.status(500).end();
//             });
//     });
//
//     app.put("/produit", async (req, res) => {
//         const produit = req.body;
//         if (await svc.dao.getById(produit.id) === undefined) {
//             return res.status(404).end();
//         }
//         svc.dao.updateProduit(produit)
//             .then(_ => res.status(200).end())
//             .catch(e => {
//                 console.log(e);
//                 res.status(500).end();
//             });
//     });
// };
// ProduitApi.js
module.exports = (app, svc, jwt) => {

    app.get("/produitWithUser", jwt.validateJWT, async (req, res) => {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Utilisateur non authentifié" });
        }
        try {
            const produits = await svc.dao.getProduitsByUser(req.user.id);
            res.json(produits);
        } catch (e) {
            console.error("Erreur lors de la récupération des produits :", e);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.get("/produit/:id", async (req, res) => {
        try {
            const produit = await svc.dao.getProduitById(req.params.id);
            if (produit === undefined) {
                return res.status(404).end();
            }
            return res.json(produit);
        } catch (e) {
            res.status(400).end();
        }
    });

    app.post("/produit/registerProduit", jwt.validateJWT, async (req, res) => {
        try {
            const produit = req.body;

            if (!req.user || !req.user.id) {
                console.error("Informations de l'utilisateur manquantes dans la requête");
                return res.status(401).json({ error: "Informations de l'utilisateur manquantes" });
            }

            const id_useraccount = req.user.id;

            svc.insertProduit(produit.titrep, produit.categorie_p, produit.prix_p, id_useraccount)
                .then(_ => {
                    res.status(201).json({ message: "Produit enregistré avec succès" });
                })
                .catch(e => {
                    console.error("Erreur lors de l'enregistrement du produit :", e);
                    res.status(500).json({ error: "Erreur interne du serveur" });
                });
        } catch (e) {
            console.error("Erreur lors de l'enregistrement du produit :", e);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.delete("/produit/:id", jwt.validateJWT, async (req, res) => {
        try {
            const produit = await svc.dao.getProduitById(req.params.id);
            if (produit === undefined) {
                return res.status(404).end();
            }
            if (produit.id_useraccount !== req.user.id) {
                return res.status(403).json({ error: "Accès non autorisé" });
            }
            await svc.deleteProduit(req.params.id, req.user.id);
            res.status(200).end();
        } catch (e) {
            console.log(e);
            res.status(500).end();
        }
    });

    app.put("/produit", jwt.validateJWT, async (req, res) => {
        const produit = req.body;
        try {
            const existingProduit = await svc.dao.getProduitById(produit.id);
            if (existingProduit === undefined) {
                return res.status(404).end();
            }
            if (existingProduit.id_useraccount !== req.user.id) {
                return res.status(403).json({ error: "Accès non autorisé" });
            }
            await svc.updateProduit(produit, req.user.id);
            res.status(200).end();
        } catch (e) {
            console.log(e);
            res.status(500).end();
        }
    });
};
