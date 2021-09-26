import express from 'express';
import userController from './user.controller';
export const userRouter = express.Router();

userRouter.route('/')
    .get(userController.getUsers)
    .post(userController.signup)

userRouter.route('/login')
    .post(userController.login);

// userRouter.post('/signup', userController.signup);
// userRouter.post('/login', userController.login);
userRouter.route('/:id')
    .get(userController.getUserById)

userRouter.route('/byemail')
    .post(userController.getUser)