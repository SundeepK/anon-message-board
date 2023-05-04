// message.js
const Joi = require('joi')
const schema = {
    messagePOST: Joi.object().keys({
        name: Joi.string().required(),
        title: Joi.string().required(),
        body: Joi.string().required()
    })
};

module.exports = schema;
