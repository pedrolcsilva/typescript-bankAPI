import {SendWithdraw} from "../controllers";
import Router from "express";

const route = Router();

route.route('/makeWithdraw').put(new SendWithdraw().handle.bind(new SendWithdraw()));

export default route;