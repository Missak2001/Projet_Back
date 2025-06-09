const bcrypt = require('bcrypt');
const UserAccountDAO = require('../datamodel/useraccountDAO');
const UserAccount = require('../datamodel/useraccount');

module.exports = class UserAccountService {
    constructor(db) {
        this.dao = new UserAccountDAO(db);
    }
    // async insert(displayName, login, hashedPassword, isEnterprise) {
    //     return this.dao.insert(new UserAccount(displayName, login, hashedPassword, isEnterprise, role));
    // }
    async insert(displayName, login, password, isEnterprise, role) {
        return await this.dao.insert(displayName, login, password, isEnterprise, role);
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
    async updateProfile(id, displayName, password) {
        if (!id || !displayName) throw new Error("Paramètres invalides");

        let hashedPassword = null;
        if (password && password.length >= 6) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        return await this.dao.updateUser(id, displayName, hashedPassword);
    }



}
