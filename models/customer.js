import { Schema, model } from 'mongoose';

const customerSchema = Schema({
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    }
});

const Customer = model('customer', customerSchema);

export default Customer;