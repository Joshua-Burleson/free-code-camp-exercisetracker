const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId,
          srequired: true
   },
    username: {type: String,
               required: true
    },
    log: {type: Array,
               default: [],
               required: false
    },
    count:  {type: Number,
             default: 0,
             required: false
    }
}, {
    versionKey: false
});

const exerciseSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId,
          required: true
   },
    userId: {type: mongoose.Schema.Types.ObjectId,
             required: true
        },
    description: {type: String,
                  required: true
                },
    duration: {type: Number,
               required: true
            },
    date: {type: Date,
           default: Date.now,
           required: true
        }
}, {
    versionKey: false
});

const simpleUserSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId,
          srequired: true
   },
    username: {type: String,
               required: true
    }
}, {
    versionKey: false
});

const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);
const SimpleUser = mongoose.model('SimpleUser', simpleUserSchema);

module.exports = {User, Exercise, SimpleUser};