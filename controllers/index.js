import CustomerDetails from '../models/customerDetails.js';
import ShippingDetails from "../models/shippingDetails.js";
import {error, success} from "../Utils/response.js";

export const addCustomer = async (req, res) => {
    try {
        const { customer_name, email, mobile, city } = req.body;
        
        if (!customer_name || !email || !mobile || !city ) res.send(error(500, "All fields are required"));

        if(mobile.length !== 10) res.send(error(500, "Invalid Mobile Number"));

        const existing_customer = await CustomerDetails.findOne({ email });
        if (existing_customer) res.send(error(500, "Email already used!"));

        const newCustomer = await CustomerDetails.create({
            customer_name,
            email,
            mobile,
            city
        })
        
        await newCustomer.save();

        res.send(success(201, { newCustomer }));

    } catch (error) {
        console.log(error);
        res.send(error(500, "Something Went Wrong"));
    }
}


export const addShippingDetails = async (req, res) => {
    try {
        const { address, city, pincode, purchase_order_id, customer_id } = req.body;

        const newShippment = await ShippingDetails.create({
            address,
            city,
            pincode,
            purchase_order_id,
            customer_id
        })
        
        await newShippment.save();

        res.send(success(201, { newShippment }));
        
    } catch (error) {
        console.log(error);
        res.send(error(500, "Something Went Wrong"));
    }
}

