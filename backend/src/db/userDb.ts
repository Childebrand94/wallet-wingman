import { User } from '../models/userModel.js';
import { pool } from '../db/initDb.js';

const queries = {
    createUser: 'INSERT INTO users (user_name, email, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5)',
    getUserById: 'SELECT * FROM users WHERE id = $1',
    getUserByEmail: 'SELECT * FROM users WHERE email = $1',
    updateUser: 'UPDATE users SET user_name = $1, email = $2, first_name = $3, last_name = $4, password = $5 WHERE id = $6',
    deleteUser: 'DELETE FROM users WHERE id = $1',
};

export async function saveUserDb(user: User) {
    console.log(`Saving user: ${user}`);
}

export async function getUserByIdDb(id: number): Promise<User | null> {
    const dbConnetion = await pool.connect();
    try {
        const result = await dbConnetion.query(queries.getUserById, [id]);
        return result.rows[0];
    } catch {
        return null;
    } finally {
        dbConnetion.release();
    }
}

export async function getUserByEmailDb(email: string): Promise<User | null> {
    const dbConnetion = await pool.connect();
    try {
        const result = await dbConnetion.query(queries.getUserByEmail, [email]);
        return result.rows[0];
    } catch (error) {
        return null;
    } finally {
        dbConnetion.release();
    }
}

export async function updateUserDb(user: User): Promise<void | null> {
    const dbConnection = await pool.connect();
    try {
        await dbConnection.query(queries.updateUser, [
            user.userName,
            user.email,
            user.firstName,
            user.lastName,
            user.password,
            user.id.toString()
        ]);

    } catch (error) {
        console.log(error);
        return null;
    } finally {
        dbConnection.release();
    }
}

export async function deleteUserDb(id: number): Promise<void | null> {
    const dbConnection = await pool.connect();
    try {
        await dbConnection.query(queries.deleteUser, [id]);
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        dbConnection.release();
    }
}

