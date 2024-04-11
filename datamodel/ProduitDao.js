const BaseDAO = require('./basedao')

module.exports = class ProduitDAO extends BaseDAO{
    constructor(db) {
        super(db, "produit")
    }
    insertProduit(produit) {
        return this.db.query("INSERT INTO produit(titreP,categorie_p ,prix_P) VALUES ($1,$2,$3)",
            [produit.titreP, produit.categorie_p, produit.prix_P])
    }

    getAllProduit() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM produit ORDER BY titreP,categorie_p,prix_P")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    updateProduit(produit) {
        return this.db.query("UPDATE produit SET titreP=$2,categorie_p=$3,prix_P=$4 WHERE id=$1",
            [produit.titreP, produit.categorie_p, produit.prix_P])
    }

}