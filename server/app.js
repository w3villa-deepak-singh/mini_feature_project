require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const bodyParser = require('body-parser');
const { sequelize,syncDb } = require('./models');
const cors = require('cors');

const pingRoutes = require('./routes/pingRoutes');  
const signupRoutes = require('./routes/signupRoutes');  
const verifyOtpRoutes = require('./routes/verifyOtpRoutes');
const authRoutes = require('./routes/authRoutes');
const mobileOtpRoutes = require('./routes/mobileOtpRoutes');
const imgRoutes = require('./routes/imgRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const errorHandler = require('./middlewares/errorHandler');



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());




app.use(cors({
  origin: 'http://localhost:3002',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], 
  // allowedHeaders: ['Content-Type', 'Authorization'] 
}));


// // Express session
app.use(session({
  key:'uuuid',
  secret: 'feature1234',
  resave: false,
  saveUninitialized: false,
  // cookie: {
  //   secure: false, // Set to true if using HTTPS in production
  //   httpOnly: true,
  //   sameSite: 'lax', // Adjust this based on your needs
  //   maxAge: 24 * 60 * 60 * 1000 ,
  //   path: '/',
  //   signed:false
  // },
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());




// app.use((req, res, next) => {
//   console.log('Session ID::::::::::', req.sessionID);
//   console.log('Session Data:::::::::::', req.session);
//   console.log('UID in session::::::::::::::::', req.session.UID);
//   next();
// });

// Session debugging middleware
app.use((req, res, next) => {
  console.log('Session ID at start:', req.sessionID);
  console.log('Session data at start:', req.session);
  
  const oldEnd = res.end;
  res.end = function(...args) {
    console.log('Session ID at end:', req.sessionID);
    console.log('Session data at end:', req.session);
    oldEnd.apply(this, args);
  };
  
  next();
});

app.use('/api', pingRoutes);  
app.use('/api', signupRoutes);
app.use('/api', verifyOtpRoutes);
app.use('/api', mobileOtpRoutes);
app.use('/auth', authRoutes);
app.use('/api', imgRoutes);
app.use('/api', userRoutes);
app.use('/api', paymentRoutes);


// app.use('/api', loginRoutes); 




app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
    await syncDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
