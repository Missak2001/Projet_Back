const BaseDAO = require('./basedao')
module.exports = class AfficherDAO extends BaseDAO{
    constructor(db) {
        super(db, "afficher")
    }
    insertAfficher(afficher) {
        return this.db.query("INSERT INTO afficher(id_produit,id_facture ,quantite_A, prix_A) VALUES ($1,$2,$3,$4)",
            [afficher.id_produit, afficher.id_facture, afficher.quantite_A, afficher.prix_A])
    }

    getAllAfficher() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM afficher ORDER BY id_produit,id_facture,quantite_A,prix_A")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    updateAfficher(afficher) {
        return this.db.query("UPDATE afficher SET id_produit=$2,id_facture=$3,quantite_A=$4,prix_A=$5 WHERE id=$1",
            [afficher.id_produit, afficher.id_facture, afficher.quantite_A, afficher.prix_A])
    }

}