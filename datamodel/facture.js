module.exports = class Facture {
    constructor(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f) {
        this.titre = titre
        this.categorie_f = categorie_f
        this.prix_f = prix_f
        this.statut = statut
        this.adresse_facturation = adresse_facturation
        this.produit_f = produit_f
    }
}