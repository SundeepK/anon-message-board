const validate = require('./schemaMiddleware')

describe('message schema', () => {
    let res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }
    let next = jest.fn()

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('validates title field as string', () => {
        let req = {
            body: {}
        }
        let schema = {
            validate: jest.fn().mockReturnValue(() => {
            })
        }

        let middlewareFunc = validate(schema);

        middlewareFunc(req, res, next)

        expect(next).toHaveBeenCalledTimes(1);
    });

    test('validates calls validate with body', () => {
        let req = {
            body: {
                title: 10,
                name: 'John Doe',
                body: 'Hello first message'
            }
        }
        let schema = {
            validate: jest.fn().mockReturnValue({})
        }

        let middlewareFunc = validate(schema);

        middlewareFunc(req, res, next)

        expect(next).toHaveBeenCalledTimes(1);
        expect(schema.validate).toHaveBeenCalledWith(req.body, {abortEarly: false})
    });

    test('sends 422 on error', () => {
        let req = {
            body: {}
        }
        let schema = {
            validate: jest.fn().mockReturnValue({error: {details: [{message: 'some error', path: 'title'}]}})
        }

        let middlewareFunc = validate(schema);

        middlewareFunc(req, res, next)

        expect(next).toHaveBeenCalledTimes(0);
        expect(res.status).toHaveBeenCalledWith(422)
        expect(res.json).toHaveBeenCalledWith({
            errors: [{
                message: 'some error',
                path: 'title'
            }]
        })
    });
});
