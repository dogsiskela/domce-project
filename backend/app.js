const express = require("express");

const { apartmentsRouter } = require("./routes/apartments");
const { userRouter } = require("./routes/user");

const { default: helmet } = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:80","http://localhost","localhost"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(helmet());
app.disable("x-powered-by");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/apartments", apartmentsRouter);
app.use("/",userRouter);

module.exports = app;
