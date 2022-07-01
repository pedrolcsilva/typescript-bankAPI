import Router from 'express';
import { Logout } from '../controllers';
const route = Router();

route.route('/logout',).post((new Logout().handle.bind(new Logout())));

export default route;