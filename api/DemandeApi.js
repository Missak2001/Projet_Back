module.exports = (app, svc) => {
    app.get("/demande", async (req, res) => {
        try {
            const demandes = await svc.dao.getAllDemande();
            res.json(demandes);
        } catch (error) {
            console.error("Erreur lors de la récupération des demandes:", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.get("/demande/:id", async (req, res) => {
        const demandeId = parseInt(req.params.id);
        try {
            const demande = await svc.dao.getById(demandeId);
            if (!demande) {
                res.status(404).json({ message: "Demande non trouvée" });
                return;
            }
            res.json(demande);
        } catch (error) {
            console.error("Erreur lors de la récupération de la demande:", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.post("/demande", async (req, res) => {
        const demande = req.body;
        try {
            await svc.dao.insertDemande(demande);
            res.status(201).json({ message: "Demande créée avec succès" });
        } catch (error) {
            console.error("Erreur lors de la création de la demande:", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.delete("/demande/:id", async (req, res) => {
        const demandeId = parseInt(req.params.id);
        try {
            const demande = await svc.dao.getById(demandeId);
            if (!demande) {
                res.status(404).json({ message: "Demande non trouvée" });
                return;
            }
            await svc.dao.delete(demandeId);
            res.json({ message: "Demande supprimée avec succès" });
        } catch (error) {
            console.error("Erreur lors de la suppression de la demande:", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });

    app.put("/demande/:id", async (req, res) => {
        const demandeId = parseInt(req.params.id);
        const updatedDemande = req.body;
        try {
            const demande = await svc.dao.getById(demandeId);
            if (!demande) {
                res.status(404).json({ message: "Demande non trouvée" });
                return;
            }
            updatedDemande.id = demandeId;
            await svc.dao.updateDemande(updatedDemande);
            res.json({ message: "Demande mise à jour avec succès" });
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la demande:", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    });
};
