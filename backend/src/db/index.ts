import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "../config/db.config";

async function initializeDatabaseConnection(): Promise<Sequelize> {
    const sequelize = new Sequelize({
        database: config.DB,
        username: config.USER,
        password: config.PASSWORD,
        host: config.HOST,
        dialect: dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        },
        models: []
    });

    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        return sequelize;
    } catch (error) {
        console.error("Unable to connect to the Database:", error);
        throw error;
    }
}

export { initializeDatabaseConnection };

