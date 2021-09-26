import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.model';
import userService from './user.service';
import { devConfig } from '../../config/development';

export default {
    async signup(req, res) {
        try {
            const { value, error } = userService.validateSignup(req.body);
            if (error) {
                res.setHeader("Access-Control-Allow-Origin", "*")
                return res.status(400).send(error);
            }
            const user = new User();
            user.firstName = value.firstName;
            user.lastName = value.lastName;
            user.email = value.email;

            const salt = bcrypt.genSaltSync(10);
            const hash = await bcrypt.hash(value.password, salt);
            user.password = hash;
            await user.save();
            res.setHeader("Access-Control-Allow-Origin", "*")
            return res.json({ success: true, message: 'Signup Successful' });
        } catch (err) {
            console.error(err);
            res.setHeader("Access-Control-Allow-Origin", "*")
            return res.status(500).send(err);
        }
    },
    async login(req, res) {
        try {
            const { error, value } = userService.validateLogin(req.body);
            if (error) {
                res.setHeader("Access-Control-Allow-Origin", "*")
                return res.status(400).send(error);
            }
            const user = await User.findOne({ 'email': value.email });
            if (!user) {
                res.setHeader("Access-Control-Allow-Origin", "*")
                return res.status(401).json({ err: 'Unauthorized' });
            }
            const matched = bcrypt.compareSync(value.password, user.password);
            if (!matched) {
                res.setHeader("Access-Control-Allow-Origin", "*")
                return res.status(400).json({ err: 'Bad credentials' });
            }
            const token = jwt.sign({ id: user._id }, '1d')
            const userDetails = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
            res.setHeader("Access-Control-Allow-Origin", "*")
            return res.json({ success: true, token, userDetails });
        } catch (err) {
            console.error(err);
            res.setHeader("Access-Control-Allow-Origin", "*")
            return res.status(500).send(err);
        }
    },
    async getUsers(req, res) {
        try {

            const users = await User.find({});
            if (!users) {
                res.setHeader("Access-Control-Allow-Origin", "*")
                return res.status(401).json({ err: 'Unauthorized' });
            } else {
                res.setHeader("Access-Control-Allow-Origin", "*")
                return res.json({ message: 'Users read success', users })
            }

        } catch (err) {
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.status(500).send({ error: err })
        }
    },
    async getUser(req, res) {
        try {
            const user = await User.findOne({ 'email': req.body.email });;
            if (!user) {
                res.setHeader("Access-Control-Allow-Origin", "*")
                return res.status(200).json({ err: 'Data Not Found' });
            } else {
                res.setHeader("Access-Control-Allow-Origin", "*")
                return res.json({ message: 'Users read success', user })
            }
        } catch (err) {
            return res.status(500).send({ error: err })
        }
    },
    async getUserById(req, res) {
        // console.log(req.params.id)
        try {
            // const { _id } = req.params.id
            const user = await User.findById({ _id: req.params.id });
            if (!user) {
                res.setHeader("Access-Control-Allow-Origin", "*")
                return res.status(200).json({ err: 'Data Not Found' });
            } else {
                res.setHeader("Access-Control-Allow-Origin", "*")
                return res.json({ message: 'Users read success', user })
            }
        } catch (err) {
            return res.status(500).send({ error: err })
        }
    }

};