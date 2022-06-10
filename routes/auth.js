const authRouter = require('express').Router();
const User = require('../models/user')

authRouter.post('/signin', (req, res) => {
    const {email, password} = req.body;
    User.findByEmail(email).then((user) => {
        if (user) res.status(409).send('Email already used')
        else {
            User.create({email, password}).then((result) => {
                res.json(result)})
                .catch((err) => {
                    console.log(err);
                    res.status(500).send('Error creating user');
                })
        }
    })
})

authRouter.post('/login', (req, res) => {
    const {email, password} = req.body;
    User.findByEmail(email).then((user) => {
        if (!user) res.status(404).send('User not found')
        else {
            User.verifyPassword(password, user.hashedpassword).then((passwordIsOk) => {
                if (passwordIsOk) res.send('Welcome my friend');
                else res.status(401).send('Wrong password')
            })
        }
    })
})

module.exports = authRouter;