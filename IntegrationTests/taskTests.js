
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

const dotenv = require("dotenv")
dotenv.config()
var PORT = process.env.PORT;
var IP = process.env.IP;
var HOST = 'http://'+IP+':'+PORT

let userId = 633
let taskId = '61a94aa2a70889b7babf9db7'
let taskIdStt404 = '404'
let taskIdStt400 = '400'


let date_ob = new Date();
let day = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear(); 

// create a task 
describe("when we issue a 'POST' to "+HOST+"/users/:userId/tasks ", function(){
    it("should return HTTP 200", function(done) {
        chai.request(HOST)
            .post('/users/'+userId+'/tasks')
            .type('form')
            .send({
                'taskName': 'chai_task',
                'time': year+'-'+month+'-'+day,
                'status': 'InProgress',
            })
            .end(function(req, res){
                expect(res.status).to.equal(201);
                done();
            });
    });
});

// Get all tasks of a user 
describe("when we issue a 'GET' to "+HOST+"/users/:userId/tasks ", function(){
    it("should return HTTP 200", function(done) {
        chai.request(HOST)
            .get('/users/'+userId+'/tasks')
            .query()
            .end(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});

// Get one task of a user 
describe("when we issue a 'GET' to "+HOST+"/users/:userId/tasks/:id ", function(){
    it("should return HTTP 200", function(done) {
        chai.request(HOST)
            .get('/users/'+userId+'/tasks/'+taskId)
            .query()
            .end(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});

// delete a task of a user 
describe("when we issue a 'DELETE' to "+HOST+"/users/:userId/tasks/:taskId ", function(){
    it("should return HTTP 200", function(done) {
        chai.request(HOST)
            .delete('/users/'+userId+'/tasks/'+taskId)
            .query()
            .end(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});

// delete a task of a user -> 400
describe("when we issue a 'DELETE' to "+HOST+"/users/:userId/tasks/:taskId ", function(){
    it("should return HTTP 400", function(done) {
        chai.request(HOST)
            .delete('/users/'+userId+'/tasks/'+taskIdStt400)
            .query()
            .end(function(req, res){
                expect(res.status).to.equal(400);
                done();
            });
    });
});

// Get one task of a user -> status 404
describe("when we issue a 'GET' to "+HOST+"/users/:userId/tasks/:id ", function(){
    it("should return HTTP 404", function(done) {
        chai.request(HOST)
            .get('/users/'+userId+'/tasks/'+taskIdStt404)
            .query()
            .end(function(req, res){
                expect(res.status).to.equal(404);
                done();
            });
    });
});