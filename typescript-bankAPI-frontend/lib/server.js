"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use('/', express_1.default.static('./pages/home'));
app.use('/cadastrar', express_1.default.static('./pages/cadastrar'));
app.use('/acessar', express_1.default.static('./pages/acessar'));
app.use('/conta', express_1.default.static('./pages/conta'));
app.listen(port, () => console.log('Front End aberto!'));
