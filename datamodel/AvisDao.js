const BaseDAO = require('./basedao')

module.exports = class AvisDAO extends BaseDAO{
    constructor(db) {
        super(db, "avis")
    }
    insertAvis(avis) {
        return this.db.query("INSERT INTO avis(commentaire,id_Client ,id_utilisateur) VALUES ($1,$2,$3)",
            [avis.commentaire, avis.id_Client, avis.id_utilisateur])
    }

    getAllAvis() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM avis ORDER BY commentaire,id_Client,id_utilisateur")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    updateAvis(avis) {
        return this.db.query("UPDATE avis SET commentaire=$2,id_Client=$3,id_utilisateur=$4 WHERE id=$1",
            [avis.commentaire, avis.id_Client, avis.id_utilisateur])
    }

}