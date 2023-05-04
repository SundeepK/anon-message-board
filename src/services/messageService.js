
const messages = []
const save = (message) => {
    messages.push(message);
};

const list = () => {
    return messages.slice();
};

module.exports = {
    save,
    list
}