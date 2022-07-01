import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT,
    POSTGRES: process.env.POSTGRES_CONNECTION_STRING
};

export {config};