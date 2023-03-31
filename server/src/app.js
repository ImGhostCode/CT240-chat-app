const express = require('express');
const app = express();
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const ApiError = require("./v1/utils/apiError");

//user middleware
app.use(helmet())
app.use(morgan('combined'))
// compress responses
app.use(compression())

// add body-parser
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//router
app.use('/api/v1', require('./v1/routes/index.router'))

// Error Handling Middleware called

app.use((req, res, next) => {
    next(new ApiError(404, "error", "No Found", null))
});


// error handler middleware
app.use((error, req, res, next) => {
    return res.status(error.code || 500).json({
        code: error.code || 500,
        status: error.status,
        message: error.message || "Internal Server Error",
        data: error.data,
    });
});

module.exports = app;