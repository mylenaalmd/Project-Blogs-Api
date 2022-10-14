const express = require('express');
const errorMiddleware = require('./middlewares/error');
const loginRouter = require('./router/loginRouter');
const userRouter = require('./router/userRouter');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);

app.use(errorMiddleware);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
