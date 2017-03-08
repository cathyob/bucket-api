#!/bin/bash

API="http://localhost:4741"
URL_PATH="/restaurants"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=zDVv8n7L+vpMhzXLNm1KPp7YLQjKK+A2U+0cDzJtN0Y=--FFEtEi3WJw/Zn1Af8INAG4/wLUVeAFQDG0Iz43FbPwc=" \
  --data '{
    "restaurant": {
      "name": "'"${NAME}"'",
      "location": "'"${LOCATION}"'",
      "type": "'"${TYPE}"'"
    }
  }'

echo
