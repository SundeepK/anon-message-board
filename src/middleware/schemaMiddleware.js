const Joi = require('joi');
const validate = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        console.log(error)
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const errors = details.map(i => ({
                message: i.message,
                path: i.path
            }));

            console.log("error", errors);
            res.status(422).json({ errors: errors }) }
    }
}

module.exports = validate