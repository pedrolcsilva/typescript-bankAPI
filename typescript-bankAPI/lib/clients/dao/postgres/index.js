"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDB = void 0;
const pg_1 = require("pg");
const config_1 = require("../../../config");
class myDB {
    constructor() {
        this.client = new pg_1.Client({
            connectionString: config_1.config.POSTGRES
        });
        this.client.connect();
    }
}
exports.myDB = myDB;
