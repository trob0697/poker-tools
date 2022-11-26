import dotenv from "dotenv";
dotenv.config();

const config = {
    development: {
        client: "postgresql",
        connection: process.env.DB_CONNECTION_STRING,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }
};

export default config;
