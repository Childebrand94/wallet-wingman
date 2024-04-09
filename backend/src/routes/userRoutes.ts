import express from 'express';
import { getUserById, createUser, updateUserById, deleteUser } from '../controllers/userController.js';
import { validate } from '../middleWare/validations.js'
import { userBody, userParams } from '../middleWare/schemas.js'

export const router = express.Router();

router.get('/:userId', validate(userParams, 'params'), getUserById);

router.post('/', validate(userBody, 'body'), createUser);

router.put(
    '/:userId',
    validate(userBody, 'body'),
    validate(userParams, 'params'),
    updateUserById);

router.delete('/:userId', validate(userBody, 'params'), deleteUser);

