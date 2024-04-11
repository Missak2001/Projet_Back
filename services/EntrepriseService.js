const EntrepriseDAO = require("../datamodel/EntrepriseDao");

module.exports = class EntrepriseService {
    constructor(db) {
        this.dao = new EntrepriseDAO(db)
    }


}