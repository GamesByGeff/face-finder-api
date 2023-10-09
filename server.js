const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1', // this number means localhost or "home"
        user : 'postgres',
        password : 'Zage6964',
        database : 'face-finder'
    }
});

const app = express();

app.use(cors());
app.use(express.json());

// Signin Info
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

// Register User (dependency injection)
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// Get User Profile
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

// Post image score
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res,) })

app.listen(3001, () => {
    console.log('app running on port 3001');
})