const ProduitDAO = require("../datamodel/ProduitDao");
const Produit = require("../datamodel/produit");

module.exports = class ProduitService {
    constructor(db) {
        this.dao = new ProduitDAO(db)
    }

    async insertProduit(titrep, categorie_p, prix_p, id_useraccount) {
        try {
            return this.dao.insertProduit(new Produit(titrep, categorie_p, prix_p, id_useraccount));
        } catch (error) {
            throw error;
        }
    }
}
