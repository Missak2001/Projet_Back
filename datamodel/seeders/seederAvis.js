const Avis = require("../avis");

module.exports = (AvisService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await AvisService.dao.db.query("CREATE TABLE IF NOT EXISTS avis (id SERIAL PRIMARY KEY," +
                " commentaire TEXT NOT NULL," +
                " id_Client INTEGER NOT NULL," +
                " id_utilisateur INTEGER NOT NULL)")
                .then(_=>{resolve()});
            for (let i = 0; i < 5; i++) {
                await AvisService.dao.insertAvis(new Avis("commentaire" + i,
                    "id_Client" + i,
                    "id_utilisateur" + i
                ));
            }
            resolve()
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS
                resolve();
            } else {
                reject(e);
            }
        }
    })
}
