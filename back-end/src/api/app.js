const express = require('express');
const cors = require('cors');
const { productRouter, loginRouter, registerRouter } = require('../routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).json('lalala'));
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', productRouter);

module.exports = app;
