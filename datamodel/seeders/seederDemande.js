const Demande = require("../demande");

module.exports = (DemandeService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await DemandeService.dao.db.query("CREATE TABLE IF NOT EXISTS demande (id SERIAL PRIMARY KEY," +
                " statut_d INTEGER NOT NULL," +
                " date DATE NOT NULL," +
                " id_Client INTEGER NOT NULL," +
                " id_Utilisateur INTEGER NOT NULL)")
                .then(_=>{resolve()});
            for (let i = 0; i < 5; i++) {
                let date = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))
                await DemandeService.dao.insertDemande(new Demande("statut_d" + i,
                    date,
                    "id_client" + i,
                    "id_Utilisateur" + i
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
