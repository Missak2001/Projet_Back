// const jwt = require('jsonwebtoken');
//
// // Clé secrète et durée de validité
// const jwtKey = process.env.JWT_SECRET || 'dev-secret';
// const jwtExpirySeconds = 3600; // 1 heure
//
// module.exports = (userAccountService) => {
//     return {
//         // Middleware pour valider un token et ajouter l'utilisateur dans req.user
//         async validateJWT(req, res, next) {
//             const authHeader = req.headers.authorization;
//             if (!authHeader || !authHeader.startsWith("Bearer ")) {
//                 return res.status(401).json({ error: "Token manquant ou invalide" });
//             }
//
//             const token = authHeader.split(" ")[1];
//
//             jwt.verify(token, jwtKey, { algorithm: "HS256" }, async (err, payload) => {
//                 if (err) {
//                     return res.status(401).json({ error: "Token expiré ou invalide" });
//                 }
//
//                 try {
//                     const user = await userAccountService.dao.getByLoginUserAccount(payload.login);
//                     if (!user) {
//                         return res.status(401).json({ error: "Utilisateur introuvable" });
//                     }
//
//                     req.user = user; // Injecte l'utilisateur complet dans la requête
//                     next();
//                 } catch (error) {
//                     console.error("Erreur lors de la validation JWT :", error);
//                     res.status(500).json({ error: "Erreur serveur lors de l'authentification" });
//                 }
//             });
//         },
//
//         // Génère un token pour un utilisateur
//         async generateJWT(login) {
//             const user = await userAccountService.dao.getByLoginUserAccount(login);
//             return jwt.sign(
//                 {
//                     id: user.id,
//                     login: user.login
//                 },
//                 jwtKey,
//                 {
//                     algorithm: "HS256",
//                     expiresIn: jwtExpirySeconds
//                 }
//             );
//         }
//     };
// };


const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET || 'dev-secret';
const jwtExpirySeconds = 3600;

module.exports = (userAccountService) => {
    return {
        async validateJWT(req, res, next) {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ error: "Token manquant ou invalide" });
            }

            const token = authHeader.split(" ")[1];

            jwt.verify(token, jwtKey, { algorithms: ["HS256"] }, async (err, payload) => {
                if (err) {
                    return res.status(401).json({ error: "Token expiré ou invalide" });
                }

                try {
                    const user = await userAccountService.dao.getByLoginUserAccount(payload.login);
                    if (!user) {
                        return res.status(401).json({ error: "Utilisateur introuvable" });
                    }

                    req.user = user;
                    next();
                } catch (error) {
                    console.error("Erreur JWT validation :", error);
                    res.status(500).json({ error: "Erreur serveur" });
                }
            });
        },

        async generateJWT(login) {
            const user = await userAccountService.dao.getByLoginUserAccount(login);
            return jwt.sign(
                {
                    id: user.id,
                    login: user.login,
                    role: user.role || 'user' // 🆕 inclure le rôle
                },
                jwtKey,
                {
                    algorithm: "HS256",
                    expiresIn: jwtExpirySeconds
                }
            );
        },

        // 🆕 middleware pour restreindre à certains rôles
        authorizeRole(roles = []) {
            return (req, res, next) => {
                if (!roles.includes(req.user.role)) {
                    return res.status(403).json({ error: "Accès refusé : rôle insuffisant" });
                }
                next();
            };
        }
    };
};
