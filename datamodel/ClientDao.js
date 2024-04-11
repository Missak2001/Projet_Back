const BaseDAO = require('./basedao')

module.exports = class ClientDAO extends BaseDAO{
    constructor(db) {
        super(db, "client")
    }
    insertClient(client) {
        return this.db.query("INSERT INTO client(pseudo,nom_C ,prenom_C, adresse_C, CP_C, mail_C,password) VALUES ($1,$2,$3,$4,$5,$6,$7)",
            [client.pseudo, client.nom_C, client.prenom_C, client.adresse_C, client.CP_C, client.mail_C, client.password])
    }

    getByLoginClient(login) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM client WHERE login=$1", [ login ])
                .then(res => resolve(res.rows[0]) )
                .catch(e => reject(e)))
    }

    updateClient(client) {
        return this.db.query("UPDATE client SET pseudo=$2,nom_C=$3,prenom_C=$4,adresse_C=$5,CP_C=$6,mail_C=$7,mdp_C=$8 WHERE id=$1",
            [client.pseudo, client.nom_C, client.prenom_C, client.adresse_C, client.CP_C, client.mail_C, client.mdp_C])
    }

}