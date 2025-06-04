// const Produit = require("../produit");
//
// module.exports = (ProduitService) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await ProduitService.dao.db.query( "CREATE TABLE IF NOT EXISTS produit (id SERIAL PRIMARY KEY,titrep VARCHAR(255) NOT NULL,categorie_p VARCHAR(255) NOT NULL,prix_p INTEGER NOT NULL)")
//                 .then(_=>{resolve()});
//                 await ProduitService.dao.insertProduit(new Produit(titrep, categorie_p, prix_p));
//             resolve()
//         } catch (e) {
//             if (e.code === "42P07") {
//                 resolve();
//             } else {
//                 reject(e);
//             }
//         }
//     })
// }

const Produit = require("../produit");

module.exports = (ProduitService) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Création de la table produit si elle n'existe pas
            await ProduitService.dao.db.query(`
                CREATE TABLE IF NOT EXISTS produit (
                    id SERIAL PRIMARY KEY,
                    titrep VARCHAR(255) NOT NULL,
                    categorie_p VARCHAR(255) NOT NULL,
                    prix_p INTEGER NOT NULL
                )
            `);

            // Ne rien insérer ici (pas de produit en dur)
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

