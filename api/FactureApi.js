module.exports = (app, svc, jwt) => {
    app.get("/facture", jwt.validateJWT, async (req, res) => {
        try {
            const allFactures = await svc.dao.getAllFacture();
            res.json(allFactures);
        } catch (e) {
            console.error("❌ Erreur getAllFacture:", e);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.get("/facture/produit", async (req, res) => {
        try {
            const products = await svc.getAllProducts();
            res.json(products);
        } catch (err) {
            console.error("❌ Erreur getAllProducts:", err);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.get("/facture/user", jwt.validateJWT, async (req, res) => {
        try {
            const userId = req.user.id;
            const factures = await svc.getFacturesByUserId(userId);
            res.json(factures);
        } catch (err) {
            console.error("❌ Erreur getFacturesByUserId:", err);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.post("/facture/registerFacture", jwt.validateJWT, async (req, res) => {
        try {
            const facture = req.body;
            const userId = req.user.id;

            if (!facture.titre || !facture.prix_f || !facture.produit_f) {
                return res.status(400).json({ error: "Champs obligatoires manquants" });
            }

            const statut = facture.statut === true || facture.statut === "true";

            await svc.insertFacture(
                facture.titre,
                facture.categorie_f,
                parseFloat(facture.prix_f),
                statut,
                facture.adresse_facturation,
                Array.isArray(facture.produit_f) ? facture.produit_f : [facture.produit_f],
                parseFloat(facture.prix_ttc),
                userId
            );

            res.status(201).json({ message: "Facture enregistrée avec succès" });
        } catch (e) {
            console.error("❌ Erreur lors de l'enregistrement de la facture :", e);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.put("/facture/:id", async (req, res) => {
        try {
            const facture = req.body;
            await svc.updateFacture(facture);
            res.status(200).json({ message: "Facture mise à jour avec succès" });
        } catch (err) {
            console.error("❌ Erreur updateFacture:", err);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.delete("/facture/:id", async (req, res) => {
        try {
            await svc.deleteFacture(req.params.id);
            res.status(200).json({ message: "Facture supprimée avec succès" });
        } catch (err) {
            console.error("❌ Erreur deleteFacture:", err);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.get("/facture/pdf/:id", jwt.validateJWT, async (req, res) => {
        try {
            const pdfData = await svc.generateFacturePDF(req.params.id);
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(pdfData),
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=facture_${req.params.id}.pdf`
            });
            res.end(pdfData);
        } catch (error) {
            console.error("❌ Erreur PDF :", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });
    app.get("/admin/factures", jwt.validateJWT, jwt.authorizeRole(['admin']), async (req, res) => {
        try {
            const allFactures = await svc.dao.getAllFacture();
            res.json(allFactures);
        } catch (err) {
            console.error("Erreur /admin/factures:", err);
            res.status(500).json({ error: "Erreur serveur" });
        }
    });

};
