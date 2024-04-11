module.exports = class Client {
    constructor(pseudo, nom_C, prenom_C, adresse_C, CP_C, mail_C, password) {
        this.pseudo = pseudo
        this.nom_C = nom_C
        this.prenom_C = prenom_C
        this.adresse_C = adresse_C
        this.CP_C = CP_C
        this.mail_C = mail_C
        this.password= password
    }
}