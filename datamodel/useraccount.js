// class UserAccount {
//     constructor(displayName, login, password, isEnterprise) {
//         this.displayName = displayName;
//         this.login = login;
//         this.password = password;
//         this.isEnterprise = isEnterprise;
//     }
// }
//
// module.exports = UserAccount;

module.exports = class UserAccount {
    constructor(displayName, login, password, isEnterprise) {
        this.displayName = displayName;
        this.login = login;
        this.password = password;
        this.isEnterprise = isEnterprise;
    }
};
