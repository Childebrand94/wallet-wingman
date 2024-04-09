import pkg from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const initDB = async () => {
    try {
        const sql = readFileSync(resolve(__dirname, 'init.sql'), { encoding: 'utf-8' });
        await pool.query(sql);
        console.log('Database initialized');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

if (process.env.INIT_DB === 'true') {
    (async () => {
        try {
            await initDB();
        } catch (error) {
            console.error('Failed to initialize the database:', error);
        }
    })();
}
