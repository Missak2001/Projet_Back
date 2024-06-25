//
// const pg = require('pg')
// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const morgan = require('morgan')
//
// const FactureService = require("./services/FactureService")
// const ProduitService = require("./services/ProduitService")
// const UserAccountService = require("./services/UserAccountService")
//
//
//
// const app = express()
// app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
// app.use(bodyParser.json()) // application/json
// app.use(cors())
// app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur
//
// //const connectionString = "postgres://user:password@192.168.56.101/instance"
// const connectionString = "postgres://user_FacturePro:1234@localhost/projet_Facturepro"
// const db = new pg.Pool({ connectionString: connectionString })
// const factureService = new FactureService(db)
// const produitService = new ProduitService(db)
// const useraccountService = new UserAccountService(db)
// const jwt = require('./jwt')(useraccountService)
//
// require('./api/FactureApi')(app, factureService, jwt)
// require('./api/ProduitApi')(app, produitService, jwt)
// require('./api/UserAccountApi')(app, useraccountService, jwt)
// require('./datamodel/seeders/seederFacture')(factureService)
// require('./datamodel/seeders/seederProduit')(produitService)
// require('./datamodel/seeders/seederUserAccount')(useraccountService)
//     .then(app.listen(3333))
// require('dotenv').config();
require('dotenv').config();
const pg = require('pg');
const express = require('express');
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

const connectionString = process.env.CONNECTION_STRING;
console.log(`Using database ${connectionString}`);
const db = new pg.Pool({ connectionString: connectionString });

const factureService = new FactureService(db);
const produitService = new ProduitService(db);
const useraccountService = new UserAccountService(db);
const jwt = require('./jwt')(useraccountService);

require('./api/FactureApi')(app, factureService, jwt);
require('./api/ProduitApi')(app, produitService, jwt);
require('./api/UserAccountApi')(app, useraccountService, jwt);
require('./datamodel/seeders/seederFacture')(factureService);
require('./datamodel/seeders/seederProduit')(produitService);
require('./datamodel/seeders/seederUserAccount')(useraccountService)
    .then(() => app.listen(process.env.PORT || 3333, () =>
        console.log(`Listening on the port ${process.env.PORT || 3333}`)
    ));
