const ProduitDAO = require("../datamodel/ProduitDao");
const Produit = require("../datamodel/produit");

module.exports = class ProduitService {
    constructor(db) {
        this.dao = new ProduitDAO(db)
    }

    async insertProduit(titreP,categorie_p ,prix_P) {
        try {
            return this.dao.insertProduit(new Produit(titreP, categorie_p, prix_P));
        } catch (error) {
            throw error;
        }
    }
}