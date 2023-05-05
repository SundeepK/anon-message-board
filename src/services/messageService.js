const { v4: uuidv4 } = require('uuid');

const internalMessages = []

const addDefaultsFields = (message) => {
    message["dateTime"] = new Date().toISOString()
    message["id"] = uuidv4();
    console.log(`New message being added ${JSON.stringify(message)}`)
    return message;
}

const _save = (message) => {
    message = addDefaultsFields(message);
    if (message["rootId"] === undefined) {
        message["rootId"] = message["id"];
    }
    internalMessages.push(message);
    return message;
}

const saveMessage = (req, res, next) => {
    let message = req.body;
    res.json(_save(message));
};

const saveMessageReply = (req, res, next) => {
    let message = req.body;
    let parentId = req.params.messageId;
    let parentMessage = internalMessages.filter(msg => msg.id === parentId);
    if (parentMessage.length > 0) {
        message["parentId"] = parentMessage[0].id;
        message["rootId"] = parentMessage[0].rootId;
        console.log(`Found reply message to save ${JSON.stringify(message)}`)
    } else {
        res.status(404).json({errors: [{message: "Unknown messageId for reply."}]})
    }
    res.json(_save(message));
}

const listMessages = (req, res) => {
    res.json(internalMessages);
};

const getMessages = () => {
    return internalMessages.slice();
};

module.exports = {
    saveMessage,
    listMessages,
    saveMessageReply,
    getMessages
}