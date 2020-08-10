require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');

const checkServerStatus = require('./helpers/checkServerStatus');
const config = require('./config');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 5000;
const rootUrl = dev ? `http://localhost:${port}` : config.productionURL;

const app = express();

if (!dev) {
  app.use(helmet());
  app.use(compression());
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((error, req, res, next) => {
  const { status = 500, message } = error;
  res.status(status).json({
    type: 'error',
    message,
  });
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server successfully started on ${rootUrl}`);

  /* Helper function to avoid node sleeping using free plan on Heroku */
  checkServerStatus(rootUrl, 25);
});
