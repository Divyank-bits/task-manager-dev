const assert = require('assert');
const express = require('express');
const supertest = require('supertest');
const authRouter = require('../src/routes/auth.routes');
const chai = require('chai');
require('../src/db/mongoose')

const app = express();
const request = supertest(app);
const expect = chai.expect;

app.use(express.json());
app.use('/', authRouter);



describe('Auth API Endpoints', () => {
  it('should login a user', async () => {
    const response = await request.post('/login').send({
        email:'1223@gmail.com',
        password:'1234567'
    });

    expect(response.status).to.equal(200);
  });

  it('should not use a existing email address' , async ()=> {
    const response = await request.post('/signup').send({
        name: 'API Test',
        age: 25,
        password: '1234567',
        email: 'teeeeeeeeest@test.com',
    });
    expect(response.status).to.equal(500);
  })

  it('should signup a new user', async () => {
    const response = await request.post('/signup').send({
        name: 'API Test',
        age: 25,
        password: '1234567',
        email: 'tst@test.com',
    });

    expect(response.status).to.equal(201);
    
  })
  it('should logout a user', async () => {

    const loginResponse = await request.post('/login').send({
        email:'test@test.com',
        password:'1234567'
    });

    const response = await request.post('/logout')
      .set('Authorization', `Bearer ${loginResponse._body[1]}`);
    
    expect(response.status).to.equal(200);

  });
  it('should logout all sessions for a user', async () => {

    const loginResponse = await request.post('/login').send({
        email:'test@test.com',
        password:'1234567'
    });

    const response = await request.post('/logoutAll')
      .set('Authorization', `Bearer ${loginResponse._body[1]}`);
    
    expect(response.status).to.equal(200);
  });

});