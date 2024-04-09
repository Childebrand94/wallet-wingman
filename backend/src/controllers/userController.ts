import { NextFunction, Request, Response } from 'express';
import { User } from '../models/userModel.js';
import * as db from '../db/userDb.js';


export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction) => {

    const { param } = req.params
    console.log(param)
    if (param?.includes('@')) {
        getUserByEmail(req, res, next)
    } else {
        getUserById(req, res, next)
    }
}

export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction) => {

    const userId = req.params.param;
    const userIdInt = parseInt(userId!)
    try {
        const user = await db.getUserByIdDb(userIdInt);
        if (!user) {
            res.status(404).json({ message: `User with ID: ${userId} was not found` })
        }
        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction) => {

    try {
        const users = await db.getAllUsersDb();
        res.status(200).json(users);
    } catch (error) {
        return next(error);
    }
};

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction) => {

    try {
        const user: User = req.body;
        await db.saveUserDb(user);
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        return next(error);
    }
};
export const getUserByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction) => {

    const userEmail = req.params.param!

    try {
        const user = await db.getUserByEmailDb(userEmail)
        if (!user) {
            res.status(404).json({ message: `User with email: ${userEmail} was not found` })
        }
        res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};

export const updateUserById = async (
    req: Request,
    res: Response,
    next: NextFunction) => {

    const payload = req.body.param!

    try {
        const user = await db.updateUserDb(payload)
        res.status(200).json(user)
    } catch (err) {
        return next(err)

    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.param;
    const userIdParsed = parseInt(userId!)

    try {
        const user = await db.deleteUserDb(userIdParsed)

        res.status(200).json({ message: "User successfully deleted." })
    } catch (err) {

    }
};

