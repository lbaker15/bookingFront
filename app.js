import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
const PORT = process.env.PORT || 4000;
import router from './routes/routes.js';
import { expressjwt } from 'express-jwt';
import { resolvers } from './schema.js';
import { typeDefs } from './schemas/schema.js';
import { ApolloServer } from 'apollo-server-express';
import User from './models/user.js';
import { graphqlUploadExpress } from 'graphql-upload';
import { mongoose } from 'mongoose';
import { errorLogger, errorResponder, invalidPathHandler } from './util/errorHandling.js';
import cookieParser from 'cookie-parser';
import { redisClient } from './redis.js';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { errorMiddleware } from './middleware.js';
const JWT_SECRET = process.env.JWT_SECRET;

const func = async () => {
  const JWT_SECRET = process.env.JWT_SECRET;
  console.log(JWT_SECRET, process.env);
  const app = express();

  app.use(cookieParser());
  app.use(
    expressjwt({
      algorithms: ['HS256'],
      credentialsRequired: false,
      secret: JWT_SECRET,
    })
  );
  app.use(express.json());
  app.use(cors());
  //will need for httponly cookies
  // app.use(function (req, res, next) {
  //   res.header('Access-Control-Allow-Origin', 'https://localhost:3000');
  //   res.header('Access-Control-Allow-Credentials', 'true');
  //   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //   next();
  // });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // // Redis/express sessions: Initialize client.
  // redisClient.connect().catch(console.error);
  // // Initialize store.
  // let redisStore = new RedisStore({
  //   host: 'localhost',
  //   port: 6379,
  //   client: redisClient,
  //   ttl: 260,
  // });
  // app.use(
  //   session({
  //     store: redisStore,
  //     secret: 'your-secret-key',
  //     resave: false,
  //     saveUninitialized: false,
  //     genid: (req) => {
  //       return req.auth ? req.auth.sub : Math.random();
  //     },
  //   })
  // );

  app.use(graphqlUploadExpress());
  app.use('/', router);
  //graphql context & error handling
  const context = async ({ req }) => {
    let id;
    if (req.auth) {
      const user = await User.findById(req.auth.sub);
      id = user.id;
    }
    return { auth: id, req: req };
  };
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,

    formatError: (err) => {
      err.message = `${err.message} END ERROR:`;
      return err;
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  //app.use(errorMiddleware);
  //mongo connection
  const uri = process.env.ATLAS_URI;
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', function () {
    console.log('Connected successfully');
  });
  //rest error handling
  app.use(errorLogger);
  app.use(errorResponder);
  app.use(invalidPathHandler);

  app.listen({ port: PORT }, () => {
    console.log('server up');
  });
};
func();
