const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("./config/passportConfig");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const leaseRouter = require("./routes/lease");
const apartmentRouter = require("./routes/apartment");
const tenantRouter = require("./routes/tenant");
const complaintsRouter = require("./routes/complaints");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/api/complaints", complaintsRouter);

app.use("/api/dashboard/lease", leaseRouter);
app.use("/api/dashboard/tenant", tenantRouter);
app.use("/api/dashboard/apartment", apartmentRouter);

app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server is running on localhost:4000, you better catch it!");
});

function errorHandler(err, req, res, next) {
  //simple error response
  return res.status(res.statusCode !== 200 ? res.statusCode : 500).json({ message: err.message });
}

module.exports = app;
