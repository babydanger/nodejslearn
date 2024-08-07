import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index.js';
import 'dotenv/config.js';
import NodeCache from 'node-cache';
import { getPermissions } from './database/db_permission.js';
import multer from 'multer';

const portDB = process.env.PORT;
const app = express();
app.use(cors({
    credentials: true,
}))

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

const server = http.createServer(app);
server.listen(portDB, () => {
    console.log('server is running');

});

const MONGO_DB_URL = 'mongodb+srv://hiepuh:hoanghiepung@nodejs.nxw6fdl.mongodb.net/?retryWrites=true&w=majority&appName=NodeJS'

mongoose.Promise = Promise;
mongoose.connect(MONGO_DB_URL);
mongoose.connection.on('error', (error) => console.log(error))
mongoose.connection.on('connected', () => {
    console.log('connected DB success')
    initCache()
});



export const myCache = new NodeCache();


const initCache = async () => {
    const permissions = await getPermissions();
    myCache.set("Pers", permissions);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  export const upload = multer({ storage });

  app.use('/', router());