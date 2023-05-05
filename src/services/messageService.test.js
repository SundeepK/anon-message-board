const assert = require("assert");
const messageService = require("./messageService");

jest.mock('uuid', () => {
    const base = '9134e286-6f71-427a-bf00-';
    let current = 100000000000;
    return {
        v4: () => {
            const uuid = base + current.toString();
            current++;
            return uuid;
        }
    }
});

describe('message service', () => {

    beforeEach(() => {
        jest.resetModules();
        jest
            .useFakeTimers()
            .setSystemTime(new Date('2023-05-05T16:00:40.570Z'));
    });

    let res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }
    let next = jest.fn()

    let req = {
        body: {
            title: 10,
            name: 'John Doe',
            body: 'Hello first message',
        }
    }

    test('saves list messages', () => {
        const messageService = require("./messageService");
        messageService.saveMessage(req, res, next)
        messageService.listMessages(req, res, next)

        expect(res.json).toHaveBeenCalledWith([{
            title: 10,
            name: 'John Doe',
            body: 'Hello first message',
            id: '9134e286-6f71-427a-bf00-100000000000',
            rootId: '9134e286-6f71-427a-bf00-100000000000',
            dateTime: '2023-05-05T16:00:40.570Z'
        }])
    });

    test('saves new message', () => {
        const messageService = require("./messageService");
        messageService.saveMessage(req, res, next)
        let expectedMessage = {
            title: 10,
            name: 'John Doe',
            body: 'Hello first message',
            id: '9134e286-6f71-427a-bf00-100000000000',
            rootId: '9134e286-6f71-427a-bf00-100000000000',
            dateTime: '2023-05-05T16:00:40.570Z'
        };
        assert.deepStrictEqual([expectedMessage], messageService.getMessages());
        expect(res.json).toHaveBeenCalledWith([expectedMessage])
    });

    test('saves a new reply', () => {
        const messageService = require("./messageService");
        let m1 = {
            title: 'some title',
            name: 'John Doe',
            body: 'Hello first message',
        };
        messageService.saveMessage({
            body: m1
        }, res, next)
        let m2 = {
            title: 'some title',
            name: 'John Doe',
            body: 'reply 1',
        };
        messageService.saveMessageReply({
            body: m2,
            params: {messageId: '9134e286-6f71-427a-bf00-100000000000'}
        }, res, next)
        let m3 = {
            title: 'some title',
            name: 'John Doe',
            body: 'reply 2',
        };
        messageService.saveMessageReply({
            body: m3,
            params: {messageId: '9134e286-6f71-427a-bf00-100000000001'}
        }, res, next)

        let expectedMessages = [{
            id: '9134e286-6f71-427a-bf00-100000000000',
            rootId: '9134e286-6f71-427a-bf00-100000000000',
            dateTime: '2023-05-05T16:00:40.570Z',
            ...m1
        },
            {
                ...m2,
                id: '9134e286-6f71-427a-bf00-100000000001',
                rootId: '9134e286-6f71-427a-bf00-100000000000',
                parentId: '9134e286-6f71-427a-bf00-100000000000',
                dateTime: '2023-05-05T16:00:40.570Z'
            },
            {
                ...m3,
                id: '9134e286-6f71-427a-bf00-100000000002',
                rootId: '9134e286-6f71-427a-bf00-100000000000',
                parentId: '9134e286-6f71-427a-bf00-100000000001',
                dateTime: '2023-05-05T16:00:40.570Z'
            },
        ];
        assert.deepStrictEqual(expectedMessages, messageService.getMessages());
    });


});