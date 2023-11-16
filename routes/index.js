import express from 'express';
import { addCustomer } from '../controllers/index.js';

const Router = express.Router();

Router.get('/', addCustomer);

export default Router;