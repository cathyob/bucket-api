## FoodBucket API

This is the documention for the API of FoodBucket, an app that helps you track restaurants you'd like to go to.  The app has been built collaboratively by @cathyob, @dsweetser, and @newayliu1 using Express, Mongoose, and Mongo DB on the backend.  If you have any questions, comments, concerns, or job offers for us feel free to reach out to us!

The deployed front end app can be found here: https://squad-sol.github.io/bucket-browser/
The deployed backend app can be found here:  https://fast-atoll-26007.herokuapp.com/
The repo for the front end can be found here: https://github.com/Squad-SOL/bucket-browser

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
curl --include --request POST https://fast-atoll-26007.herokuapp.com/sign-up \
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
curl --include --request POST https://fast-atoll-26007.herokuapp.com/sign-in \
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
curl --include --request PATCH https://fast-atoll-26007.herokuapp.com/change-password/$ID \
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
curl --include --request DELETE https://fast-atoll-26007.herokuapp.com/sign-out/$ID \
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
curl --include --request GET https://fast-atoll-26007.herokuapp.com/users \
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
curl --include --request GET https://fast-atoll-26007.herokuapp.com/users/$ID \
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
curl "https://fast-atoll-26007.herokuapp.com/" --include  --request GET --header "Authorization: Token token=$TOKEN"
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
curl "https://fast-atoll-26007.herokuapp.com/restaurants" --include --request POST --header "Authorization: Token token=$TOKEN"   --data '{"restaurant": {"name": "'"${NAME}"'","location": "'"${LOCATION}"'","type": "'"${TYPE}"'","notes":"'"${NOTES}"'"}}'
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
curl "https://fast-atoll-26007.herokuapp.com/restaurants/:$ID" --include --request POST --header "Authorization: Token token=$TOKEN"   --data '{"restaurant": {"name": "'"${NAME}"'","location": "'"${LOCATION}"'","type": "'"${TYPE}"'", "achieved": "'"${ACHIEVED}"'"}}'
```

Response
```md
HTTP/1.1 204 No Content
```

### DELETE /restaurants
Removes a restaurant from the user's wish list.

```sh
curl "https://fast-atoll-26007.herokuapp.com/restaurants/:$ID" --include --request DELETE --header "Authorization: Token token=${TOKEN}"
```

Response
```
HTTP/1.1 204 No Content
```
