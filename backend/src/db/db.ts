import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: __dirname + '/../../.env' });

//npx typeorm-ts-node-esm migration:generate -d src/db/db.ts src/db/migrations/initial // сгенерировать
// npx typeorm-ts-node-esm migration:run -d src/db/db.ts // применить
// не забывай компилить

const db = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: ["src/db/orm/*.ts"],
    subscribers: [],
    migrations: ["dist/db/migrations/*.js"],
})

// Инициализация источника данных
db.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });

export default db;