const schemas = require('../api/schema.js');

const updateUser = (userId, newExercise) => {
    schemas.User.findOneAndUpdate({_id: userId}, {exercise: newExercise, count: exercise.length}, (err, data) => {
        if(err){
            throw err
        }else{
        console.log('User Update Successful');
        }
    });

}

const simpleUserData = (userId, extended = false) => {
    schemas.User.find({_Id: userId}, null, (err, user) => {
        if(err){
            return err
        }else{
            return {
                _Id: user._Id,
                username: user.username
            }
        }
    });
}

const customizeLog = (userData, from = false, to = false, limit = false) => {
    console.log(userData);
    let exerciseArray = userData.log;
    let targetedExercise = false;

    if(from){
            targetedExercise = exerciseArray.filter((exercise) => {
            return new Date(exercise.date) >= new Date(from);
        });
    };

    if(to){
        if(!targetedExercise){targetedExercise = exerciseArray}
        targetedExercise = targetedExercise.filter((exercise) => {
            return new Date(exercise.date) <= new Date(to);
        });
    }

    if(limit){
        if(!targetedExercise){targetedExercise = exerciseArray}
        targetedExercise = targetedExercise.slice(0, limit);
    }

    return targetedExercise ? targetedExercise : exerciseArray;
}

module.exports = {
                    updateUser,
                    simpleUserData,
                    customizeLog
                }