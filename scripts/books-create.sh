#!/bin/sh

curl --include --request POST http://localhost:3000/books \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "book": {
      "title": "Herp Derp",
      "author": "Dirka Dirk",
      "price": 12.99
    }
  }'

  curl --include --request POST http://localhost:3000/books \
    --header "Authorization: Token token=$TOKEN" \
    --header "Content-Type: application/json" \
    --data '{
      "book": {
        "title": "Warbl Garbl",
        "author": "Floaty McBoatface",
        "price": 10.99
      }
    }'
