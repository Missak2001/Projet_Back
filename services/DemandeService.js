const DemandeDAO = require("../datamodel/DemandeDao");

module.exports = class DemandeService {
    constructor(db) {
        this.dao = new DemandeDAO(db)
    }


}