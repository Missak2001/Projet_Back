module.exports = (app, svc) => {
    app.get("/demande", async (req, res) => {
        res.json(await svc.dao.getAllDemande())
    })

    app.get("/demande/:id", async (req, res) => {
        try {
            const demande = await svc.dao.getById(req.params.id)
            if (demande === undefined) {
                return res.status(404).end()
            }
            return res.json(demande)
        } catch (e) {
            res.status(400).end()
        }
    })

    app.post("/demande", (req, res) => {
        const demande = req.body
        // if (!svc.isValid(item)) {
        //     return res.status(400).end()
        // }
        svc.dao.insertDemande(demande)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.delete("/demande/:id", async (req, res) => {
        const demande = await svc.dao.getById(req.params.id)
        if (demande === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.put("/demande", async (req, res) => {
        const demande = req.body
        // if ((item.id === undefined) || (item.id == null) || (!svc.isValid(item))) {
        //     return res.status(400).end()
        // }
        if (await svc.dao.getById(demande.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.updateDemande(demande)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
