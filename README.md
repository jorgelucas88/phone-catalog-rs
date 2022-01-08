# Phone catalog 1.0
Welcome to the repo of phone catalog 1.0

## Description
This catalog allows CRUD operations of smartphones (including a photo).

## Node version
Node v14

## NestJS
NestJS v8.2.3

## Instalacion
- set to node 14
- clone repo branch dev
- npm install

To run
- Using docker: docker-compose up dev
- Running locally: npm run start

## Usage
1. APIs: 
- GET /phones - get all phones (optional params: page and pageSize; default is 0 and 15)
- POST /phones - create a phone entry
- DELETE /phones/:id - soft delete a phone by id (fill the column deletedAt)
- PATCH /phones - patch a phone
- DELETE /phones/image/:id - hard delete a image from a phone

## Heroku deployment


## Running the microservice:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

