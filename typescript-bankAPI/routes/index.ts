import express from 'express';
import Router from 'express';
import Accounts from './accounts';
import Login from './login';
import Access from './access';
import SendDeposit from './deposit';
import SendWithdraw from './withdraw';
import Logout from './logout';
import SendTransfer from './transfer';
import Extract from './extract';
import cookieParser from 'cookie-parser';

const app = express();

const route = Router();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use(Accounts);
app.use(Login);
app.use(Access);
app.use(SendDeposit);
app.use(SendWithdraw);
app.use(Logout);
app.use(SendTransfer);
app.use(Extract);


export default app;