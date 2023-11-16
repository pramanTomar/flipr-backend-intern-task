import CustomerDetails from "../models/customerDetails.js";
import PurchaseDetails from "../models/purchase.js";
import ShippingDetails from "../models/shippingDetails.js";
import { error, success } from "../Utils/response.js";

export const addCustomer = async (req, res) => {
  try {
    const { customer_name, email, mobile, city } = req.body;

    if (!customer_name || !email || !mobile || !city)
      res.send(error(500, "All fields are required"));

    if (mobile.length !== 10) res.send(error(500, "Invalid Mobile Number"));

    const existing_customer = await CustomerDetails.findOne({ email });
    if (existing_customer) res.send(error(500, "Email already used!"));

    const newCustomer = await CustomerDetails.create({
      customer_name,
      email,
      mobile,
      city,
    });

    await newCustomer.save();

    res.send(success(201, { newCustomer }));
  } catch (error) {
    console.log(error);
    res.send(error(500, "Something Went Wrong"));
  }
};

export const addShippingDetails = async (req, res) => {
  try {
    const { address, city, pincode, purchase_order_id, customer_id } = req.body;

    const newShippment = await ShippingDetails.create({
      address,
      city,
      pincode,
      purchase_order_id,
      customer_id,
    });

    await newShippment.save();

    res.send(success(201, { newShippment }));
  } catch (error) {
    console.log(error);
    res.send(error(500, "Something Went Wrong"));
  }
};
export const addPurchaseDetails = async (req, res) => {
  try {
    const {
      product_name,
      pricing,
      quantity,
      mrp,
      purchase_order_id,
      customer_id,
    } = req.body;
    const newPurchase = await PurchaseDetails.create({
      product_name,
      pricing,
      quantity,
      mrp,
      purchase_order_id,
      customer_id,
    });
    await newPurchase.save();
    res.send(success(201, { newPurchase }));
  } catch (error) {
    console.log(error);
    res.send(error(500, "Something went wrong"));
  }
};

export const getCustomersWithCityFilter = async (req, res) => {
    try {
        const city = req.headers;
        const result = await CustomerDetails.aggregate([
        {
            $match: { "city": city } // Filter customers based on the city
        },
        {
            $lookup: {
                from: "shippingDetail", // The name of the collection to join with
                localField: "customer_id", // The field from the customer collection
                foreignField: "customer_id", // The field from the shipping_details collection
                as: "shipmentDetails" // The alias for the result array
            }
        },
        {
            $project: {
            _id: 0, // Exclude the _id field from the result
            "customer_name": 1,
            "email": 1,
            "mobile": 1,
            "city": 1,
            "customer_id": 1,
            shipmentDetails: {
                $filter: {
                    input: "$shipmentDetails",
                    as: "shipment",
                    cond: { $eq: ["$$shipment.city", city] } // Filter shipment details based on city
                }
            }
            }
        }
    ]);
    
    res.send(success(201, result));

    } catch (error) {
        console.log(error);   
        res.send(error(500, "Something went wrong"));
    }
}

export const getCustomerWithOrdersAndShipments = async (req, res) => {
    try {
        const response = await CustomerDetails.aggregate([
        {
            $lookup: {
            from: "purchase",
            localField: "customer_id",
            foreignField: "customer_id",
            as: "purchaseOrders"
            }
        },
        {
            $unwind: "$purchaseOrders" // Unwind the purchaseOrders array to de-normalize the data
        },
        {
            $lookup: {
            from: "shippingDetail",
            localField: "purchaseOrders.purchase_order_id",
            foreignField: "purchase_order_id",
            as: "shipmentDetails"
            }
        },
        {
            $project: {
            _id: 0,
            customerId: "$customer_id",
            // Include other customer fields as needed
            purchaseOrders: {
                purchaseOrderId: "$purchaseOrders.purchase_order_id",
                productName: "$purchaseOrders.product_name",
                quantity: "$purchaseOrders.quantity",
                shipmentDetails: {
                $map: {
                    input: "$shipmentDetails",
                    as: "shipment",
                    in: {
                    address: "$$shipment.address",
                    city: "$$shipment.city",
                    pincode: "$$shipment.pincode",
                    // Include other shipment details fields as needed
                    }
                }
                }
            }
            }
        },
        {
            $group: {
            _id: "$customer_id",
            // Include other customer fields as needed
            purchaseOrders: { $push: "$purchaseOrders" }
            }
        },
        {
            $project: {
            _id: 0,
            customer_id: "$_id",
            purchaseOrders: 1
            }
        }
        ]);

        res.send(success(201, response));

    } catch (error) {
        console.log(error);
        res.send(error(500, "Something went wrong"));
    }
}