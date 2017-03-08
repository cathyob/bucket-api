#!/bin/sh

API="http://localhost:4741"
URL_PATH="/restaurants"

curl "${API}${URL_PATH}" \
 --include \
 --request GET \
 --header "Authorization: Token token=zDVv8n7L+vpMhzXLNm1KPp7YLQjKK+A2U+0cDzJtN0Y=--FFEtEi3WJw/Zn1Af8INAG4/wLUVeAFQDG0Iz43FbPwc="

echo
