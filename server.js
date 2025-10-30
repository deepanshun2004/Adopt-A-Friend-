const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('./middleware/loger');
const handle404 = require('./middleware/handle404');
const cors = require('cors');
const { connectToDatabase } = require('./db');

const app = express();
const PORT = 3000;


let dbReady = false;

(async () => {
  try {
    await connectToDatabase();
    dbReady = true;
    console.log('Database connection ready');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    dbReady = false;
  }
})();

// Middleware
app.use(logger);
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use((req, res, next) => {
  if (req.path === '/submit-adoption' && !dbReady) {
    return res.status(503).render('error', { 
      message: 'Database service unavailable. Please try again later.' 
    });
  }
  next();
});


const pageroute = require('./routes/pageroute');
const authen = require('./routes/authen');
app.use('/', pageroute);
app.use('/', authen);

// 404 Handler
app.use(handle404);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});


process.on('SIGINT', async () => {
  const { closeConnection } = require('./db');
  await closeConnection();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});