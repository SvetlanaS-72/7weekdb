const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRouter = require('./routes/api');
const cookieParser = require("cookie-parser");
const pagesRouter = require("./routes/pages");

const connectToDatabase = require('./database/connect')

const PORT=3001;

const app = express();
connectToDatabase();

app.use(
    cookieParser(),
    bodyParser.json(),
    pagesRouter,
    apiRouter,
    express.static(path.join(__dirname,"public")),
);

app.listen (PORT,() => {
    console.log(`Server is runningat PORT http://localhost:${PORT}`);
});




