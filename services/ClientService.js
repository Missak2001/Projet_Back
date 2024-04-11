const ClientDAO = require("../datamodel/ClientDao");
const bcrypt = require('bcrypt')
const Client = require('../datamodel/client')
module.exports = class ClientService {
    constructor(db) {
        this.dao = new ClientDAO(db)
    }
    insertClient(pseudo, nom_C ,prenom_C, adresse_C, CP_C, mail_C, password) {
        return this.dao.insertClient(new Client(pseudo, nom_C ,prenom_C, adresse_C, CP_C, mail_C, password))
    }
    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
    async validatePassword(login, password) {
        const user = await this.dao.getByLoginClient(login.trim())
        return this.comparePassword(password, user.password)
    }


}