import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = process.env.DATABASE_URL;
let sequelize;

if ((process.env.DB_DIALECT === "sqlite" && !process.env.DB_HOST) || connectionString?.startsWith("sqlite") || (!connectionString && !process.env.DB_HOST)) {
  const storagePath = process.env.DB_STORAGE 
    ? path.resolve(__dirname, "..", process.env.DB_STORAGE.replace(/^\.\//, ""))
    : path.resolve(__dirname, "../database.sqlite");

  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: storagePath,
    logging: false,
    define: {
      timestamps: true,
    },
  });
} else if (process.env.DB_DIALECT === "mysql" || connectionString?.startsWith("mysql")) {
  if (connectionString) {
    sequelize = new Sequelize(connectionString, {
      dialect: "mysql",
      logging: false,
      define: { timestamps: true },
    });
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME || "news_db",
      process.env.DB_USER || "root",
      process.env.DB_PASSWORD || "",
      {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        dialect: "mysql",
        logging: false,
        define: { timestamps: true },
      }
    );
  }
} else {
  // PostgreSQL or Default
  if (connectionString) {
    const isSslRequired =
      connectionString.includes("neon.tech") ||
      connectionString.includes("sslmode=require") ||
      process.env.DB_SSL === "true";

    sequelize = new Sequelize(connectionString, {
      dialect: "postgres",
      logging: false,
      dialectOptions: isSslRequired
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
      define: { timestamps: true },
    });
  } else {
    const host = process.env.DB_HOST || "localhost";
    const isSslRequired = host.includes("neon.tech") || process.env.DB_SSL === "true";

    sequelize = new Sequelize(
      process.env.DB_NAME || "news_db",
      process.env.DB_USER || "postgres",
      process.env.DB_PASSWORD || "",
      {
        host,
        port: process.env.DB_PORT || 5432,
        dialect: "postgres",
        logging: false,
        dialectOptions: isSslRequired
          ? {
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            }
          : {},
        define: { timestamps: true },
      }
    );
  }
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to Database successfully!");
    await sequelize.sync({
      alter: process.env.NODE_ENV === "development",
    });
    console.log("Table Synchronized!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export { sequelize, connectDB };
export default sequelize;
