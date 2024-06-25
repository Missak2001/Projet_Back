const UserAccount = require("../useraccount");
module.exports = (userAccountService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await userAccountService.dao.db.query("CREATE TABLE IF NOT EXISTS useraccount(id SERIAL PRIMARY KEY, " +
                "displayname TEXT NOT NULL, " +
                "login TEXT NOT NULL," +
                " password TEXT NOT NULL, " +
                "isEnterprise BOOLEAN NOT NULL)")
                .then(_ => { resolve(); });
            await userAccountService.dao.insert(new UserAccount(displayName, login, password, isEnterprise));
        } catch (e) {
            if (e.code === "42P07") {
                resolve();
            } else {
                reject(e);
            }
        }
    });
}

