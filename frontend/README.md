# Chat Frontend

This application provides a UI for interacting with the `api`. Users can login and create messages pertaining to a conversation.

**Note**: this application is under active development and not all features are fully implemented.

**Currently**: A user can login with one of the seeded users (ie: username: `rosemaryh`, password: `password`) and send messages via a hardcoded conversation. 



## Getting started


### Install and running via Docker

1. first build the image, replacing `<image-name>` with an image tag of your choosing

```sh
docker build -t <image-name> .
```

2. run a docker container to server the React application and expose port 3000

```sh
docker run -p 3000:3000 <image-name>
```

3. navigate to `http://localhost:3000/messages` 
  a. this will prompt you to login. Use seeded api seeded data to login with a user that currently exists
    - username: `rosemaryh`
    - password: `password`
  b. this will virtually redirect you to messages where you can start creating new messages 



