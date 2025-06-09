// const ProduitDAO = require("../datamodel/ProduitDao");
// const Produit = require("../datamodel/produit");
//
// module.exports = class ProduitService {
//     constructor(db) {
//         this.dao = new ProduitDAO(db)
//     }
//
//     async insertProduit(titrep, categorie_p, prix_p, id_useraccount) {
//         try {
//             return this.dao.insertProduit(new Produit(titrep, categorie_p, prix_p, id_useraccount));
//         } catch (error) {
//             throw error;
//         }
//     }
//     async getProduitsByUser(userId) {
//         try {
//             return await this.dao.getProduitsByUser(userId);
//         } catch (error) {
//             throw error;
//         }
//     }
// }
// produitService.js
const ProduitDAO = require("../datamodel/ProduitDao");
const Produit = require("../datamodel/produit");

module.exports = class ProduitService {
    constructor(db) {
        this.dao = new ProduitDAO(db);
    }

    async insertProduit(titrep, categorie_p, prix_p, id_useraccount) {
        try {
            return this.dao.insertProduit(new Produit(titrep, categorie_p, prix_p, id_useraccount));
        } catch (error) {
            throw error;
        }
    }

    async getProduitsByUser(userId) {
        try {
            return await this.dao.getProduitsByUser(userId);
        } catch (error) {
            throw error;
        }
    }

    async updateProduit(produit, userId) {
        try {
            const existingProduit = await this.dao.getProduitById(produit.id);
            if (existingProduit.id_useraccount !== userId) {
                throw new Error("Unauthorized");
            }
            return await this.dao.updateProduit(produit);
        } catch (error) {
            throw error;
        }
    }

    async deleteProduit(produitId, userId) {
        try {
            const existingProduit = await this.dao.getProduitById(produitId);
            if (existingProduit.id_useraccount !== userId) {
                throw new Error("Unauthorized");
            }
            return await this.dao.deleteProduitById(produitId);
        } catch (error) {
            throw error;
        }
    }
};

