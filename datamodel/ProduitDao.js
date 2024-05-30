const BaseDAO = require('./basedao');

module.exports = class ProduitDAO extends BaseDAO {
    constructor(db) {
        super(db, "produit");
    }

    getAllProduit() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM produit ORDER BY titreP, categorie_p, prix_P")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        );
    }

    insertProduit(produit) {
        return this.db.query("INSERT INTO produit(titrep, categorie_p, prix_p, id_useraccount) VALUES ($1, $2, $3, $4)",
            [produit.titrep, produit.categorie_p, produit.prix_p, produit.id_useraccount]);
    }

    updateProduit(produit) {
        return this.db.query("UPDATE produit SET titrep = $2, categorie_p = $3, prix_p = $4, id_useraccount = $5 WHERE id = $1",
            [produit.id, produit.titrep, produit.categorie_p, produit.prix_p, produit.id_useraccount]);
    }

    getProduitsWithUser() {
        return new Promise((resolve, reject) =>
            this.db.query(`
            SELECT p.*, u.displayName 
            FROM produit p
            JOIN useraccount u ON p.id_useraccount = u.id
            ORDER BY p.titrep, p.categorie_p, p.prix_p
        `)
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        );
    }
};
