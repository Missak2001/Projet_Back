const BaseDAO = require('./basedao');

module.exports = class UserAccountDAO extends BaseDAO {
    constructor(db) {
        super(db, "useraccount");
    }

    async insert(userAccount) {
        const { displayName, login, password, isEnterprise, role } = userAccount;
        const result = await this.db.query(
            `INSERT INTO useraccount(displayname, login, password, isEnterprise, role)
             VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [displayName, login, password, isEnterprise, role]
        );
        return result.rows[0];
    }

    getByLoginUserAccount(login) {
        return this.db.query("SELECT * FROM useraccount WHERE login=$1", [login])
            .then(res => res.rows[0] || null)
            .catch(e => { throw e; });
    }
};