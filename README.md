# Job Scrapper

Node.js application that scrapes job listings from various websites and provides a RESTful API to access this data.

Instructions are written for

- Ubuntu 20.04.
- Node v20.10.0
- yarn 1.22.19

## Prerequisites

- MongoDB

## Setup database

- [Install mongodb locally](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition)

- Make sure MongoDB is running

  ```
  sudo systemctl status mongodb
  ```

- Access mongo database in terminal

  ```
  mongo
  ```

- Create database

  _Example-> Database: jobScrapperDb_

  ```
  use jobScrapperDb
  ```

- Create user

  _Example-> Username: user, Password: password, Database: jobScrapperDb_

  ```
  db.createUser({
  user: "user",
  pwd: "password",
  roles: [{ role: "readWrite", db: "jobScrapperDb" }]
  })
  ```

- Configure .env file

  ```
  MONGODB_URI = 'mongodb://localhost:27017/jobScrapperDb'
  MONGODB_USERNAME = 'user'
  MONGODB_PASSWORD = 'password'
  ```

## Start project

```
yarn install
yarn dev
```

## Examples

- Scrape jobs from LinkedIn

  ```
  curl --request POST \
    --url 'http://localhost:3000/api/jobs/scrape/linkedin' \
    --header 'content-type: application/json' \
    --data '{"location": "Ireland",
  "seniority_level": "Mid/Senior",
  "position": "Python Developer",
  "remote": true
  }'
  ```

- Get search request info

  ```
  curl --request GET \
    --url http://localhost:3000/api/jobs/search-requests \
    --header 'content-type: application/json'
  ```

- Get LinkedIn jobs

  ```
  curl --request GET \
    --url http://localhost:3000/api/jobs/linkedin-jobs \
    --header 'content-type: application/json'
  ```

  ```
  curl --request GET \
  --url http://localhost:3000/api/jobs/linkedin-jobs/{id} \
  --header 'content-type: application/json'
  ```
