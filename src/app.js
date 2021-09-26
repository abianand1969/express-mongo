import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';

// import { userRouter } from './api/user/user.router'
import { restRouter } from './api';

const app = express();
const PORT = process.env.port || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://brainbeam:micron123@tainingcluster.wxbiw.mongodb.net/spantech').then(
    () => {
        console.log("MongoDB Connected")
    }
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use('/users', userRouter);

app.use('/api', restRouter);

app.get('/', function(req, res) {
    res.json({ msg: 'Home route' });
});
app.listen(PORT, () => {
    console.log(`Server Started and running at Port:${PORT}`);
});

//install the following to transpile es6 code es5
// npm i @babel/cli @babel/core @babel/node @babel/preset-env --save-dev