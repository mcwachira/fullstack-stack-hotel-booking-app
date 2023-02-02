import express from 'express'
import helmet from 'helmet'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors'
import cookieParser from "cookie-parser"
import morgan from 'morgan'

const app = express()



app.use(helmet())

//for parsing application/json
app.use(express.json({ limit: '30mb', extended: true }));
//for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: '30mb', extended: true }))


/*enabling express to locate static files*/
app.use(express.static('public'))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//enabling express to locate static files using virtual path /
app.use('/', express.static(path.join(__dirname, '..', '/public')))

//morgan fro logging
app.use(morgan('tiny'))


//enabling cors
app.use(cors())


//get cookies
app.use(cookieParser())

export default app