#!/bin/sh

API="http://localhost:4741"
URL_PATH="/restaurants"

curl "${API}${URL_PATH}" \
 --include \
 --request GET \
 --header "Authorization: Token token=NeG1J8soQSkNj2skINJISWy4mTPskrWrjZxq0rlYX6I=--EW+fIFq2fTx4bzHw9QIrHJ9b/CoHZi/dqaRBW0cYchw="

echo
