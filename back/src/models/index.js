import userModel from "./user.model.js";
import { Sequelize } from "sequelize"

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
                encrypt:true,
                trustServerCertificate: true,
                instanceName: process.env.DB_INSTANCENAME
            }
        }
    }
)

const db = {}
db.sequelize = sequelize;
db.user = userModel(sequelize)

await sequelize.sync({ alter:true });

export default db;