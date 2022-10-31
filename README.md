# CLASS
The class framework. Once built you can access your server at http://127.0.0.1:8080
If you desire a different port, change the .env file

## Build and start
```
docker-compose build --no-cache
docker-compose up
```

## To see your credentials
Replace "username" with the user you supplied in setup.php inside DockerFiles.
For security purposes, delete this file after credential extraction.

By default there is a "dev" account with a randomly generated password that you can see with the command below.

```
docker-compose exec php cat /tmp/creds-username
```

## Delete the container
```
docker-compose rm
```
