import {AccessAccount} from "../controllers";
import Router from "express";

const route = Router();

route.route('/access').post(new AccessAccount().handle.bind(new AccessAccount()));

export default route;