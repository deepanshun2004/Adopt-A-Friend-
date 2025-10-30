const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

const usersFilePath = path.join(__dirname, '../models/users.json');
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send("Error reading user data.");
        
        const users = JSON.parse(data);
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            res.redirect('/dashboard');
        } else {
            res.redirect('/register');
        }
    });
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        let users = [];
        if (!err) {
            users = JSON.parse(data);
        }

        if (users.some(user => user.username === username)) {
            res.redirect('/login');
            return;
        }

        users.push({ username, password });

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).send("Error saving user data.");
            res.redirect('/login');
        });
    });
});

module.exports = router;
