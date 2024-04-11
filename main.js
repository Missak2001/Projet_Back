const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const AfficherService = require("./services/AfficherService")
const AvisService = require("./services/AvisService")
const ClientService = require("./services/ClientService")
const DemandeService = require("./services/DemandeService")
const EntrepriseService = require("./services/EntrepriseService")
const FactureService = require("./services/FactureService")
const ProduitService = require("./services/ProduitService")
const UserAccountService = require("./services/UserAccountService")



const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

//const connectionString = "postgres://user:password@192.168.56.101/instance"
const connectionString = "postgres://user_FacturePro:1234@localhost/projet_Facturepro"
const db = new pg.Pool({ connectionString: connectionString })
const afficherService = new AfficherService(db)
const avisService = new AvisService(db)
const clientService = new ClientService(db)
const demandeService = new DemandeService(db)
const entrepriseService = new EntrepriseService(db)
const factureService = new FactureService(db)
const produitService = new ProduitService(db)
const useraccountService = new UserAccountService(db)
const jwt = require('./jwt')(useraccountService)



require('./api/AfficherApi')(app, afficherService)
require('./api/AvisApi')(app, avisService)
require('./api/ClientApi')(app, clientService)
require('./api/DemandeApi')(app, demandeService)
require('./api/EntrepriseApi')(app, entrepriseService)
require('./api/FactureApi')(app, factureService)
require('./api/ProduitApi')(app, produitService)
require('./api/UserAccountApi')(app, useraccountService, jwt)
require('./datamodel/seeders/seederAfficher')(afficherService)
require('./datamodel/seeders/seederAvis')(avisService)
require('./datamodel/seeders/seederClient')(clientService)
require('./datamodel/seeders/seederDemande')(demandeService)
require('./datamodel/seeders/seederEntreprise')(entrepriseService)
require('./datamodel/seeders/seederFacture')(factureService)
require('./datamodel/seeders/seederProduit')(produitService)
require('./datamodel/seeders/seederUserAccount')(useraccountService)
    .then(app.listen(3333))


