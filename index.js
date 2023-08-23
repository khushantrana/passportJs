const express = require('express');

const mongoose = require('mongoose');
const ejs = require('ejs');
const { connectMongoose, User } = require('./database');
const passport = require('passport');
const { intializingPassport } = require('./PassportConfig');
connectMongoose();
const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/register', (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
})

app.post('/register', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        return res.status(400).send("User already exist");
    }
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
});
// app.post('/login', (req, res) => {
    
// });
app.set("view engine","ejs");

app.listen(8000, () => {
    console.log('Listening on the port 8000');
});