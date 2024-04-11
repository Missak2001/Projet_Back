const Entreprise = require("../entreprise");

module.exports = (EntrepriseService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await EntrepriseService.dao.db.query("CREATE TABLE IF NOT EXISTS entreprise (id SERIAL PRIMARY KEY," +
                " nom_E VARCHAR(255) NOT NULL," +
                " prenom_E VARCHAR(255) NOT NULL," +
                " adresse_E VARCHAR(255) NOT NULL," +
                " CP_E INTEGER NOT NULL," +
                " mail_E VARCHAR(255) NOT NULL," +
                " mdp_E VARCHAR(255) NOT NULL)")
                .then(_=>{resolve()});
            for (let i = 0; i < 5; i++) {
                await EntrepriseService.dao.insertEntreprise(new Entreprise("nom_E" + i,
                    "prenom_E" + i,
                    "adresse_E" + i,
                    "CP_E" + i,
                    "mail_E" + i,
                    "mdp_E" + i
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
