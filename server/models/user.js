const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username Required'],
        unique: true,
        maxlength: [20, 'Maximum 20 Characters Allowed'],
        minlength: [3, 'Minimun 3 Characters Required'],
        validate: {
            validator: v => /^[a-zA-Z][a-zA-Z0-9_\.]*$/.test(v),
            message: props => `${props.value} Is Not A Valid Username`
        }
    },
    password: {
        type: String,
        required: [true, 'Password Required'],
        maxlength: [20, 'Maximum 20 Characters Allowed'],
        minlength: [8, 'Minimun 8 Characters Required'],
        validate: {
            validator: v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])(?!.*\s).{8,}/.test(v),
            message: props => `${props.value} Is Not A Valid Password`
        }
    },
    first_name: {
        type:String,
        required: [true, 'Firstname Required'],
        maxlength: [20, 'Maximum 20 Characters Allowed'],
        validate: {
            validator: v => /^[\w]+$/.test(v),
            message: props => `${props.value} Is Not A Valid Name`
        }
    },
    last_name: {
        type:String,
        required: [true, 'Lastname Required'],
        maxlength: [20, 'Maximum 20 Characters Allowed'],
        validate: {
            validator: v => /^[\w]+$/.test(v),
            message: props => `${props.value} Is Not A Valid Name`
        }
    },
    email_id: {
        type: String,
        required: [true, 'Email Address Required'],
        lowercase: true,
        maxlength: [60, 'Maximum 60 Characters Allowed'],
        validate: {
            validator: v => /^[\w][\d\w\._]*@[\w].[\w]/i.test(v),
            message: props => `${props.value} Is Not A Valid Email ID`
        }
    },
    phone_no: {
        type: String,
        required: [true, 'Phone Number Required'],
        validate: {
            validator: v => /^\+\d{2,3}\d{3}\d{6,7}$/.test(v),
            message: props => `${props.value} Is Not A Valid Phone Number`
        }
    },
    profile_pic: {
        type: Buffer
    },
    DOB: {
        type: Date,
        validate: {
            validator: v => '/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/'.test(v),
            message: props => `${props.value} Is Not A Valid Date Of Birth`,
        },
        alias: 'date_of_birth',
    },
    preferences: {
        theme: {
            type: String, 
            enum: ['dark', 'light', 'solarized'],
            default: 'dark',
        },
    },
},{
    minimize: false,
    strictQuery: true,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

userSchema.pre('save', function(next){
    let user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err){
            return next(err);
        }
        user.password = hash + '';
        next();
    })
});

userSchema.statics.authenticate = function(user){
    return new Promise((resolve, reject) => {
        let { username, password } = user;
        User.findOne({ username: username }).exec()
        .then(async value => {
            if(!value){
                reject(new Error(`User ${username} Not Found`));
            }

            let pass;
            try{
                pass = await bcrypt.compare(password, value.password);
                console.log("PASS: ", pass);
            }
            catch(err){
                reject(err);
            }

            if(pass){
                let { password, ...otherThanPassword } = user;
                resolve({
                    ...otherThanPassword,
                }) 
            }
            else{
                reject(new Error(`Wrong Password For User ${username}`));
            }

        })
        .catch(err => {
            throw err;
        })
    })
}

let User = mongoose.model('User', userSchema);

module.exports = User;