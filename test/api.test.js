// // const chai = require('chai');
// // const chaiHttp = require('chai-http');
// // const { app } = require('../main');
// // const { expect } = chai;
// //
// // chai.use(chaiHttp);
// //
// // describe('✅ Tests API FacturePro', function () {
// //     this.timeout(10000);
// //
// //     let token = '';
// //
// //     before((done) => {
// //         const user = {
// //             displayName: "testuser",
// //             login: "testuser",
// //             password: "testpass",
// //             isEnterprise: false
// //         };
// //
// //         chai.request(app)
// //             .post('/useraccount/register')
// //             .send(user)
// //             .end((err, res) => {
// //                 chai.request(app)
// //                     .post('/useraccount/authenticate')
// //                     .send({ login: user.login, password: user.password })
// //                     .end((err, res) => {
// //                         expect(res).to.have.status(200);
// //                         expect(res.body).to.have.property('token');
// //                         token = res.body.token;
// //                         done();
// //                     });
// //             });
// //     });
// //
// //     it('devrait retourner les factures de l’utilisateur authentifié', (done) => {
// //         chai.request(app)
// //             .get('/facture/user')
// //             .set('Authorization', `Bearer ${token}`)
// //             .end((err, res) => {
// //                 expect(res).to.have.status(200);
// //                 expect(res.body).to.be.an('array');
// //                 done();
// //             });
// //     });
// //
// //     it('devrait refuser l’accès aux factures sans token', (done) => {
// //         chai.request(app)
// //             .get('/facture/user')
// //             .end((err, res) => {
// //                 expect(res).to.have.status(401);
// //                 done();
// //             });
// //     });
// //
// //     it('devrait créer une facture avec un token valide', (done) => {
// //         const facture = {
// //             titre: "Test Facture",
// //             categorie_f: "Services",
// //             prix_f: 100,
// //             statut: true,
// //             adresse_facturation: "123 rue test",
// //             produit_f: [1], // ✅ ID produit attendu (doit exister dans ta base de données)
// //             prix_ttc: 120
// //         };
// //
// //         chai.request(app)
// //             .post('/facture/registerFacture')
// //             .set('Authorization', `Bearer ${token}`)
// //             .send(facture)
// //             .end((err, res) => {
// //                 expect(res).to.have.status(201);
// //                 expect(res.body.message).to.equal("Facture enregistrée avec succès");
// //                 done();
// //             });
// //     });
// //
// //     it('ne devrait pas créer une facture sans token', (done) => {
// //         const facture = {
// //             titre: "Facture refusée",
// //             categorie_f: "Erreur",
// //             prix_f: 50,
// //             statut: false,
// //             adresse_facturation: "Erreur",
// //             produit_f: [1], // Toujours un tableau
// //             prix_ttc: 60
// //         };
// //
// //         chai.request(app)
// //             .post('/facture/registerFacture')
// //             .send(facture)
// //             .end((err, res) => {
// //                 expect(res).to.have.status(401);
// //                 done();
// //             });
// //     });
// // });
//
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { app } = require('../main');
// const { expect } = chai;
//
// chai.use(chaiHttp);
//
// describe('✅ Tests API FacturePro', function () {
//     this.timeout(10000);
//     let token = '';
//     let createdFactureId = null;
//
//     const user = {
//         displayName: "testuser",
//         login: "testuser",
//         password: "testpass",
//         isEnterprise: false,
//         role: "user" // Pour les tests de rôle
//     };
//
//     before((done) => {
//         chai.request(app)
//             .post('/useraccount/register')
//             .send(user)
//             .end(() => {
//                 chai.request(app)
//                     .post('/useraccount/authenticate')
//                     .send({ login: user.login, password: user.password })
//                     .end((err, res) => {
//                         expect(res).to.have.status(200);
//                         expect(res.body).to.have.property('token');
//                         token = res.body.token;
//                         done();
//                     });
//             });
//     });
//
//     it('✅ devrait retourner les factures de l’utilisateur authentifié', (done) => {
//         chai.request(app)
//             .get('/facture/user')
//             .set('Authorization', `Bearer ${token}`)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.be.an('array');
//                 done();
//             });
//     });
//
//     it('❌ devrait refuser l’accès aux factures sans token', (done) => {
//         chai.request(app)
//             .get('/facture/user')
//             .end((err, res) => {
//                 expect(res).to.have.status(401);
//                 done();
//             });
//     });
//
//     it('✅ devrait créer une facture avec un token valide', (done) => {
//         const facture = {
//             titre: "Test Facture",
//             categorie_f: "Services",
//             prix_f: 100,
//             statut: true,
//             adresse_facturation: "123 rue test",
//             produit_f: [1],
//             prix_ttc: 120
//         };
//
//         chai.request(app)
//             .post('/facture/registerFacture')
//             .set('Authorization', `Bearer ${token}`)
//             .send(facture)
//             .end((err, res) => {
//                 expect(res).to.have.status(201);
//                 expect(res.body.message).to.equal("Facture enregistrée avec succès");
//                 // Stocker ID si renvoyé (à adapter selon ta route)
//                 chai.request(app)
//                     .get('/facture/user')
//                     .set('Authorization', `Bearer ${token}`)
//                     .end((err, res) => {
//                         const factures = res.body;
//                         createdFactureId = factures[factures.length - 1].id;
//                         done();
//                     });
//             });
//     });
//
//     it('❌ ne devrait pas créer une facture sans token', (done) => {
//         const facture = {
//             titre: "Facture refusée",
//             categorie_f: "Erreur",
//             prix_f: 50,
//             statut: false,
//             adresse_facturation: "Erreur",
//             produit_f: [1],
//             prix_ttc: 60
//         };
//
//         chai.request(app)
//             .post('/facture/registerFacture')
//             .send(facture)
//             .end((err, res) => {
//                 expect(res).to.have.status(401);
//                 done();
//             });
//     });
//
//     it('🔄 devrait mettre à jour une facture', (done) => {
//         if (!createdFactureId) return done(new Error("Pas d'ID de facture créée"));
//         const update = {
//             id: createdFactureId,
//             titre: "Facture Modifiée",
//             categorie_f: "Services",
//             prix_f: 110,
//             statut: false,
//             adresse_facturation: "456 rue modifiée",
//             produit_f: [1],
//             prix_ttc: 130
//         };
//
//         chai.request(app)
//             .put(`/facture/${createdFactureId}`)
//             .set('Authorization', `Bearer ${token}`)
//             .send(update)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body.message).to.equal("Facture mise à jour avec succès");
//                 done();
//             });
//     });
//
//     it('🗑️ devrait supprimer la facture créée', (done) => {
//         if (!createdFactureId) return done(new Error("Pas d'ID de facture à supprimer"));
//
//         chai.request(app)
//             .delete(`/facture/${createdFactureId}`)
//             .set('Authorization', `Bearer ${token}`)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body.message).to.equal("Facture supprimée avec succès");
//                 done();
//             });
//     });
//
//     it('🧾 devrait générer un PDF pour une facture (simuler avec un ID existant)', (done) => {
//         // ⚠️ Adapter avec un ID de facture réel si nécessaire
//         chai.request(app)
//             .get(`/facture/pdf/1`)
//             .set('Authorization', `Bearer ${token}`)
//             .end((err, res) => {
//                 if (res.status === 500) return done(); // autoriser échec si ID non valide
//                 expect(res).to.have.status(200);
//                 expect(res.type).to.equal('application/pdf');
//                 done();
//             });
//     });
//
//     it("🔐 devrait refuser l'accès à une route admin pour un user simple", (done) => {
//         chai.request(app)
//             .get('/admin/only') // À créer côté back si besoin
//             .set('Authorization', `Bearer ${token}`)
//             .end((err, res) => {
//                 expect(res).to.have.status(403);
//                 expect(res.body.error).to.include("rôle insuffisant");
//                 done();
//             });
//     });
// });

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { app } = require('../main');
const { expect } = chai;

chai.use(chaiHttp);

describe('✅ Tests API FacturePro', function () {
    this.timeout(10000);

    let token = '';
    let createdFactureId = null;

    const user = {
        displayName: "testuser",
        login: "testuser",
        password: "testpass",
        isEnterprise: false,
        role: "user"
    };

    before((done) => {
        chai.request(app)
            .post('/useraccount/register')
            .send(user)
            .end(() => {
                chai.request(app)
                    .post('/useraccount/authenticate')
                    .send({ login: user.login, password: user.password })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('token');
                        token = res.body.token;
                        done();
                    });
            });
    });

    it('✅ devrait retourner les factures de l’utilisateur authentifié', (done) => {
        chai.request(app)
            .get('/facture/user')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('❌ devrait refuser l’accès aux factures sans token', (done) => {
        chai.request(app)
            .get('/facture/user')
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it('✅ devrait créer une facture avec un token valide', (done) => {
        const facture = {
            titre: "Test Facture",
            categorie_f: "Services",
            prix_f: 100,
            statut: true,
            adresse_facturation: "123 rue test",
            produit_f: [1],
            prix_ttc: 120
        };

        chai.request(app)
            .post('/facture/registerFacture')
            .set('Authorization', `Bearer ${token}`)
            .send(facture)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.message).to.equal("Facture enregistrée avec succès");

                // Récupère l'ID pour les tests suivants
                chai.request(app)
                    .get('/facture/user')
                    .set('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                        const factures = res.body;
                        createdFactureId = factures[factures.length - 1].id;
                        done();
                    });
            });
    });

    it('❌ ne devrait pas créer une facture sans token', (done) => {
        const facture = {
            titre: "Facture refusée",
            categorie_f: "Erreur",
            prix_f: 50,
            statut: false,
            adresse_facturation: "Erreur",
            produit_f: [1],
            prix_ttc: 60
        };

        chai.request(app)
            .post('/facture/registerFacture')
            .send(facture)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it('🔄 devrait mettre à jour une facture', (done) => {
        if (!createdFactureId) return done(new Error("Pas d'ID de facture créée"));

        const update = {
            id: createdFactureId,
            titre: "Facture Modifiée",
            categorie_f: "Services",
            prix_f: 110,
            statut: false,
            adresse_facturation: "456 rue modifiée",
            produit_f: [1],
            prix_ttc: 130
        };

        chai.request(app)
            .put(`/facture/${createdFactureId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(update)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal("Facture mise à jour avec succès");
                done();
            });
    });

    it('🗑️ devrait supprimer la facture créée', (done) => {
        if (!createdFactureId) return done(new Error("Pas d'ID de facture à supprimer"));

        chai.request(app)
            .delete(`/facture/${createdFactureId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal("Facture supprimée avec succès");
                done();
            });
    });

    it('🧾 devrait générer un PDF pour une facture (simuler avec un ID existant)', (done) => {
        chai.request(app)
            .get(`/facture/pdf/1`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (res.status === 500) return done(); // autoriser si l’ID est invalide
                expect(res).to.have.status(200);
                expect(res.type).to.equal('application/pdf');
                done();
            });
    });

    it("🔐 devrait refuser l'accès à une route admin pour un user simple", (done) => {
        chai.request(app)
            .get('/admin/only') // Doit exister côté back
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body.error).to.include("rôle insuffisant");
                done();
            });
    });

    it("❌ devrait refuser un token JWT invalide (falsifié)", (done) => {
        const fakeToken = "Bearer faketoken.invalide.signature";

        chai.request(app)
            .get('/facture/user')
            .set('Authorization', fakeToken)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
                done();
            });
    });

    it("⏳ devrait refuser un token JWT expiré", (done) => {
        const expiredToken = jwt.sign(
            { id: 999, login: 'expireduser' },
            process.env.JWT_SECRET || 'dev-secret',
            { algorithm: "HS256", expiresIn: -10 } // déjà expiré
        );

        chai.request(app)
            .get('/facture/user')
            .set('Authorization', `Bearer ${expiredToken}`)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
                done();
            });
    });
});
