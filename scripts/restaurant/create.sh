#!/bin/bash

API="http://localhost:4741"
URL_PATH="/restaurants"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=NeG1J8soQSkNj2skINJISWy4mTPskrWrjZxq0rlYX6I=--EW+fIFq2fTx4bzHw9QIrHJ9b/CoHZi/dqaRBW0cYchw=" \
  --data '{
    "restaurant": {
      "name": "'"${NAME}"'",
      "location": "'"${LOCATION}"'",
      "type": "'"${TYPE}"'"
    }
  }'

echo
