const Facture = require("../facture");

module.exports = (FactureService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await FactureService.dao.db.query("CREATE TABLE IF NOT EXISTS facture (id SERIAL PRIMARY KEY,titre VARCHAR(255) NOT NULL,categorie_f VARCHAR(255) NOT NULL,prix_f INTEGER NOT NULL,statut INTEGER NOT NULL,adresse_facturation VARCHAR(255) NOT NULL, produit_f VARCHAR(255) NOT NULL, prix_ttc INTEGER NOT NULL)")
                .then(_ => { resolve() });
            await FactureService.dao.insertFacture(new Facture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f, prix_ttc));
            resolve()
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS
                resolve();
            } else {
                reject(e);
            }
        }
    });
};
