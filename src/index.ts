import displayRoutes from 'express-routemap'

import app from './app'
import validateEnv from './utils/validateEnv'
import { PORT, NODE_ENV } from './config/config'
import { createConnection } from './db/db';

validateEnv();
createConnection();
const server = app

server.listen(PORT, () => {
  displayRoutes(app)
  console.log('=================================')
  console.log(`======= ENV: ${NODE_ENV} =======`)
  console.log(`🚀 App listening on the port ${PORT}`)
  console.log('=================================')
})
