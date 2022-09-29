# baseNodeApiTs

+ always use camelCase
+ ES6, ES7+ Javascript standards
+ all code must be in english! just path of routes and another stuff in spanish (you will recieve instructions)
+ remember to use arrow function into all part of aplicacions
+ remenber to use async/await
+ the name of the function must be descriptive

You can run API with those commands

```
"start-dev": "ts-node-dev src/index.ts",
"start-test": "cross-env NODE_ENV=test ts-node src/index.ts",
"start": "cross-env NODE_ENV=production node build/index.js",
"linter": "ts-standard",
"linter-fix": "ts-standard --fix",
"tsc": "tsc",
"test": "jest --watchAll",
"test-coverage": "jest --watchAll --coverage"
```

### Information Important

1. [Project structure](#projectstructure)
2. [Enviroments](#enviroments)
3. [Installation](#installation)
3. [Routes](#routes)
4. [Controllers](#controllers)
5. [Services](#services)
6. [Middleware](#middleware)
7. [Utils](#utils)
8. [Test](#test)


## Project Structure
<a name="projectstructure"/>

The structure of this project defined by folders with specific purpose

```
.
├── ...
│      ├── src
│         ├── app.ts            # api server configurations with express
│         ├── index.ts          # start api
│           ├── config          # headers, config load .env files for dev, staging and production config
│           ├── controllers     # controllers
│           ├── routes          # routes
│           ├── middlewares     # middlewares
│           ├── helpers         # app's helpers functions
│           ├── db              # database settings with lowDB
│           ├── services        # logic bussiness
│           ├── utils           # utils functions, methods
│           ├── types           # types
│           ├── interfaces      # interfaces
│   └── ...                     # etc.
│      ├── test                 # test directory for unit a functional tests
└──...
```

## Enviroments
<a name="enviroments"/>

for backend you must config at least one .env files, this API supports 3 enviroments files (.env.development.local, .env.production.local and .env.test.local). Next, You have a .sample.env like this

```
#ENVIROMENT
NODE_ENV=development

# PORT
PORT = 4000

# DATABASE
DB_HOST = localhost
DB_PORT = 3306
DB_USER = root
DB_PASSWORD = password
DB_DATABASE = dev

# TOKEN
SECRET_KEY = secretKey

# LOG
LOG_FORMAT = dev
LOG_DIR = ../logs

# CORS
ORIGIN = *

# EXTERNALS API
EXTERNAL_API= https://jsonplaceholder.typicode.com/posts

# GENERATE FILES FROM CONFIG
CONFIG_FILES = 2 # amount of config files into the folder /src/config/
CONFIG_PATH = src/config/input-traffgen # path base with name of config files, all the files should be incremental start by 1
```

## Installation
<a name="installation"/>

To install the project you need to follow the nexts steps:

1. Have installed Node.
2. Put .env outside of src folder.
3. Execute "npm i".
4. Execute "npm run start-dev" for run the project.
5. Execute GET /ticket/generate endpoint or POST /ticket with body upload .txt files

With all these you will have running the project running in the port 4000 by default waiting for requests.

## API swagger documentation
<a name="swagger-documentation"/>
You can found the swagger API documentation in the route `/api/v1/docs`, there you can see the swagger model definitions and routes documentation.

The routes documentation are going to be inside the routes folder in each route file. Check the following example:

```javascript
/**
 * @swagger
 * paths:
 *      /users:
 *          get:
 *              tags:
 *                  - User
 *              description: Use to get information for all users
 *              responses:
 *                  '200':
 *                      description: A successful response
 *                      content:
 *                          application/json
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/definitions/User'
 */
app.get('/some-resource', controllerCall);
```


## Routes
<a name="routes"/>

the routes are going to be inside routes folder. Use specific middleware as necessary. REMENBER Add your new endpoints base route into `<resource>.routets`

Version should ve like --> apiUrl/v1/endpoint (considerer it when you write new endpoints)

```javascript

const router = Router();

router.post('',[filePayloadExist,fileExtensionLimit(ALLOWED_EXT_TYPES),fileSizeLimiter], (_req: Request, res: Response, _next: NextFunction) => {
  generateTicketsCtrl(_req, res, _next)
})

router.get('/generate', (_req: Request, res: Response, _next: NextFunction) => {
  automaticGenerateTicketsCtrl(_req, res, _next)
})


```


## Controllers
<a name="controllers"/>

Basic structure of controller, remnenber to validate data here because the service should make the bussines logic. Check the follow example

```javascript
export const generateTicketsCtrl = (req: Request, res: Response, _next: NextFunction): void => {
  try {
    generateTickets(req, res, _next);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      msg: 'error client side'
    })
  }
}

```


## Services
<a name="services"/>

this is the place for apply bussiness logic and functionalities with database operations. check the follow example

```javascript

export const generateTickets = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const files = parseObjectType(req.files)
    const filesAttach = files.fileName as FileInput
    let ticketsDone;
    if (Array.isArray(filesAttach)) {
        ticketsDone = Promise.all(filesAttach.map( async (file: FileInput) => {
        const { amountTickets, algorithmType } = startCreateTickets(file.data.data)
        return amountTickets && algorithmType && await processTicket(Number(amountTickets), algorithmType)
      }))

      return res.status(200).json({
        ok: true,
        msg: 'ticket generated suceesfully',
        tickets: ticketsDone && await (await ticketsDone).filter(f=>f).flat()
      });
    } else {
      const { amountTickets, algorithmType } = startCreateTickets(filesAttach.data.data)
      const ticketDone = amountTickets && algorithmType && await processTicket(Number(amountTickets), algorithmType)
      return res.status(200).json({
        ok: true,
        msg: 'ticket generated suceesfully',
        tickets: ticketDone && await ticketDone
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'server side error generating tickets using POST method'
    })
  }
}
```

## Middleware
<a name="middleware"/>

We define middleware here for check, control and administrate right info of the API. One example of a simple middleware can be next one.

```javascript

export const filePayloadExist = (req: Request, res: Response, next: NextFunction): Response | void => {
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      msg: 'Missing files'
    })
  }
  next()
}

```

## Utils
<a name="utils"/>

This dile it is important because we have utils function for use cross all API. Considerer when you have something to use in severals parts of code maybe you can put into utils!

## Test
<a name="test"/>

we must use jest.js and supertest for test, the test are going to be distribuited by endpoints and functionalities.

For the unit tests we are using stubs's directory to save the object entries by each unit test that we are doing.


