module.exports = class Demande {
    constructor(statut_d, date, id_Client, id_Utilisateur) {
        this.statut_d = statut_d
        this.date = date
        this.id_Client = id_Client
        this.id_Utilisateur = id_Utilisateur
    }
}