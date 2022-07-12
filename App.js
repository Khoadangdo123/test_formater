import Express, { response } from 'express';
import BodyParser from 'body-parser';
import MongoClient from 'mongodb';
import Mongoose from 'mongoose';
import DotEnv from 'dotenv';
import Cors from 'cors';
import Multer from 'multer';

import Routes from './routes/routes.js';

DotEnv.config({ path: 'global.env', override: true });

const App = Express();
const port = process.env.PORT || 5000;
const fileStorageEngine = Multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, './images');
  },
  filename: (request, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  }
});

const upload = Multer({ storage: fileStorageEngine });

const UrlDataBase = process.env.DATA_BASE;

App.post('/single', upload.single('image'), (request, response) => {
  response.send('Single File Success');
});

App.post('/multiple', upload.array('images', 3), (request, response) => {
  console.log(request.files);
  response.send('Success File Images');
});

App.get('/single', (request, response) => {
  response.send('Single File Success');
});

App.use(Cors());
App.use(BodyParser.json());
App.use('/', Routes);

// MongoDB Data base

Mongoose.connect(UrlDataBase, {
  useNewUrlParser: true
});

App.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
