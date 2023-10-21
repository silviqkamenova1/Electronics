const mongoose = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [10, 'Name must be at least 10 characters'],
        required: [true, 'Name is required'],
    },
    type: {
        type: String,
        minLength: [2, 'Type must be at least 2 characters'],
        required: [true, 'Type is required'],
    },
    damage: {
        type: String,
        minLength: [10, 'Damage must be at least 10 characters'],
        required: [true, 'Damage is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            }, message: 'Image must be valid URL'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        validate: {
            validator: function (desc) {
                return desc.length > 10 && desc.length < 200;
            },
            message: `Description is not in range!`,
        }
    },
    production: {
        type: Number,
        required: [true, 'Production is required'],
        validate: {
            validator: function (desc) {
                return desc > 1900 && desc < 2023;
            },
            message: 'Production year is not in range!',
        }
    },
    exploitation: {
        type: Number,
        required: [true, 'Exploitation is required'],
        validate: {
            validator: function (value) {
                return value > 0;
            },
            message: 'Exploitation should be positive number!',
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        validate: {
            validator: function (value) {
              return value >= 0;
            },
            message:  'Price is not a positive number!',
        }
    },
    buyingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: [],
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
},
    {
        strict: false,
    });


const Electronics = mongoose.model('Electronics', electronicsSchema);

module.exports = Electronics;