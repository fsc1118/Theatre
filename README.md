# Developing and Deploying Theatre Frontend

## Starting Development

- Make sure `package.json` has `http:localhost:8000` as its `proxy` during development.
- Make sure `src/config/global.js` has `http:localhost:8000/` (MUST remember final slash) as its `SERVER_IP`.

## Starting Deployment

- Make sure `package.json` has `https://cs348-theatre.herokuapp.com` as its `proxy`.
- Make sure `src/config/global.js` has `https://cs348-theatre.herokuapp.com/` (MUST remember final slash) as its `SERVER_IP`.
- Follow the steps listed under **Available Scripts** beside `npm run build`.

## Available Scripts

In the project directory, you can run:
- `npm start`: To run the app in development mode. Opens at port localhost:3000.
- `npm test`: To launch the test runner.
- `npm run build`: To build the app for production in the `build` folder. After building, drag the **build** folder outside Theatre into the TheatreBackend **src/main/resources/static** folder. Drag contents of **build** outside into the static folder and delete the empty **build** folder.

## Deploying on Heroku

- After following the steps listed beside `npm run build`, push the new contents of TheatreBackend repo (make sure to be on master branch) to the TheatreBackend GitHub repository and go to the Heroku website to deploy there.  

