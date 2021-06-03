import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import cors from 'cors';
import connectDB from './db/index.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  OpenApiValidator.middleware({
    apiSpec: './apiDescription.yaml',
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  })
);

const port = process.env.PORT;

connectDB().then(
  app.listen(port, () => {
    console.log(`app spinning on port ${port}`);
  })
);
