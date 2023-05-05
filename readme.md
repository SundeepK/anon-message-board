### Anon board

There exists some simple paths to GET,POST messages for the messages api and also replys to messages:

```
GET http://localhost:3000/api/messages
[
    {
        "title": "test message reply",
        "name": "bob",
        "body": "my first reply 2",
        "parentId": "0c214e3b-4456-4547-875f-9f1f609e3175",
        "rootId": "49be26c6-08c4-497b-887f-05bbd6d67297",
        "dateTime": "2023-05-05T17:18:41.138Z",
        "id": "23361a57-a45f-480a-857d-265e9aa16f47"
    }
]

POST http://localhost:3000/api/messages
{
    "title": "test message reply",
    "name": "bob",
    "body": "My message"
}

Response
{
    "title": "test message reply",
    "name": "bob",
    "body": "My message",
    "parentId": "0c214e3b-4456-4547-875f-9f1f609e3175",
    "rootId": "49be26c6-08c4-497b-887f-05bbd6d67297",
    "dateTime": "2023-05-05T17:18:41.138Z",
    "id": "23361a57-a45f-480a-857d-265e9aa16f47"
}

POST http://localhost:3000/api/messages/23361a57-a45f-480a-857d-265e9aa16f47/reply
{
    "title": "test message reply",
    "name": "bob",
    "body": "My first reply 2",
}

Response
{
    "title": "test message reply",
    "name": "bob",
    "body": "My first reply 2",
    "id": "49be26c6-08c4-497b-887f-05bbd6d67297",
    "parentId": "23361a57-a45f-480a-857d-265e9aa16f47",
    "rootId": "23361a57-a45f-480a-857d-265e9aa16f47",
}
```


## Building and running Docker container

## Building DockerFile
```bash
docker build -t anon-board .
```

### Running container
```bash
docker run -it --expose 3000 -p 3000:3000 anon-board
```

### 
Starting the api without using docker
```
npm run start
```

### Running cucumber tests using docker compose
You can run the cucumber tests shipped in the project by running the below command:
```bash
docker-compose up --build  --abort-on-container-exit --exit-code-from cucumber
```
It will attempt to build the api server and cucumber tests container, then it will run the cucumber tests that interact with the api server.
Then it will exit the tests and return the last status code of the cucumber container.

## Trade-offs
1. In order to complete the project in a timely manner, I opted to simply store messages in memory using a list rather than a DB.
This isn't ideal as the messages disappear once the server is shutdown.
2. No API docs for the project such as swagger.
3. More robust Cucumber tests.
4. DockerFiles are not optimised as they simply copy all files during building.
5. No pagination when requesting messages, this would be troublesome in a prod env.
6. No endpoint to fetch a single message/reply.
7. Better validation for types and length of fields.
8. No user system.
9. Api versioning.

