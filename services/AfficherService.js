const AfficherDAO = require("../datamodel/AfficherDao");

module.exports = class AfficherService {
    constructor(db) {
        this.dao = new AfficherDAO(db)
    }


}