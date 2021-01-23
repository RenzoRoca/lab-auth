const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');

const MongoStore = connectMongo(expressSession);

// Iteration 2: configure session & enable mongo session store
const session= expressSession({
        secret: process.env.SESSION_SECURE || 'super secret (change it)',
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: process.env.SESSION_SECURE || false,
            httpOnly: true,
            maxAge: process.env.SESSION_MAX_AGE || 360000,
        },
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: process.env.SESSION_MAX_AGE || 3600,

        }),
});

module.exports = session;