module.exports = (app, svc) => {
    app.get("/avis", async (req, res) => {
        res.json(await svc.dao.getAllAvis())
    })

    app.get("/avis/:id", async (req, res) => {
        try {
            const avis = await svc.dao.getById(req.params.id)
            if (avis === undefined) {
                return res.status(404).end()
            }
            return res.json(avis)
        } catch (e) {
            res.status(400).end()
        }
    })

    app.post("/avis", (req, res) => {
        const avis = req.body
        // if (!svc.isValid(item)) {
        //     return res.status(400).end()
        // }
        svc.dao.insertAvis(avis)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.delete("/avis/:id", async (req, res) => {
        const avis = await svc.dao.getById(req.params.id)
        if (avis === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.put("/avis", async (req, res) => {
        const avis = req.body
        // if ((item.id === undefined) || (item.id == null) || (!svc.isValid(item))) {
        //     return res.status(400).end()
        // }
        if (await svc.dao.getById(avis.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.updateAvis(avis)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
