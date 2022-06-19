# Installation

1. Clone repository
2. Go to the `develop` branch
3. Run `npm i`

# Commands

1. `npm run start:dev` - run app in development mode
2. `npm run start:prod` - run app in production mode
3. `npm run start:multi` - run app with cluster API
4. `npm run test` - run tests

# Examples

1. Run server `npm run start:dev`
2. Run GET request with `http://localhost:5000/api/users`. Receive status 200 and empty array
3. Run POST request with `http://localhost:5000/api/users` and body
   `{ "username": "Denis", "age": 33, "hobbies": ["nodejs"] }`
   Receive status 201 and the user with the fields + id
4. Run PUT request with `http://localhost:5000/api/users/id` and body
   `{ "username": "Denis", "age": 35, "hobbies": ["js"] }`
   Receive status 200 and the user with updated fields + id
5. Run Delete request `http://localhost:5000/api/users/id`. Receive status 204