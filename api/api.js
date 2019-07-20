const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRouter = express.Router();
const schemas = require('./schema.js');
const validation = require('../dbFunctions/validation.js');
const db = require('../dbFunctions/db.js');

//const {updateUser, simpleUserData} = require('../dbFunctions/db.js');

apiRouter.use(bodyParser.urlencoded({extended: false}))

//POST New User
apiRouter.post('/exercise/new-user', (req, res, next) => {
    let newUser = new schemas.User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username
    });

    newUser.save((err) => {
        if(err){
            throw err;
        }else{
            let simpleNewUser = new schemas.SimpleUser({
                _id: newUser._id,
                username: req.body.username
            });
        
            simpleNewUser.save((err) => {
                if(err){
                    res.end(JSON.stringify(err));
                }else{
                    res.end(JSON.stringify(simpleNewUser));
                }
            });
        }
    });
});

//GET All Users
apiRouter.get('/exercise/users', (req, res, next) => {
    schemas.SimpleUser.find({}, null, (err, users) => {
        if(err){
            throw err;
        }else{
            res.end(JSON.stringify(users));
        }
    });
});

//POST New Exercise
apiRouter.post('/exercise/add', (req, res, next) => {
    //Validate entry
    req.body.date = validation.dateValidation(req.body.date);
    if(!Number(req.body.duration)){
        res.status(400).send('Duration must be a valid number');
    }

    let newExercise = {
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date
    }

    if(validation.reverseValidateExercise(newExercise)){
        res.status(400).send(validation.reverseValidateExercise(newExercise));
        return
    }

    schemas.User.findOneAndUpdate({_id: req.body.userId}, {$push: {log: newExercise}, $inc: {count: 1}}, {new: true}, (err, updatedUser) => {
        if(err){
            res.end('unknown _id');
        }else{
            console.log('!!',updatedUser)
            res.end(JSON.stringify({
                username: updatedUser.username,
                description: newExercise.description,
                duration: newExercise.duration,
                date: newExercise.date
            }));
        }
    });

});

//GET All Data for a User with PARAM
// apiRouter.get('/exercise/log/:userId', (req, res, next) => {
//     console.log('Here')
//     schemas.User.find({_id: req.params.userId}, null, (err, user) => {
//         if(err){
//             res.end(JSON.stringify(err));
//         }else{
//             if(user.length === 0){
//                 res.sendStatus(404);
//                 return
//             }
//         user = user[0];
//         res.end(JSON.stringify(user));
//         }
//     });
// });


//GET All Data for a User with QUERY
apiRouter.get('/exercise/log', (req, res, next) => {
    if(!req.query.userId){
        schemas.User.find({},null, (err, users) => {
            if(err){
                res.end(JSON.stringify(err));
            }
            else{

                res.end(JSON.stringify(users));
            }
        });
    }
    else{
        schemas.User.find({_id: req.query.userId}, null, (err, userData) => {
            if(err){
                res.end(JSON.stringify(err));
            }
            userData = userData[0];
            userData.log = db.customizeLog(userData, req.query.from, req.query.to, req.query.limit);
            userData.count = userData.log.length;
            res.end(JSON.stringify(userData));
        })
    }
});

module.exports = apiRouter;