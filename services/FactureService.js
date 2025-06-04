// factureService.js

const FactureDAO = require("../datamodel/FactureDao");
const Facture = require("../datamodel/facture");
const PDFDocument = require('pdfkit');

module.exports = class FactureService {
    constructor(db) {
        this.dao = new FactureDAO(db);
    }

    async insertFacture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f, prix_ttc, created_by) {
        try {
            const facture = new Facture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f, prix_ttc, created_by);
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
    async updateFacture(facture) {
        try {
            return await this.dao.updateFacture(facture);
        } catch (error) {
            throw error;
        }
    }

    async deleteFacture(id) {
        try {
            return await this.dao.deleteFacture(id);
        } catch (error) {
            throw error;
        }
    }

    async generateFacturePDF(factureId) {
        try {
            const facture = await this.dao.getById(factureId);
            if (!facture) {
                throw new Error('Facture non trouvée');
            }

            const doc = new PDFDocument();
            let buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                return pdfData;
            });

            doc.fontSize(20).text(`Facture #${facture.id}`, { align: 'center' });
            doc.moveDown();
            doc.fontSize(14).text(`Titre: ${facture.titre}`);
            doc.text(`Catégorie: ${facture.categorie_f}`);
            doc.text(`Statut: ${facture.statut ? 'En cours' : 'Terminée'}`);
            doc.text(`Adresse de facturation: ${facture.adresse_facturation}`);
            doc.text(`Produits: ${facture.produit_f.join(', ')}`);
            doc.text(`Prix TTC: ${facture.prix_ttc} €`);
            doc.text(`Client: ${facture.created_by}`);

            doc.end();
        } catch (error) {
            throw error;
        }
    }
};
