const schema = require('./message');


describe('message schema', () => {
    test('accepts valid message body', () => {
        const {error} = schema.messagePOST.validate({
                title: 'test message',
                name: 'John Doe',
                body: 'Hello first message'
            },
            {abortEarly: false});
        expect(error).toBe(undefined);
    });

    test('validates title field as string', () => {
        const {error} = schema.messagePOST.validate({
                title: 10,
                name: 'John Doe',
                body: 'Hello first message'
            },
            {abortEarly: false});
        expect(error).not.toBe(undefined);
        expect(error.details[0].message).toBe('"title" must be a string')
    });
});

describe('validates missing field', () => {
    test.each([
        ["title", '"title" is required'],
        ["name", '"name" is required'],
        ["body", '"body" is required'],
    ])("when field '%s' is missing", (key, expectedMessage) => {
        let message = {
            title: "My first message",
            name: 'John Doe',
            body: 'Hello first message'
        };
        delete message[key]
        const {error} = schema.messagePOST.validate(message,
            {abortEarly: false});
        expect(error).not.toBe(undefined);
        expect(error.details[0].message).toBe(expectedMessage)
    })
});

describe('validates field types', () => {
    test.each([
        ["title",10,  '"title" must be a string'],
        ["name", 20, '"name" must be a string'],
        ["body", {}, '"body" must be a string'],
    ])("when field '%s' is missing", (key, value, expectedMessage) => {
        let message = {
            title: "My first message",
            name: 'John Doe',
            body: 'Hello first message'
        };
        message[key] = value
        const {error} = schema.messagePOST.validate(message,
            {abortEarly: false});
        expect(error).not.toBe(undefined);
        expect(error.details[0].message).toBe(expectedMessage)
    })
});


