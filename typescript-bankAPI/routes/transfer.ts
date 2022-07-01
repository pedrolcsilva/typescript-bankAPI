import {SendTransfer} from "../controllers";
import Router from "express";

const route = Router();

route.route('/transfer').put(new SendTransfer().handle.bind(new SendTransfer()));

export default route;