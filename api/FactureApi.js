// module.exports = (app, svc, jwt) => {
//     app.get("/facture", async (req, res) => {
//         res.json(await svc.dao.getAllFacture());
//     });
//
//     app.get("/facture/produit", async (req, res) => { // Définir la route pour récupérer les produits
//         try {
//             const products = await svc.getAllProducts();
//             res.json(products);
//         } catch (err) {
//             console.error("Erreur lors de la récupération des produits :", err);
//             res.status(500).json({ error: "Erreur interne du serveur" });
//         }
//     });
//
//     // app.post("/facture/registerFacture", jwt.validateJWT, async (req, res) => {
//     //     try {
//     //         const facture = req.body;
//     //         const statut = facture.statut === "true";
//     //
//     //         svc.insertFacture(
//     //             facture.titre,
//     //             facture.categorie_f,
//     //             facture.prix_f,
//     //             statut,
//     //             facture.adresse_facturation,
//     //             facture.produit_f,
//     //             facture.prix_ttc
//     //         ).then(_ => {
//     //             res.status(201).json({ message: "Facture enregistrée avec succès" });
//     //         }).catch(e => {
//     //             console.error("Erreur lors de l'enregistrement de la facture :", e);
//     //             res.status(500).json({ error: "Erreur interne du serveur" });
//     //         });
//     //     } catch (e) {
//     //         console.error("Erreur lors de l'enregistrement de la facture :", e);
//     //         res.status(500).json({ error: "Erreur interne du serveur" });
//     //     }
//     // });
//     app.post("/facture/registerFacture", jwt.validateJWT, async (req, res) => {
//         try {
//             const facture = req.body;
//             const statut = facture.statut === "true";
//             const userId = req.user.id; // Assurez-vous que l'ID de l'utilisateur est accessible
//
//             svc.insertFacture(
//                 facture.titre,
//                 facture.categorie_f,
//                 facture.prix_f,
//                 statut,
//                 facture.adresse_facturation,
//                 facture.produit_f,
//                 facture.prix_ttc,
//                 userId // Passer l'ID de l'utilisateur
//             ).then(_ => {
//                 res.status(201).json({ message: "Facture enregistrée avec succès" });
//             }).catch(e => {
//                 console.error("Erreur lors de l'enregistrement de la facture :", e);
//                 res.status(500).json({ error: "Erreur interne du serveur" });
//             });
//         } catch (e) {
//             console.error("Erreur lors de l'enregistrement de la facture :", e);
//             res.status(500).json({ error: "Erreur interne du serveur" });
//         }
//     });
//     app.delete("/facture/:id", async (req, res) => {
//         const facture = await svc.dao.getById(req.params.id);
//         if (facture === undefined) {
//             return res.status(404).end();
//         }
//         svc.dao.delete(req.params.id)
//             .then(_ => res.status(200).end())
//             .catch(e => {
//                 console.error(e);
//                 res.status(500).end();
//             });
//     });
//
//     app.put("/facture", async (req, res) => {
//         const facture = req.body;
//         if (await svc.dao.getById(facture.id) === undefined) {
//             return res.status(404).end();
//         }
//         svc.dao.updateFacture(facture)
//             .then(_ => res.status(200).end())
//             .catch(e => {
//                 console.error(e);
//                 res.status(500).end();
//             });
//     });
// };
// factureapi.js

module.exports = (app, svc, jwt) => {
    app.get("/facture", jwt.validateJWT, async (req, res) => {
        res.json(await svc.dao.getAllFacture());
    });

    app.get("/facture/produit", async (req, res) => {
        try {
            const products = await svc.getAllProducts();
            res.json(products);
        } catch (err) {
            console.error("Erreur lors de la récupération des produits :", err);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.get("/facture/user", jwt.validateJWT, async (req, res) => {
        try {
            const userId = req.user.id;
            const factures = await svc.getFacturesByUserId(userId);
            res.json(factures);
        } catch (err) {
            console.error("Erreur lors de la récupération des factures :", err);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.post("/facture/registerFacture", jwt.validateJWT, async (req, res) => {
        try {
            const facture = req.body;
            const statut = facture.statut === "true";
            const userId = req.user.id;

            svc.insertFacture(
                facture.titre,
                facture.categorie_f,
                facture.prix_f,
                statut,
                facture.adresse_facturation,
                facture.produit_f,
                facture.prix_ttc,
                userId
            ).then(_ => {
                res.status(201).json({ message: "Facture enregistrée avec succès" });
            }).catch(e => {
                console.error("Erreur lors de l'enregistrement de la facture :", e);
                res.status(500).json({ error: "Erreur interne du serveur" });
            });
        } catch (e) {
            console.error("Erreur lors de l'enregistrement de la facture :", e);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.delete("/facture/:id", async (req, res) => {
        const facture = await svc.dao.getById(req.params.id);
        if (facture === undefined) {
            return res.status(404).end();
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.error(e);
                res.status(500).end();
            });
    });

    app.put("/facture", async (req, res) => {
        const facture = req.body;
        if (await svc.dao.getById(facture.id) === undefined) {
            return res.status(404).end();
        }
        svc.dao.updateFacture(facture)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.error(e);
                res.status(500).end();
            });
    });
};
