const bcrypt = require('bcrypt')
const UserAccountDAO = require('../datamodel/useraccountDAO')
const UserAccount = require('../datamodel/useraccount')

module.exports = class UserAccountService {
    constructor(db) {
        this.dao = new UserAccountDAO(db)
    }

    async insert(displayName, login, password, isEnterprise) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            return this.dao.insert(new UserAccount(displayName, login, hashedPassword, isEnterprise));
        } catch (error) {
            throw error;
        }
    }

    async validatePassword(login, password) {
        try {
            const user = await this.dao.getByLoginUserAccount(login.trim());
            if (!user) return false;
            return bcrypt.compare(password, user.password);
        } catch (error) {
            throw error;
        }
    }
}
