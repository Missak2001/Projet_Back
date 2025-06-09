const BaseDAO = require('./basedao')

module.exports = class UserAccountDAO extends BaseDAO {
    constructor(db) {
        super(db, "useraccount")
    }
    async insert(displayName, login, hashedPassword, isEnterprise) {
        const result = await this.db.query(
            `INSERT INTO useraccount(displayname, login, password, isenterprise)
                VALUES($1, $2, $3, $4)`

        );
        return result.rows[0];
    }


    getByLoginUserAccount(login) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount WHERE login=$1", [login])
                .then(res => {
                    const user = res.rows[0];
                    if (user) {
                        resolve({
                            id: user.id, // Ajout de l'ID de l'utilisateur à l'objet retourné
                            displayName: user.displayName,
                            login: user.login,
                            password: user.password,
                            isEnterprise: user.isEnterprise,
                            role: user.role
                        });
                    } else {
                        resolve(null); // Retourner null si aucun utilisateur n'est trouvé
                    }
                })
                .catch(e => reject(e)))
    }
    updateUser(id, displayName, hashedPassword) {
        if (hashedPassword) {
            return this.db.query(
                "UPDATE useraccount SET displayname=$1, password=$2 WHERE id=$3",
                [displayName, hashedPassword, id]
            );
        } else {
            return this.db.query(
                "UPDATE useraccount SET displayname=$1 WHERE id=$2",
                [displayName, id]
            );
        }
    }
    async getAll() {
        const result = await this.db.query("SELECT * FROM useraccount");
        return result.rows;
    }



}
