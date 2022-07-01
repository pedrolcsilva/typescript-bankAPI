import {SendDeposit} from "../controllers";
import Router from "express";

const route = Router();

route.route('/makeDeposit').put(new SendDeposit().handle.bind(new SendDeposit()));

export default route;