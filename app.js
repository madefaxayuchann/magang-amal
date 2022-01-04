var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// var neo4j = require("neo4j");

var indexRouter = require("./routes/index");
var inputFormRouter = require("./routes/inputForm");
let anotherActionRouter = require("./routes/anotherAction");
let somethingElseHereRouter = require("./routes/somethigElseHere");
let axiosRouter = require("./routes/axios");
let listOfValueRouter = require("./routes/listOfValue");
let userRouter = require("./routes/user");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/inputForm", inputFormRouter);
app.use("/anotherAction", anotherActionRouter);
app.use("/somethingElseHere", somethingElseHereRouter);
app.use("/axios", axiosRouter);
app.use("/listOfValue", listOfValueRouter);
app.use("/user", userRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

console.log("your port in 3000");

module.exports = app;
