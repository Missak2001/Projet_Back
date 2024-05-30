const Produit = require("../produit");

module.exports = (ProduitService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await ProduitService.dao.db.query("CREATE TABLE IF NOT EXISTS produit (id SERIAL PRIMARY KEY,titrep VARCHAR(255) NOT NULL,categorie_p VARCHAR(255) NOT NULL,prix_p INTEGER NOT NULL)")
                .then(_=>{resolve()});
                await ProduitService.dao.insertProduit(new Produit(titrep, categorie_p, prix_p));
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
