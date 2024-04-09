import { User } from '../models/userModel.js';
import { pool } from '../db/initDb.js';
import { DatabaseError } from '../exceptions/DatabaseError.js';
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from '../constants/constant.js';

const queries = {
    createUser: `INSERT INTO app_user 
                 (display_name, email, first_name, last_name, password) 
                 VALUES ($1, $2, $3, $4, $5)`,

    getUserById: `SELECT * 
                  FROM app_user 
                  WHERE id = $1`,

    getAllUsers: `SELECT *
                  FROM app_user`,

    getUserByEmail: `SELECT * 
                     FROM app_user 
                     WHERE email = $1`,

    updateUser: `UPDATE app_user
                 SET display_name = $1, 
                     email = $2, 
                     first_name = $3, 
                     last_name = $4, 
                     password = $5 
                 WHERE id = $6`,

    deleteUser: `DELETE FROM app_user 
                 WHERE id = $1`,
};

export async function saveUserDb(user: User): Promise<void> {
    const dbConnetion = await pool.connect();
    try {
        await dbConnetion.query(queries.createUser,
            [user.displayName,
            user.email,
            user.firstName,
            user.lastName,
            user.password]);
    } catch (err) {
        throw new DatabaseError(
            err,
            APP_ERROR_MESSAGE.serverError);
    } finally {
        dbConnetion.release();
    }
}


export async function getUserByIdDb(id: number): Promise<User> {
    const dbConnetion = await pool.connect();
    try {
        const result = await dbConnetion.query(queries.getUserById, [id]);
        return result.rows[0];
    } catch (err) {
        throw new DatabaseError(
            err,
            APP_ERROR_MESSAGE.serverError);
    } finally {
        dbConnetion.release();
    }
}

export async function getAllUsersDb(): Promise<User[]> {
    const dbConnetion = await pool.connect();
    try {
        const result = await dbConnetion.query(queries.getAllUsers);
        return result.rows;
    } catch (err) {
        throw new DatabaseError(
            err,
            APP_ERROR_MESSAGE.serverError);
    } finally {
        dbConnetion.release();
    }
}


export async function getUserByEmailDb(email: string): Promise<User | null> {
    const dbConnetion = await pool.connect();
    try {
        const result = await dbConnetion.query(queries.getUserByEmail, [email]);
        return result.rows[0];
    } catch (err) {
        throw new DatabaseError(
            err,
            APP_ERROR_MESSAGE.serverError);
    } finally {
        dbConnetion.release();
    }
}

export async function updateUserDb(user: User): Promise<void> {
    const dbConnection = await pool.connect();
    try {
        await dbConnection.query(queries.updateUser, [
            user.displayName,
            user.email,
            user.firstName,
            user.lastName,
            user.password,
            user.id.toString()
        ]);

    } catch (err) {
        throw new DatabaseError(
            err,
            APP_ERROR_MESSAGE.serverError);
    } finally {
        dbConnection.release();
    }
}

export async function deleteUserDb(id: number): Promise<void | null> {
    const dbConnection = await pool.connect();
    try {
        await dbConnection.query(queries.deleteUser, [id]);
    } catch (err) {
        throw new DatabaseError(
            err,
            APP_ERROR_MESSAGE.serverError);
    } finally {
        dbConnection.release();
    }
}

