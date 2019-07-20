const exerciseMessages = {
    description: "Description is required",
    duration: "Duration is required"
}

const reverseValidateExercise = (exercise) => {
    if(!exercise.description){
        return exerciseMessages.description;
    }else if(!exercise.description){
        return exerciseMessages.duration;
    }else{
        return false;
    }
}

const today = () => {
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
};

const dateValidation = (date) => {
    if(!date || date.match(/[a-zA-z]/) > 0){
        date = new Date(today());
    }else{
        date = new Date(date);
    }
    return String(date).split(' ').slice(0, 4).join(' ');
}

const validateDuration = (duration) => ! Number(duration) ? false : true;

module.exports = {reverseValidateExercise,
                  validateDuration,
                  dateValidation,
                  today}