const env = require("./server/env");

const isSqlite = env.DB_CLIENT === "sqlite3" || env.DB_CLIENT === "better-sqlite3";
const isMySQL = env.DB_CLIENT === "mysql" || env.DB_CLIENT === "mysql2";

module.exports = {
  client: env.DB_CLIENT,
  connection: {
    ...(isSqlite && { filename: "db/" + env.DB_FILENAME }),
    ...(isMySQL && { dateStrings: true, timezone: "Z" }),
    host: env.DB_HOST,
    database: env.DB_NAME,
    user: env.DB_USER,
    port: env.DB_PORT,
    password: env.DB_PASSWORD,
    ssl: env.DB_SSL,
  },
  useNullAsDefault: true,
  migrations: {
    tableName: "knex_migrations",
    directory: "server/migrations",
    disableMigrationsListValidation: true,
  }
};
