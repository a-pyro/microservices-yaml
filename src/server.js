import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import cors from 'cors';
import mongoose from 'mongoose';
const { connect } = mongoose;
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

const PORT = process.env.PORT;

connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'production') {
        // no need to configure it manually on Heroku
        console.log('Server running on cloud on port: ', PORT);
      } else {
        console.log('Server running locally on port: ', PORT);
      }
    });
  })
  .catch((err) => console.log(err));
