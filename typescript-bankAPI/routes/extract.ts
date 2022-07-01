import Router from 'express';
import { Extract } from '../controllers';

const route = Router();

route.route('/extract').post(new Extract().handle.bind(new Extract()));

export default route;