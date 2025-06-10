const bcrypt = require('bcrypt');
const UserAccount = require("../useraccount");

module.exports = async (userAccountService) => {
    try {
        await userAccountService.dao.db.query(`CREATE TABLE IF NOT EXISTS useraccount (
            id SERIAL PRIMARY KEY,
            displayname TEXT NOT NULL,
            login TEXT NOT NULL,
            password TEXT NOT NULL,
            isEnterprise BOOLEAN NOT NULL,
            role TEXT NOT NULL)`);

        const hashedPassword = await bcrypt.hash("admin123", 10);
        const adminUser = new UserAccount("Admin", "admin@example.com", hashedPassword, false, "admin");
        await userAccountService.dao.insert(adminUser);
    } catch (e) {
        if (e.code === "42P07") return;
        throw e;
    }
};