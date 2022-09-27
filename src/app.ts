import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fileUpload from 'express-fileupload'
import expressStatusMonitor from 'express-status-monitor';

//swagger
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swaggerOptions';

import { configStatusMonitor } from './config/monitorStatus'
import { corsConfig } from './config/corsConfig';
import routerPost from './routes/post.routes';
import routerTicket from './routes/ticket.routes'

const app = express()

app.use(expressStatusMonitor(configStatusMonitor))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors(corsConfig))
app.use(helmet())
app.use(morgan('dev'))
app.use(fileUpload({ createParentPath: true }))
app.use(express.static("public"));

const swaggerSpecs = swaggerJSDoc(options)

app.use(`/api/v1/post`,routerPost)
app.use(`/api/v1/ticket`,routerTicket)

app.get('/api/v1/alive', (_req, res) => {
  console.log('API ALIVE YESS****')
  res.send('API up and running')
})

app.use("/api/v1/docs",swaggerUi.serve, swaggerUi.setup( swaggerSpecs ));

export default app
