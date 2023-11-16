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

export const customer_all_purchaseOrder = async (req, res) => {
  try {
    const response = await PurchaseDetails.aggregate([
      {
        $lookup: {
          from: "purchase", // The name of the collection to join with
          localField: "customer_id", // The field from the customer collection
          foreignField: "purchase_order_id", // The field from the purchase_order_details collection
          as: "purchaseOrders", // The alias for the result array
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field from the result
          customer_id: 1,
          // Include other customer fields as needed
          purchaseOrders: {
            $map: {
              input: "$purchaseOrders",
              as: "order",
              in: {
                purchaseOrderId: "$$order.purchase_order_id",
                productName: "$$order.product_name",
                quantity: "$$order.quantity",
                // Include other purchase order fields as needed
              },
            },
          },
        },
      },
    ]);
    res.send(success(201, response));
  } catch (error) {
    console.log(error);
    res.send(error(500, "something went wrong"));
  }
};
