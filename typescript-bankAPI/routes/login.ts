import { LoginAccount} from "../controllers";
import Router from "express";

const route = Router();

route.route('/login').post(new LoginAccount().handle.bind(new LoginAccount()));

export default route;