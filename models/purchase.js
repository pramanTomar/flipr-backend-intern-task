import mongoose, { Schema, model, mongo } from "mongoose";
const purchaseSchema = Schema({
  product_name: {
    type: String,
    require: true,
  },
  pricing: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  mrp: {
    type: Number,
    require: true,
  },
  purchase_order_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
});
module.exports = mongoose.model("purchase", purchaseSchema);
