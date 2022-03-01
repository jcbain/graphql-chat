# Chat Server API

This library is the API for the chat server. Currently, there are three resources that this API serves:

1. users
2. conversations
3. messages

This api allows clients to perform CRUD operations on all of these resources.

Each resource has the following attributes:

`users`:
  - `_id`: unique identifier
  - `username`
  - `email`
  - `password`: passwords are hashed prior to be stored in the database

`conversations`: a conceptual way to group like messages between users
  - `_id`: unique identifier
  - `topic`
  - `messages`: messages associated with this conversation

- `messages`: 
  - `_id`: unique identifier
  - `body`: the message text
  - `sender`: user who created the message
  - `receiver`: user who receives the message


## Getting started


### Install and running via Docker

1. first build the image, replacing `<image-name>` with an image tag of your choosing

```sh
docker build -t <image-name> .
```

2. ensure you have a `.env` and login credentials for mongoDb ensuring that you appropriately copy the environment variables from the `./env.example` file with your appropriate credentials.

3. run a docker container to start the graphql server and expose port 8090 and specify your `.env` file

```sh
docker run --env-file .env -p 8090:8090 <image-name>
```

4. Seed the database by opening a shell into the running container and running the seed script replacing `<container-id>` with the running container's id.

```sh
docker exec -it <container-id> /bin/sh

# once in container
yarn seed
```

This will seed your database with some users which you can then use to login, as well as some conversations with some seeded messages.


