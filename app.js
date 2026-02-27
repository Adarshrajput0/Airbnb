const DB_PATH =
  "mongodb+srv://Adarsh:Adarsh@cluster0.tmsiqs5.mongodb.net/airbnb?appName=Cluster0";

const path = require("path");
const express = require("express");
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtils");
const errorsController = require("./controllers/error");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
const store = MongoStore.create({
  mongoUrl: DB_PATH,
  collectionName: "sessions",
  // ttl: 14 * 24 * 60 * 60,
});

app.use(express.urlencoded());

app.use(
  session({
    secret: "Adarsh Singh Rajput",
    resave: false,
    saveUninitialized: false,
    store: store, // USE the store you already created
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 24, // 1 day
    // },
  }),
);

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.user = req.session.user || null;

  req.isLoggedIn = res.locals.isLoggedIn;
  req.user = res.locals.user;

  next();
});

app.use(storeRouter);
app.use(authRouter);
app.use("/host", (req, res, next) => {
  if (req.user && req.user.userType === "host") {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use(hostRouter);
app.use(express.static(path.join(rootDir, "public")));

app.use(errorsController.pageNotFound);

const PORT = 3004;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error While Connecting to Mongo:", err);
  });
