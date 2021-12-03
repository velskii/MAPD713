
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

const dotenv = require("dotenv")
dotenv.config()
var PORT = process.env.PORT;
var IP = process.env.IP;
//var HOST = process.env.HEROKU_HOST;
var HOST = 'http://'+IP+':'+PORT;

let patientId = '6179c2450c1cd71d6a8c5e50'
let patientIdStt404 = '6179c2450c1cd71d6a8c5e51'
let deletedPatient200 = '61a987cd95b28804125f5c92'


// 1. get patient list -> status 200
describe("when we issue a 'GET' to "+HOST+"/patients ", function(){
    it("should return HTTP 200", function(done) {
        chai.request(HOST)
            .get('/patients')
            .query().end(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});
// 2.1. get one patient -> status 200
describe("when we issue a 'GET' to "+HOST+"/patients/:id ", function(){
    it("should return HTTP 200", function(done) {
        chai.request(HOST)
            .get('/patients/'+ patientId)
            .query()
            .end(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});
// 2.2. get one patient -> status 404
describe("when we issue a 'GET' to "+HOST+"/patients/:id ", function(){
    it("should return HTTP 404", function(done) {
        chai.request(HOST)
            .get('/patients/'+ patientIdStt404)
            .query()
            .end(function(req, res){
                expect(res.status).to.equal(404);
                done();
            });
    });
});

//3. create a patient -> status 201
describe("when we issue a 'POST' to "+HOST+"/patients", function(){
    it("should return HTTP 201", function(done) {
        chai.request(HOST)
            .post('/patients')
            .type('form')
            .send({
                'firstName': 'Kari',
                'lastName': 'Lesotho',
                'age': '77',
                'gender':'Male',
                'healthInsuranceNo':'HI90123',
                'phoneNo':'4168370648',
                'email': 'ksa@gmail.com'
            })
            .end(function(req, res){
                expect(res.status).to.equal(201);
                done();
            });
    });
});

//4.1. delete a patient -> status 200
describe("when we issue a 'DEL' to "+HOST+"/patients/:patientId", function(){
    it("should return HTTP 200", function(done) {
        chai.request(HOST)
            .delete('/patients/'+ deletedPatient200)
            .query()
            .end(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});

// 4.2. delete a patient (patientId not found) -> status 404
describe("when we issue a 'DEL' to "+HOST+"/patients/:patientId", function(){
    it("should return HTTP 404", function(done) {
        chai.request(HOST)
            .delete('/patients/' + "")
            .query()
            .end(function(req, res){
                expect(res.status).to.equal(404);
                done();
            });
    });
});

