const AvisDAO = require("../datamodel/AvisDao");

module.exports = class AvisService {
    constructor(db) {
        this.dao = new AvisDAO(db)
    }


}