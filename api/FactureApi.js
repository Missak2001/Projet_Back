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
            res.status(500).json({error: "Erreur interne du serveur"});
        }
    });

    app.get("/facture/user", jwt.validateJWT, async (req, res) => {
        try {
            const userId = req.user.id;
            const factures = await svc.getFacturesByUserId(userId);
            res.json(factures);
        } catch (err) {
            console.error("Erreur lors de la récupération des factures :", err);
            res.status(500).json({error: "Erreur interne du serveur"});
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
                res.status(201).json({message: "Facture enregistrée avec succès"});
            }).catch(e => {
                console.error("Erreur lors de l'enregistrement de la facture :", e);
                res.status(500).json({error: "Erreur interne du serveur"});
            });
        } catch (e) {
            console.error("Erreur lors de l'enregistrement de la facture :", e);
            res.status(500).json({error: "Erreur interne du serveur"});
        }
    });

    app.put("/facture/:id", async (req, res) => {
        const facture = req.body;
        try {
            await svc.updateFacture(facture);
            res.status(200).json({message: "Facture mise à jour avec succès"});
        } catch (err) {
            console.error("Erreur lors de la mise à jour de la facture :", err);
            res.status(500).json({error: "Erreur interne du serveur"});
        }
    });

    app.delete("/facture/:id", async (req, res) => {
        try {
            await svc.deleteFacture(req.params.id);
            res.status(200).json({message: "Facture supprimée avec succès"});
        } catch (err) {
            console.error("Erreur lors de la suppression de la facture :", err);
            res.status(500).json({error: "Erreur interne du serveur"});
        }
    });
    app.get("/facture/pdf/:id", jwt.validateJWT, async (req, res) => {
        try {
            const pdfData = await svc.generateFacturePDF(req.params.id);
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(pdfData),
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=facture_${req.params.id}.pdf`,
            }).end(pdfData);
        } catch (error) {
            console.error("Erreur lors de la génération du PDF :", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });
};
