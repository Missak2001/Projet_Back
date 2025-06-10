module.exports = class UserAccount {
    constructor(displayName, login, password, isEnterprise, role = 'user') {
        this.displayName = displayName;
        this.login = login;
        this.password = password;
        this.isEnterprise = isEnterprise;
        this.role = role;
    }
};