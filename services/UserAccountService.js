const bcrypt = require('bcrypt');
const UserAccountDAO = require('../datamodel/useraccountDAO');
const UserAccount = require('../datamodel/useraccount');

module.exports = class UserAccountService {
    constructor(db) {
        this.dao = new UserAccountDAO(db);
    }
    async insert(displayName, login, hashedPassword, isEnterprise) {
        return this.dao.insert(new UserAccount(displayName, login, hashedPassword, isEnterprise, role));
    }

    async validatePassword(login, password) {
        try {
            const user = await this.dao.getByLoginUserAccount(login.trim());
            console.log(">>> User récupéré :", user);
            console.log(">>> Password à vérifier :", password);
            if (!user) return false;
            return bcrypt.compare(password, user.password);
        } catch (error) {
            throw error;
        }
    }

}
