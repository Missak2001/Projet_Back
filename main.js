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

// ✅ Support Platform.sh (auto) ou .env (local)
let DATABASE_URL = process.env.DATABASE_URL;
if (process.env.PLATFORM_RELATIONSHIPS) {
    const { relationships } = require("platformsh-config").config();
    const db = relationships.db[0];
    const { host, port, username, password, path } = db;
    const database = path;
    DATABASE_URL = `postgres://${username}:${password}@${host}:${port}/${database}`;
}

const db = new pg.Pool({ connectionString: DATABASE_URL });

const factureService = new FactureService(db);
const produitService = new ProduitService(db);
const useraccountService = new UserAccountService(db);
const jwt = require('./jwt')(useraccountService);

require('./api/FactureApi')(app, factureService, jwt);
require('./api/ProduitApi')(app, produitService, jwt);
require('./api/UserAccountApi')(app, useraccountService, jwt);

Promise.all([
    require('./datamodel/seeders/seederFacture')(factureService),
    require('./datamodel/seeders/seederProduit')(produitService),
    require('./datamodel/seeders/seederUserAccount')(useraccountService)
])
    .then(() => {
        const port = process.env.PORT || 3333;
        app.listen(port, '0.0.0.0', () => {
            console.log(`✅ Serveur démarré sur http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error("❌ Erreur de démarrage :", err);
    });

module.exports = { app };
