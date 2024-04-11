module.exports = (app, svc) => {
    app.get("/afficher", async (req, res) => {
        res.json(await svc.dao.getAllAfficher())
    })

    app.get("/afficher/:id", async (req, res) => {
        try {
            const afficher = await svc.dao.getById(req.params.id)
            if (afficher === undefined) {
                return res.status(404).end()
            }
            return res.json(afficher)
        } catch (e) {
            res.status(400).end()
        }
    })

    app.post("/afficher", (req, res) => {
        const afficher = req.body
        // if (!svc.isValid(item)) {
        //     return res.status(400).end()
        // }
        svc.dao.insertAfficher(afficher)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.delete("/afficher/:id", async (req, res) => {
        const afficher = await svc.dao.getById(req.params.id)
        if (afficher === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.put("/afficher", async (req, res) => {
        const afficher = req.body
        // if ((item.id === undefined) || (item.id == null) || (!svc.isValid(item))) {
        //     return res.status(400).end()
        // }
        if (await svc.dao.getById(afficher.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.updateAfficher(afficher)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
