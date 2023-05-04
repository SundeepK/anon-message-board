const validate = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body, {abortEarly: false});
        if (error == null) {
            next();
        } else {
            const {details} = error;
            const errors = details.map(i => ({
                message: i.message,
                path: i.path
            }));
            console.log(`Received ${JSON.stringify(req.body)} bad request body with errors ${JSON.stringify(errors)}`);
            res.status(422).json({errors: errors})
        }
    }
}

module.exports = validate