require('dotenv').config();

const path = require('path');
const app = require('./config/express');

// MONGO
require('./config/mongoose');

// PORT
const port = process.env.PORT || 3001;

// API ROUTE
const apiRouter = require('./api');

app.use('/api', apiRouter);

// REACT ROUTE
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
});

// SERVER LISTEN
app.listen(port, () => {
  console.log('SERVER ON PORT', port);
});
