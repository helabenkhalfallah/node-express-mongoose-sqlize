# node-express-mongoose-sqlize
node, express, mongoose, sqlize

-------- Settings ------------

1. configure lint :
yarn add eslint
./node_modules/.bin/eslint --init

2. add a /server/server.js file
we start by configure a simple express server

3. configure dotenv :
yarn add dotenv
in index.js file and before any load :

```js
//dot env configuration
var dotenv = require('dotenv')
dotenv.load()

//launch server after loading env var
require('./server/server.js')
```
4. add cors, mongoose and bluebird
yarn add cors mongoose bluebird

5. add models folder which will contains all mongoose schema.
6. all models defined on models are exported on a single module inside index.js.
7. Define all constant inside .env file.
8. add babel to run ES6
```js
yarn add babel-cli
yarn add babel-preset-es2015
yarn add babel-preset-stage-0
```
9. add  .babelrc
```js
{
  "presets": ["es2015", "stage-0"]
}
```
10. modify package.json to run with babel
11. add express 
yarn add express
12. add nodemon so that it will automatically reload the app on everychange
```js
yarn add nodemon --dev
```
https://javierfernandes.gitbooks.io/rest-api-babel-express/content/nodeapp.html

13. mongo database preparation :
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
https://stackoverflow.com/questions/2518127/how-do-i-reload-bashrc-without-logging-out-and-back-in

14. install Robomongo
15. customize logger file
```js
yarn add morgan winston winston-daily-rotate-file
```
16. Test express default route - create a route file : AppRouter.js.
17. Test express default route - modify server.js :
```js
//routes
app.use('/users', AppRouter) 
app.use('/photos', AppRouter)

//route index
app.get('/', (req, res) => {
  res.send('Invalid endpoint!')
})
```

-------- End Settings ------------

18. add body-parser :
npm install body-parser

19. install sequelize
http://docs.sequelizejs.com/manual/installation/getting-started.html
yarn add sequelize
yarn add pg pg-hstore 
