const { User } = require('../models');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

function signup(req, res, next) {
    let user_creds = req.body;
    console.log(user_creds);
    let user = new User(user_creds);
    user.save((err, result) => {
        if(err){
            err.status = 422;
            return next(err);
        }

        res.json(result);
    })/* .then(result => {
        if(result){
            res.json({
                result,
            })
        }
        res.sendStatus(200);
    }).catch((err) => {
        next(err);
    }) */
}

function authenticate(req, res, next) {
    let user = {
        username: req.body.username,
        password: req.body.password,
    };

    User.authenticate(user)
    .then(user => {
        jwt.sign(user, config.secret, {}, (err, token) => {

            if(err){
                return next(err);
            }
            res.json({
                ...user,
                token
            });
        });
    }, err =>{
        err.status = 401;
        return next(err);
    });
}

function getAll(req, res, next) {
    res.json({
        message: 'Hello'
    });
}

module.exports = {
    signup,
    authenticate,
    getAll,
}