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
            validator: v => '/^[a-zA-Z][a-zA-Z0-9_.]+$/'.test(v),
            message: props => `${props.value} Is Not A Valid Username`
        }
    },
    password: {
        type: String,
        required: [true, 'Password Required'],
        maxlength: [20, 'Maximum 20 Characters Allowed'],
        minlength: [8, 'Minimun 8 Characters Required'],
        validate: {
            validator: v => '/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])(?!.*\s).{8,}/'.test(v),
            message: props => `${props.value} Is Not A Valid Password`
        }
    },
    first_name: {
        type:String,
        maxlength: [20, 'Maximum 20 Characters Allowed'],
        validate: {
            validator: v => '/^[\w]$/'.test(v),
            message: props => `${props.value} Is Not A Valid Name`
        }
    },
    last_name: {
        type:string,
        maxlength: [20, 'Maximum 20 Characters Allowed'],
        validate: {
            validator: v => '/^[\w]$/'.test(v),
            message: props => `${props.value} Is Not A Valid Name`
        }
    },
    email_id: {
        type: String,
        lowercase: true,
        maxlength: [60, 'Maximum 60 Characters Allowed'],
        validate: {
            validator:
        }
    },
    phone_no: {
        type: String,
        validate: {
            validator: v => '/^+\d{2,3}\d{3}\d{6,7}$/'.test(v),
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
            enum: [dark, light, solarized]
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

let User = mongoose.model('User', userSchema);

module.exports = User;