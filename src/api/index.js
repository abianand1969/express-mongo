const express = require('express')

import { userRouter } from './user/user.router'

export const restRouter = express.Router();

restRouter.use('/users', userRouter)