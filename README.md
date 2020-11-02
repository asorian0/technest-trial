# technest-trial

## Preconditions
Make sure your machine has installed the following:
- [MongoDB](https://www.mongodb.com/try/download/community) (or a reachable machine with MongoDB server)
- [Node.js](https://nodejs.org/en/download/)

NOTE: This app was developed under MongoDB Community v4.4 (latest) and Node.js v14.15.0 (latest) 

## Install 
Run `npm i` from root folder

## Seeding
Run `npm run backend:seed` from root folder.
NOTE: this script assumes you have a mongodb service installed in the same machine
you're running it, as well as having standard user access (default from standard installation).

## Run backend
Run `npm run backend:deploy` from root folder in a new terminal instance

## Run frontend
Run `npm run frontend:deploy` from root folder in a new terminal instance

## Use webapp
After running frontend, webapp will be reachable at [http://localhost:4200](http://localhost:4200)