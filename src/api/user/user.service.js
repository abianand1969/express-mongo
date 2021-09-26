import Joi from 'joi';
import bcypt from 'bcryptjs'
export default {

    encryptPassword(txtPassword) {
        const salt = bcypt.genSaltSync(10);
        return bcypt.hashSync(txtPassword, salt)
    },

    comparePassword(txtPassword, encryptedPassword) {
        return bcypt.compareSync(txtPassword, encryptedPassword)
    },

    validateLogin(body) {
        const schema = Joi.object().keys({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string().required()
        });
        const { value, error } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },

    validateSignup(body) {
        const schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        const { value, error } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    }
};