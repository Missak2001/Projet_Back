module.exports = (app, svc, jwt) => {
    app.get("/produit", async (req, res) => {
        res.json(await svc.dao.getAllProduit());
    });

    app.get("/produit/:id", async (req, res) => {
        try {
            const produit = await svc.dao.getById(req.params.id);
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


    app.delete("/produit/:id", async (req, res) => {
        const produit = await svc.dao.getById(req.params.id);
        if (produit === undefined) {
            return res.status(404).end();
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e);
                res.status(500).end();
            });
    });

    app.put("/produit", async (req, res) => {
        const produit = req.body;
        if (await svc.dao.getById(produit.id) === undefined) {
            return res.status(404).end();
        }
        svc.dao.updateProduit(produit)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e);
                res.status(500).end();
            });
    });

    app.get("/produitWithUser", async (req, res) => {
        try {
            const produits = await svc.dao.getProduitsWithUser();
            res.json(produits);
        } catch (e) {
            console.error("Erreur lors de la récupération des produits avec utilisateur :", e);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });
};
