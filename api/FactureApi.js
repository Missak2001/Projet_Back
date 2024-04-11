module.exports = (app, svc) => {
    app.get("/facture", async (req, res) => {
        res.json(await svc.dao.getAllFacture())
    })
    app.get("/facture/produit", async (req, res) => {
        try {
            const products = await svc.getAllProducts();
            res.json(products);
        } catch (err) {
            console.error("Erreur lors de la récupération des produits :", err);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });


    app.post("/facture/registerFacture", async (req, res) => {
        try {
            const facture = req.body;
            const statut = facture.statut === "true";

            svc.insertFacture(
                facture.titre,
                facture.categorie_f,
                facture.prix_f,
                statut,
                facture.adresse_facturation,
                facture.produit_f
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


    app.get("/produit", async (req, res) => {
        try {
            const products = await svc.getAllProduit(); // Utilisez getAllProduits au lieu de getAllProduit
            res.json(products);
        } catch (err) {
            console.error("Erreur lors de la récupération des produits :", err);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });



    app.delete("/facture/:id", async (req, res) => {
        const facture = await svc.dao.getById(req.params.id)
        if (facture === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.put("/facture", async (req, res) => {
        const facture = req.body
        // if ((item.id === undefined) || (item.id == null) || (!svc.isValid(item))) {
        //     return res.status(400).end()
        // }
        if (await svc.dao.getById(facture.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.updateFacture(facture)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
