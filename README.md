# FEEDbucket
DEPLOYED FRONT END: https://cathyob.github.io/bucket-browser/


FRONT END REPO: https://github.com/cathyob/bucket-browser


HEROKU: https://feedbucketcathyob.herokuapp.com


Created by @cathyob, @dsweetser, and @newayliu1 for General Assembly Boston Web Development Immersive cohort 016!

## ABOUT
Thank you for visiting our front end repo! This app was built as part of the course's team project.

We were assigned to a team and given a prompt. Ours was to create a bucket list for people to be able to save, see, edit, and delete items from their list utlizing a location based 3rd party API.

After getting to know each other we decided to theme our project around a mutual interest - FOOD! Throughout this course we noticed that our class would constantly talk to each other about cool restaurants people should try, for lunch together or otherwise.

We designed this app with the prompt and our interpretation in mind. A user needs to sign up/in, then they can use the form to fill in information to save restaurants to their bucket list. They can confirm a restaurant exists by searching for it and clicking on its pin. If they do this they can click 'Get from Map' to pre-fill the restaurant's name and address in the form.

### API Structure
The MongoDB database has two tables: users and restaurants.  The users table covers authentication and provides user ID for ownership of individual users' wish lists.  The restaurants table takes a name, address, type, and notes fields.  All newly created restaurants have an "achieved" field that defaults to "false", but can be updated to "true" when the restaurant is visited.

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/:id` | `users#changepw`  |
| DELETE | `/sign-out/:id`        | `users#signout`   |

#### POST /sign-up

Request:

```sh
curl --include --request POST https://feedbucketcathyob.herokuapp.com/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  }'
```

```sh
scripts/sign-up.sh
```

Response:

```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email"
  }
}
```

#### POST /sign-in

Request:

```sh
curl --include --request POST https://feedbucketcathyob.herokuapp.com/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password"
    }
  }'
```

```sh
scripts/sign-in.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email",
    "token": "33ad6372f795694b333ec5f329ebeaaa"
  }
}
```

#### PATCH /change-password/:id

Request:

```sh
curl --include --request PATCH https://feedbucketcathyob.herokuapp.com/change-password/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "an example password",
      "new": "super sekrit"
    }
  }'
```

```sh
ID=1 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/change-password.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

#### DELETE /sign-out/:id

Request:

```sh
curl --include --request DELETE https://feedbucketcathyob.herokuapp.com/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=1 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/sign-out.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

### Users

| Verb | URI Pattern | Controller#Action |
|------|-------------|-------------------|
| GET  | `/users`    | `users#index`     |
| GET  | `/users/1`  | `users#show`      |

#### GET /users

Request:

```sh
curl --include --request GET https://feedbucketcathyob.herokuapp.com/users \
  --header "Authorization: Token token=$TOKEN"
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/users.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "users": [
    {
      "id": 2,
      "email": "another@example.email"
    },
    {
      "id": 1,
      "email": "an@example.email"
    }
  ]
}
```

#### GET /users/:id

Request:

```sh
curl --include --request GET https://feedbucketcathyob.herokuapp.com/users/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=2 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/user.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 2,
    "email": "another@example.email"
  }
}
```

### Restaurants

| Verb   | URI Pattern            | Controller#Action     |
|--------|------------------------|-----------------------|
|  GET   | `/restaurants`         | `restaurants#index`   |
| POST   | `/restaurants`         | `restaurants#create`  |
| PATCH  | `/restaurants/:id`     | `restaurants#update`  |
| DELETE | `/restaurants/:id`     | `restaurants#destroy` |

### GET /restaurants
Returns a list of all the restaurants a user has listed on their wishlist.

```sh
curl "https://feedbucketcathyob.herokuapp.com/" --include  --request GET --header "Authorization: Token token=$TOKEN"
```

Response
```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"restaurants":
  [
    {
    "_id":"58c4a7eaceed0f663e24bf3b",
    "updatedAt":"2017-03-12T01:44:10.336Z",
    "createdAt":"2017-03-12T01:44:10.336Z",
    "name":"HungryFood",
    "location":"TOO FAR",
    "type":"yummy",
    "_owner":"58bf56553a358d222a333042"
    ,"__v":0,
    "achieved":false,
    "id":"58c4a7eaceed0f663e24bf3b",
    "editable":true
    },
    {
    "_id":"58c4a7eaceed0f663e24af3a",
    "updatedAt":"2017-03-12T01:44:11.336Z",
    "createdAt":"2017-03-12T01:44:11.336Z",
    "name":"IceCream 4 U",
    "location":"In my belly already",
    "type":"Ice Cream!",
    "_owner":"58bf56553a358d222a333042"
    ,"__v":0,
    "achieved":true,
    "id":"58c4a7eaceed0f663e24bf3b",
    "editable":true
    }
  ]
}
```

### POST /restaurants
Adds a new restaurant to the DB for the user's wishlist.

```sh
curl "https://feedbucketcathyob.herokuapp.com/restaurants" --include --request POST --header "Authorization: Token token=$TOKEN"   --data '{"restaurant": {"name": "'"${NAME}"'","location": "'"${LOCATION}"'","type": "'"${TYPE}"'","notes":"'"${NOTES}"'"}}'
```

Response
```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{"restaurant":{
  "__v":0,
  "updatedAt":"2017-03-12T01:44:10.336Z",
  "createdAt":"2017-03-12T01:44:10.336Z",
  "name":"HungryFood",
  "location":"TOO FAR",
  "type":"yummy",
  "_owner":"58bf56553a358d222a333042",
  "_id":"58c4a7eaceed0f663e24bf3b",
  "achieved":false,
  "id":"58c4a7eaceed0f663e24bf3b",
  "editable":true
  }
}
```

### PATCH /restaurants
Updates a restaurant.  Normally just used to change the status of "achieved" to "true".

```sh
curl "https://feedbucketcathyob.herokuapp.com/restaurants/:$ID" --include --request POST --header "Authorization: Token token=$TOKEN"   --data '{"restaurant": {"name": "'"${NAME}"'","location": "'"${LOCATION}"'","type": "'"${TYPE}"'", "achieved": "'"${ACHIEVED}"'"}}'
```

Response
```md
HTTP/1.1 204 No Content
```

### DELETE /restaurants
Removes a restaurant from the user's wish list.

```sh
curl "https://feedbucketcathyob.herokuapp.com/restaurants/:$ID" --include --request DELETE --header "Authorization: Token token=${TOKEN}"
```

Response
```
HTTP/1.1 204 No Content
```
