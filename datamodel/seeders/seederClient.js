const Client = require("../client");

module.exports = (ClientService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await ClientService.dao.db.query("CREATE TABLE IF NOT EXISTS client (id SERIAL PRIMARY KEY, pseudo VARCHAR(255) NOT NULL, nom_C VARCHAR(255) NOT NULL, prenom_C VARCHAR(255) NOT NULL, adresse_C VARCHAR(255) NOT NULL, CP_C INTEGER NOT NULL, mail_C VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)")
                .then(_=>{resolve()});
                await ClientService.dao.insertClient(new Client(pseudo, nom_C , prenom_C, adresse_C, CP_C, mail_C, password));
            resolve()
        } catch (e) {
            if (e.code === "42P07") {
                resolve();
            } else {
                reject(e);
            }

        }
    })
}
