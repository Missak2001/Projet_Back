const Demande = require("../demande");

module.exports = (DemandeService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await DemandeService.dao.db.query("CREATE TABLE IF NOT EXISTS demande (id SERIAL PRIMARY KEY," +
                " statut_d VARCHAR(255) NOT NULL," +
                " date TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
                " id_Client INT NOT NULL," +
                " id_Utilisateur INT NOT NULL)")
                .then(_ => { resolve() });

            for (let i = 0; i < 5; i++) {
                const date = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
                await DemandeService.dao.insertDemande(new Demande(
                    "statut_d" + i,
                    date,
                    "id_client" + i,
                    "id_Utilisateur" + i
                ));
            }
            resolve();
        } catch (error) {
            if (error.code === "42P07") {
                resolve();
            } else {
                reject(error);
            }
        }
    });
};
