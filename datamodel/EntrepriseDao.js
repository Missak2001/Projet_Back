const BaseDAO = require('./basedao')

module.exports = class EntrepriseDAO extends BaseDAO{
    constructor(db) {
        super(db, "entreprise")
    }
    insertEntreprise(entreprise) {
        return this.db.query("INSERT INTO entreprise(nom_E ,prenom_E, adresse_E, CP_E, mail_E,mdp_E) VALUES ($1,$2,$3,$4,$5,$6)",
            [entreprise.nom_E, entreprise.prenom_E, entreprise.adresse_E, entreprise.CP_E, entreprise.mail_E, entreprise.mdp_E])
    }

    getAllEntreprise() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM entreprise ORDER BY nom_C,prenom_C,adresse_C,CP_C,mail_C")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    updateEntreprise(entreprise) {
        return this.db.query("UPDATE entreprise SET nom_E=$2, prenom_E=$3 ,adresse_E=$4 ,CP_E=$5 ,mail_E=$6 ,mdp_E=$7 WHERE id=$1",
            [entreprise.nom_E, entreprise.prenom_E, entreprise.adresse_E, entreprise.CP_E, entreprise.mail_E, entreprise.mdp_E])
    }

}