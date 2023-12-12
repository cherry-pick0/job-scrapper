# job-scrapper

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
