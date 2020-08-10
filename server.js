require('dotenv').config();

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const checkServerStatus = require('./helpers/checkServerStatus');
const config = require('./config');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 5000;
const rootUrl = dev ? `http://localhost:${port}` : config.productionURL;

require('./models/User');
require('./models/Post');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
require('./passport');

const connectMongoDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('MongoDB connection error. Check:', error);
  }
};

connectMongoDB().catch();

const app = express();

if (!dev) {
  app.use(helmet());
  app.use(compression());
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sessionConfig = {
  name: 'blog-user-id.sid',
  secret: config.sessionSecret,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 7 * 24 * 60 * 60,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

if (!dev) {
  sessionConfig.cookie.secure = true;
  app.set('trust proxy', 1);
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(logger('tiny'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

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
