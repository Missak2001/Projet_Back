const BaseDAO = require('./basedao')

module.exports = class DemandeDAO extends BaseDAO{
    constructor(db) {
        super(db, "demande")
    }
    insertDemande(demande) {
        return this.db.query("INSERT INTO demande(statut_d,date ,id_Client, id_Utilisateur) VALUES ($1,$2,$3,$4)",
            [demande.statut_d, demande.date, demande.id_Client, demande.id_Utilisateur])
    }

    getAllDemande() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM demande ORDER BY statut_d,date,id_Client,id_Utilisateur")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    updateDemande(demande) {
        return this.db.query("UPDATE demande SET statut_d=$2,date=$3,id_Client=$4,id_Utilisateur=$5 WHERE id=$1",
            [demande.statut_d, demande.date, demande.id_Client, demande.id_Utilisateur])
    }

}