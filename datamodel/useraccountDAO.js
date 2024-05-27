const BaseDAO = require('./basedao')

module.exports = class UserAccountDAO extends BaseDAO {
    constructor(db) {
        super(db, "useraccount")
    }
    // insert(useraccount) {
    //     return this.db.query("INSERT INTO useraccount(displayname,login,password,isEnterprise) VALUES ($1,$2,$3, $4)",
    //         [useraccount.displayName, useraccount.login, useraccount.password, useraccount.isEnterprise])
    // }

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
                            isEnterprise: user.isEnterprise
                        });
                    } else {
                        resolve(null); // Retourner null si aucun utilisateur n'est trouvé
                    }
                })
                .catch(e => reject(e)))
    }

}
