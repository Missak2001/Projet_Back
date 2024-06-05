// factureService.js

const FactureDAO = require("../datamodel/FactureDao");
const Facture = require("../datamodel/facture");

module.exports = class FactureService {
    constructor(db) {
        this.dao = new FactureDAO(db);
    }

    async insertFacture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f, prix_ttc) {
        try {
            // Calculer le prix total des produits
            const prixTotalProduits = await this.dao.getProductPricesByIds(produit_f);

            // Créer une instance de Facture avec le prix total des produits
            const facture = new Facture(titre, categorie_f, prixTotalProduits, statut, adresse_facturation, produit_f, prix_ttc);

            // Insérer la facture dans la base de données
            return await this.dao.insertFacture(facture);
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
