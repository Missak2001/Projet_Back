module.exports = (app, svc) => {
    app.get("/entreprise", async (req, res) => {
        res.json(await svc.dao.getAllEntreprise())
    })

    app.get("/entreprise/:id", async (req, res) => {
        try {
            const entreprise = await svc.dao.getById(req.params.id)
            if (entreprise === undefined) {
                return res.status(404).end()
            }
            return res.json(entreprise)
        } catch (e) {
            res.status(400).end()
        }
    })

    app.post("/entreprise", (req, res) => {
        const entreprise = req.body
        // if (!svc.isValid(item)) {
        //     return res.status(400).end()
        // }
        svc.dao.insertEntreprise(entreprise)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.delete("/entreprise/:id", async (req, res) => {
        const entreprise = await svc.dao.getById(req.params.id)
        if (entreprise === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.put("/entreprise", async (req, res) => {
        const entreprise = req.body
        // if ((item.id === undefined) || (item.id == null) || (!svc.isValid(item))) {
        //     return res.status(400).end()
        // }
        if (await svc.dao.getById(entreprise.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.updateEntreprise(entreprise)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
