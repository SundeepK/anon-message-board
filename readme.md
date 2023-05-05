### Anon board

## Building and running Docker container

## Building DockerFile
```bash
docker build -t anon-board .
```

### Running container
```bash
docker run -it --expose 3000 -p 3000:3000 anon-board
```

### Running cucumber tests using docker compose
You can run the cucumber tests shipped in the project by running the below command:
```bash
docker-compose up --build  --abort-on-container-exit --exit-code-from cucumber
```
It will attempt to build the api server and cucumber tests container, then it will run the cucumber tests that interact with the api server.
Then it it will exit the tests and return the last status code of the cucumber container.
