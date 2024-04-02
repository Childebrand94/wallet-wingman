import { Request, Response } from 'express';
import { User } from '../models/userModel.js';
import * as db from '../db/userDb.js';

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    res.status(200).json({ message: `Here is user ${userId}` });
};

export const createUser = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const user: User = req.body;
        const savedUser = await db.saveUserDb(user);

        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

export const updateUserById = async (req: Request, res: Response) => {
    res.status(200).json({ message: `User updated here is your ${req}` });
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    res.status(200).json({ message: `User ${userId} deleted` });
};

