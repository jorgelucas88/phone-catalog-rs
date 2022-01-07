# MRRC 1.0
Welcome to the Martian Robots Route Calculation repo microservice

## Description
This microservice calculates routes of robots on the surface of mars.
The robots move along a squared map, rotating and moving vertically or horizontally.
The lower-left coordinates are the 0, 0 position, and the top-right position is the last available square. The squares starts from 0 to max-size (x and y);
Given an input file, if a robot crosses some of the map bounderies, it gets lost. After that, if a robot tries to cross the same boundary, the previous one leaves a "scent", preventing the next one to loses itself crossing the same point.

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
This microservice can be run in two ways:
1. APIs: 
- POST /processRobotsMap - Upload the robots map file and get the calculation results
- GET /getAllRobotMapRun - retrieve the calculations paginated (ex: /getAllRobotMapRun?page=3&pageSize=15 - default is 0 and 15)
2. Command line:
- npm run robots-cli-file test/files/test1_input.txt

## Heroku deployment
- POST /processRobotsMap: https://martian-robots-rs.herokuapp.com/robots/processRobotsMap
- GET /getAllRobotMapRun: https://martian-robots-rs.herokuapp.com/robots/getAllRobotMapRun?page=1&pageSize=3

## Postman collection
https://drive.google.com/drive/folders/1bRyZ_HwDfwG3DO67l_6c46Ryp_KxHaWB

## Coverage
Coverage status given by Istambul (JS Test coverage tool): https://drive.google.com/drive/folders/1sQtSSsBNy0PkuMVisJzt8mB0mcHG7H4D


## File samples
File samples can be found here: https://github.com/jorgelucas88/martian-robots-rs/tree/dev/test/files


Example of input:\
5 3\
1 1 E\
RFRFRFRF\
3 2 N\
FRRFLLFFRRFLL\
0 3 W\
LLFFFRFLFL

Example of output:\
1 1 E\
3 3 N LOST\
4 2 N


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

