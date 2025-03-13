import express from 'express';
import expressJwt from 'express-jwt';
import { router as userRouter } from './user/index.js';
import { router as loginRouter } from './auth.js';
import { router as movieRouter } from './movie/index.js';
import { getChannel, registerHandler } from './connect.js';
 
const channel = await getChannel();
registerHandler(channel);
 
const app = express();
 
app.use(express.json());
app.use('/login', loginRouter);
app.use(
  '/user',
  expressJwt({ secret: 'secret', algorithms: ['HS256'] }),
  userRouter,
);
app.use(
'/movie',
expressJwt({ secret: 'secret', algorithms: ['HS256'] }),
movieRouter,
);

app.use((err, request, response, next) => {
  if (err.name === 'UnauthorizedError') {
    response.status(401).json('unauthorized');
  } else {
    next();
  }
});
 
app.listen(8080, () => console.log('API Gateway is listening'));