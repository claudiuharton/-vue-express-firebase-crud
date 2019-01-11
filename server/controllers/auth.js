const database = require('../config/firebase')
const _ = require('lodash');

const middleware = {
    checkLogin: async (req, res, next) => {
        const token = req.session.token;
        const id = req.session.id;

        const snapshot = await database.ref('users').once('value');
        const users = _.toArray(snapshot.val())
        const user = users.filter(user => user.token === token && user.id === id);

        (user.length === 0)?res.status(403).send({message: "Forbidden"}):next()

    }
}

const controller ={
    login: async (req, res) => {
        const email     = req.body.email;
        const password = req.body.password;

        const snapshot = await database.ref('users').once('value');
        const users = _.toArray(snapshot.val())
        const user = users.filter(user => user.password === password && user.email === email);

        if (user.length === 0) {
            res.status(403).send({message:"Incorrect email/password"});
        } else {
            if (req.session.id) {
                res.status(202).send({message:"Already logged in"})
            } else {
                req.session.id = user[0].id;
                req.session.token = user[0].token;
                res.status(200).send({message:"Login successfully"})
            }
        }
    },
    register:async (req,res) =>{
        const email= req.body.email;
        const password = req.body.password;

        if (!email.match('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])'))
            res.status(400).send({message:"Invalid Email"});
        else if(!password.length > 4)
            res.status(400).send({message:"Invalid password"});

        const usersRef = database.ref('users');
        const snapshot = await usersRef.once('value');
        const users = _.toArray(snapshot.val())
        const user = users.filter(user => user.password === password && user.email === email);

        if (user.length !== 0){
            res.status(400).send({message:`Email ${user[0].email} have already an account.`})
        }else{
            const newUserRef = usersRef.push();
            newUserRef.set({
                id:users.length+1,
                email:email,
                token:Math.random().toString(36),
                password:password
            })

            res.status(201).send({message:"Success registered"});
        }

    },
    logout:(req, res) => {
        req.session.reset();
        res.status(200).send({message:"You've been logged out"});
    },
    middleware
}



module.exports = controller;

