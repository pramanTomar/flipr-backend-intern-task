import express from "express";
import {
  addCustomer,
  addPurchaseDetails,
  addShippingDetails,
} from "../controllers/index.js";

const Router = express.Router();

Router.post("/addCustomer", addCustomer);
Router.post("/addShippingDetails", addShippingDetails);
Router.post("/addPurchaseDetails", addPurchaseDetails);

export default Router;
