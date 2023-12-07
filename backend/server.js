require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import routes
const workoutRoutes = require('./routes/workouts');
const userRouters = require('./routes/User');

// Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleDateString()} ${req.method}:${req.url}`); // Just Reminder
    next(); // use Next method
});

// routes
app.use('/api/user', userRouters);
app.use('/api/workouts', workoutRoutes);

// connect database
mongoose.connect(process.env.MONGO_URI, { dbName: 'exerciseTask' }) // put here the database name
    .then(() => {
        // Listen for request
        app.listen(process.env.PORT, () => {
            console.log('Connected to database & Listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    })
