const Produit = require("../produit");

module.exports = (ProduitService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await ProduitService.dao.db.query("CREATE TABLE IF NOT EXISTS produit (id SERIAL PRIMARY KEY,titreP VARCHAR(255) NOT NULL,categorie_p VARCHAR(255) NOT NULL,prix_P INTEGER NOT NULL)")
                .then(_=>{resolve()});
                await ProduitService.dao.insertProduit(new Produit(titreP, categorie_p, prix_P));
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
