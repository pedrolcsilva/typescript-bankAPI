"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = __importDefault(require("express"));
const route = (0, express_1.default)();
route.route('/transfer').put(new controllers_1.SendTransfer().handle.bind(new controllers_1.SendTransfer()));
exports.default = route;
