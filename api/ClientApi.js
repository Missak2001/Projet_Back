module.exports = (app, svc) => {
    app.get("/client", async (req, res) => {
        res.json(await svc.dao.getAllClient())
    })

    app.get("/client/:id", async (req, res) => {
        try {
            const client = await svc.dao.getById(req.params.id)
            if (client === undefined) {
                return res.status(404).end()
            }
            return res.json(client)
        } catch (e) {
            res.status(400).end()
        }
    })

    app.post("/client", (req, res) => {
        const client = req.body
        svc.dao.insertClient(client)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.delete("/client/:id", async (req, res) => {
        const client = await svc.dao.getById(req.params.id)
        if (client === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.put("/client", async (req, res) => {
        const client = req.body
        if (await svc.dao.getById(client.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.updateClient(client)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
