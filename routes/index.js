import express from 'express';
import { addCustomer, addShippingDetails } from '../controllers/index.js';

const Router = express.Router();

Router.get('/addCustomer', addCustomer);
Router.get('/addShippingDetails', addShippingDetails);

export default Router;