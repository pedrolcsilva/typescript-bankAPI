import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use('/', express.static('./pages/home'));
app.use('/cadastrar', express.static('./pages/cadastrar'));
app.use('/acessar', express.static('./pages/acessar'));
app.use('/conta', express.static('./pages/conta'));

app.listen(port, () => console.log('Front End aberto!'));
