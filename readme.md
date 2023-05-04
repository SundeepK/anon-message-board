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