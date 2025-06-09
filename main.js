//
// require('dotenv').config();
//
// const pg = require('pg');
// const express = require('express');
// const xss = require('xss-clean');
// const helmet = require('helmet');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const morgan = require('morgan');
//
// const FactureService = require("./services/FactureService");
// const ProduitService = require("./services/ProduitService");
// const UserAccountService = require("./services/UserAccountService");
//
// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());
// app.use(morgan('dev'));
// app.use(xss()); // Ajoute la protection ici
// app.use(helmet());
//
// const connectionString = process.env.DATABASE_URL;
// const db = new pg.Pool({ connectionString });
//
// const factureService = new FactureService(db);
// const produitService = new ProduitService(db);
// const useraccountService = new UserAccountService(db);
// const jwt = require('./jwt')(useraccountService);
//
// require('./api/FactureApi')(app, factureService, jwt);
// require('./api/ProduitApi')(app, produitService, jwt);
// require('./api/UserAccountApi')(app, useraccountService, jwt);
//
// Promise.all([
//     require('./datamodel/seeders/seederFacture')(factureService),
//     require('./datamodel/seeders/seederProduit')(produitService),
//     require('./datamodel/seeders/seederUserAccount')(useraccountService)
// ])
//     .then(() => {
//         app.listen(process.env.PORT || 3333, () => {
//             console.log("✅ Serveur démarré sur http://localhost:3333");
//         });
//     })
//     .catch(err => {
//         console.error("❌ Erreur de démarrage :", err);
//     });
// module.exports = { app };
//
require('dotenv').config();

const pg = require('pg');
const express = require('express');
const xss = require('xss-clean');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const FactureService = require("./services/FactureService");
const ProduitService = require("./services/ProduitService");
const UserAccountService = require("./services/UserAccountService");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(xss());
app.use(helmet());

// ✅ Connexion PostgreSQL (uniquement via env)
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    console.error("❌ DATABASE_URL n'est pas défini.");
    process.exit(1);
}

const db = new pg.Pool({ connectionString: DATABASE_URL });

const factureService = new FactureService(db);
const produitService = new ProduitService(db);
const useraccountService = new UserAccountService(db);
const jwt = require('./jwt')(useraccountService);

// ✅ Routing
require('./api/FactureApi')(app, factureService, jwt);
require('./api/ProduitApi')(app, produitService, jwt);
require('./api/UserAccountApi')(app, useraccountService, jwt);

// ✅ Seeder et lancement serveur
Promise.all([
    require('./datamodel/seeders/seederFacture')(factureService),
    require('./datamodel/seeders/seederProduit')(produitService),
    require('./datamodel/seeders/seederUserAccount')(useraccountService)
])
    .then(() => {
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ Erreur de démarrage :", err);
    });

module.exports = { app };
