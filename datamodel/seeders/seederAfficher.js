const Afficher = require("../afficher");

module.exports = (AfficherService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await AfficherService.dao.db.query(`CREATE TABLE IF NOT EXISTS afficher (
                id SERIAL PRIMARY KEY,
                id_produit INTEGER NOT NULL,
                id_facture INTEGER NOT NULL,
                quantite_A INTEGER NOT NULL,
                prix_A FLOAT NOT NULL)`)
                .then(_=>{resolve()});
            for (let i = 0; i < 5; i++) {
                await AfficherService.dao.insertAfficher(new Afficher("id_produit" + i,
                    "id_facture" + i,
                    "quantite_A" + i,
                    "prix_A" + i
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
