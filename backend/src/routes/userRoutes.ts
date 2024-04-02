import express from 'express';
import { getUserById, createUser, updateUserById, deleteUser } from '../controllers/userController.js';

export const router = express.Router();

router.get('/:userId', getUserById);
router.post('/', createUser);
router.put('/:userId', updateUserById);
router.delete('/:userId', deleteUser);

