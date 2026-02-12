import userModel from "./user.model.js";
import { Sequelize } from "sequelize";

const masterSequelize = new Sequelize(
    'master',
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true,
                trustServerCertificate: true,
            }
        },
        logging: false
    }
);

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true,
                trustServerCertificate: true,
            }
        },
        logging: false
    }
);

const db = {};
db.sequelize = sequelize;
db.user = userModel(sequelize);

const MAX_RETRIES = 5;
let retries = 0;

const connectWithRetry = async () => {
    try {
        await masterSequelize.query(
            `IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '${process.env.DB_DATABASE}') CREATE DATABASE [${process.env.DB_DATABASE}];`
        );
        await sequelize.authenticate();
        await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
        console.log('DB connected');
    } catch (err) {
        if (retries < MAX_RETRIES) {
            retries++;
            console.log(`DB not ready, retrying in 5s... (${retries}/${MAX_RETRIES})`);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.error('Could not connect to DB', err);
            process.exit(1);
        }
    }
};

connectWithRetry();

export default db;