// factureService.js

const FactureDAO = require("../datamodel/FactureDao");
const Facture = require("../datamodel/facture");

module.exports = class FactureService {
    constructor(db) {
        this.dao = new FactureDAO(db);
    }

    async insertFacture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f, prix_ttc, created_by) {
        try {
            const prixTotalProduits = await this.dao.getProductPricesByIds(produit_f);
            const facture = new Facture(titre, categorie_f, prixTotalProduits, statut, adresse_facturation, produit_f, prix_ttc, created_by);
            return await this.dao.insertFacture(facture);
        } catch (error) {
            throw error;
        }
    }

    async getFacturesByUserId(userId) {
        try {
            return await this.dao.getFacturesByUserId(userId);
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
