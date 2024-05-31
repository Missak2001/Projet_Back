// const BaseDAO = require('./basedao');
//
// module.exports = class FactureDAO extends BaseDAO {
//     constructor(db) {
//         super(db, "facture");
//     }
//
//     insertFacture(facture) {
//         const productIds = Array.isArray(facture.produit_f) ? facture.produit_f.map(id => parseInt(id, 10)) : [];
//         const formattedProductIds = `{${productIds.join(",")}}`;
//
//         return this.db.query("INSERT INTO facture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f) VALUES ($1, $2, $3, $4, $5, $6)",
//             [facture.titre, facture.categorie_f, facture.prix_f, facture.statut, facture.adresse_facturation, formattedProductIds]);
//     }
//
//     getProductPricesByIds(productIds) {
//         const idsString = productIds.join(",");
//         return this.db.query(`SELECT SUM(prix_p) as total FROM produit WHERE id IN (${idsString})`)
//             .then(res => res.rows[0].total)
//             .catch(e => { throw e });
//     }
//
//     getAllFacture() {
//         return new Promise((resolve, reject) =>
//             this.db.query("SELECT * FROM facture ORDER BY titre, categorie_f, prix_f, statut, adresse_facturation, produit_f")
//                 .then(res => resolve(res.rows))
//                 .catch(e => reject(e)));
//     }
//
//     updateFacture(facture) {
//         const productIds = Array.isArray(facture.produit_f) ? facture.produit_f.map(id => parseInt(id, 10)) : [];
//         const formattedProductIds = `{${productIds.join(",")}}`;
//
//         return this.db.query("UPDATE facture SET titre=$2, categorie_f=$3, prix_f=$4, statut=$5, adresse_facturation=$6, produit_f=$7 WHERE id=$1",
//             [facture.titre, facture.categorie_f, facture.prix_f, facture.statut, facture.adresse_facturation, formattedProductIds, facture.id]);
//     }
//
//     getAllProducts() {
//         return new Promise((resolve, reject) =>
//             this.db.query("SELECT * FROM produit")
//                 .then(res => resolve(res.rows))
//                 .catch(e => reject(e))
//         );
//     }
// };
//
const BaseDAO = require('./basedao');

module.exports = class FactureDAO extends BaseDAO {
    constructor(db) {
        super(db, "facture");
    }

    insertFacture(facture) {
        const productIds = Array.isArray(facture.produit_f) ? facture.produit_f.map(id => parseInt(id, 10)) : [];
        const formattedProductIds = `{${productIds.join(",")}}`;

        return this.db.query("INSERT INTO facture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f, prix_ttc) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [facture.titre, facture.categorie_f, facture.prix_f, facture.statut, facture.adresse_facturation, formattedProductIds, facture.prix_ttc]);
    }

    getProductPricesByIds(productIds) {
        const idsString = productIds.join(",");
        return this.db.query(`SELECT SUM(prix_p) as total FROM produit WHERE id IN (${idsString})`)
            .then(res => res.rows[0].total)
            .catch(e => { throw e });
    }

    getAllFacture() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM facture ORDER BY titre, categorie_f, prix_f, statut, adresse_facturation, produit_f")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)));
    }

    updateFacture(facture) {
        const productIds = Array.isArray(facture.produit_f) ? facture.produit_f.map(id => parseInt(id, 10)) : [];
        const formattedProductIds = `{${productIds.join(",")}}`;

        return this.db.query("UPDATE facture SET titre=$2, categorie_f=$3, prix_f=$4, statut=$5, adresse_facturation=$6, produit_f=$7 WHERE id=$1",
            [facture.titre, facture.categorie_f, facture.prix_f, facture.statut, facture.adresse_facturation, formattedProductIds, facture.id]);
    }

    getAllProducts() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM produit")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        );
    }
};

