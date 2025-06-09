const FactureDAO = require("../datamodel/FactureDao");
const Facture = require("../datamodel/facture");
const PDFDocument = require("pdfkit");

module.exports = class FactureService {
    constructor(db) {
        this.dao = new FactureDAO(db);
    }

    async insertFacture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f, prix_ttc, created_by) {
        const facture = new Facture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f, prix_ttc, created_by);
        return await this.dao.insertFacture(facture);
    }

    async getFacturesByUserId(userId) {
        return await this.dao.getFacturesByUserId(userId);
    }

    async getAllProducts() {
        return await this.dao.getAllProducts();
    }

    async updateFacture(facture) {
        return await this.dao.updateFacture(facture);
    }

    async deleteFacture(id) {
        return await this.dao.deleteFacture(id);
    }

    async generateFacturePDF(factureId) {
        const facture = await this.dao.getById(factureId);
        if (!facture) throw new Error("Facture non trouvée");

        const doc = new PDFDocument();
        const buffers = [];

        return new Promise((resolve, reject) => {
            doc.on("data", buffers.push.bind(buffers));
            doc.on("end", () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            doc.fontSize(20).text(`Facture #${facture.id}`, { align: "center" });
            doc.moveDown();
            doc.fontSize(14).text(`Titre: ${facture.titre}`);
            doc.text(`Catégorie: ${facture.categorie_f}`);
            doc.text(`Statut: ${facture.statut ? "En cours" : "Terminée"}`);
            doc.text(`Adresse de facturation: ${facture.adresse_facturation}`);
            doc.text(`Produits: ${Array.isArray(facture.produit_f) ? facture.produit_f.join(", ") : facture.produit_f}`);
            doc.text(`Prix TTC: ${facture.prix_ttc} €`);
            doc.text(`Client: ${facture.created_by}`);

            doc.end();
        });
    }
};