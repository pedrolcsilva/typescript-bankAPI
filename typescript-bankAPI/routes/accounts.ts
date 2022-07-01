import { InsertAccount } from "../controllers";
import Router from "express";

const route = Router();

route.route('/accounts').post(new InsertAccount().handle.bind(new InsertAccount()));

export default route;