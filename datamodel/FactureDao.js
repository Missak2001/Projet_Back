const BaseDAO = require('./basedao');

module.exports = class FactureDAO extends BaseDAO {
    constructor(db) {
        super(db, "facture");
    }

    insertFacture(facture) {
        return this.db.query("INSERT INTO facture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f) VALUES ($1, $2, $3, $4, $5, $6)",
            [facture.titre, facture.categorie_f, facture.prix_f, facture.statut, facture.adresse_facturation, facture.produit_f]);
    }

    getAllFacture() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM facture ORDER BY titre, categorie_f, prix_f, statut, adresse_facturation, produit_f")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)));
    }

    updateFacture(facture) {
        return this.db.query("UPDATE facture SET titre=$2, categorie_f=$3, prix_f=$4, statut=$5, adresse_facturation=$6, produit_f=$7 WHERE id=$1",
            [facture.titre, facture.categorie_f, facture.prix_f, facture.statut, facture.adresse_facturation, facture.produit_f, facture.id]);
    }

    getAllProducts() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM produit")
                .then(res => {
                    const products = res.rows;
                    console.log("Produits récupérés :", products);
                    resolve(products);
                })
                .catch(e => reject(e))
        );
    }
};
