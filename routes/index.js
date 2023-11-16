import express from "express";
import {
  addCustomer,
  addPurchaseDetails,
  addShippingDetails,
  getCustomerWithOrdersAndShipments,
  getCustomersWithCityFilter,
} from "../controllers/index.js";

const Router = express.Router();

Router.post("/addCustomer", addCustomer);
Router.post("/addShippingDetails", addShippingDetails);
Router.post("/addPurchaseDetails", addPurchaseDetails);
Router.get("/getCustomersWithCityFilter", getCustomersWithCityFilter);
Router.get("/getCustomerWithOrdersAndShipments", getCustomerWithOrdersAndShipments);

export default Router;
