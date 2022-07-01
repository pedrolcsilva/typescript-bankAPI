"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = __importDefault(require("express"));
const accounts_1 = __importDefault(require("./accounts"));
const login_1 = __importDefault(require("./login"));
const access_1 = __importDefault(require("./access"));
const deposit_1 = __importDefault(require("./deposit"));
const withdraw_1 = __importDefault(require("./withdraw"));
const logout_1 = __importDefault(require("./logout"));
const transfer_1 = __importDefault(require("./transfer"));
const extract_1 = __importDefault(require("./extract"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const route = (0, express_2.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(accounts_1.default);
app.use(login_1.default);
app.use(access_1.default);
app.use(deposit_1.default);
app.use(withdraw_1.default);
app.use(logout_1.default);
app.use(transfer_1.default);
app.use(extract_1.default);
exports.default = app;