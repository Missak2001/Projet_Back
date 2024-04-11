const FactureDAO = require("../datamodel/FactureDao");
const Facture = require("../datamodel/facture");

module.exports = class FactureService {
    constructor(db) {
        this.dao = new FactureDAO(db);
    }

    async insertFacture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f) {
        try {
            return await this.dao.insertFacture(new Facture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f));
        } catch (error) {
            throw error;
        }
    }

    async getAllProducts() {
        try {
            return await this.dao.getAllProducts();
        } catch (error) {
            throw error;
        }
    }
};
