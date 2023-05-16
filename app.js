/* eslint-disable no-unused-vars */
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Users = require("./models/user.js");
const session = require("express-session");

//express app
const app = express();

//connect to DB
const DBUSR = "mongodb+srv://CEO:admin12345@mood.kkmmia4.mongodb.net/MOOD";
mongoose
  .connect(DBUSR, { useNewURLParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected");
    app.listen(5555);
  })
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//static files
app.use(express.static("public"));

//req body
app.use(express.urlencoded({ extended: true }));

//sessions
app.use(
  session({
    secret: "Secret-Key",
    resave: false,
    saveUninitialized: false,
  })
);

//logs
app.use(morgan("dev"));

const currentUser = {
  userId: "",
  username: "",
  email: "",
  phoneNumber: "",
  address: "",
  cart: "",
  orders: "",
};

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    accountExist: true,
    message: "there is no account with this credentials",
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Users
    .findOne({ username: username, password: password })
    .then((user) => {
      if (user) {
        currentUser.userId = user.userId;
        currentUser.username = username;
        currentUser.email = user.email;
        currentUser.address = user.address;
        currentUser.phoneNumber = user.phoneNumber;
        currentUser.cart = user.cart;
        currentUser.orders = user.orders;

        req.session.user = user;
        res.redirect("/profile");
      } else {
        res.render("login", {
          title: "Login",
          accountExist: false,
          message: "there is no account with this credentials",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/register", (req, res) => {
  console.log(req.body);

  const user = new Users(req.body);
  user
    .save()
    .then((result) => {
      // res.send(result);
    })
    .catch((err) => console.log(err));

  res.redirect("/login");
});

app.get("/profile", (req, res) => {
  if (requireLogin(req)) {
    res.redirect("/login");
  }

  res.render("profile", { title: "Profile", currentUser });
});

app.post("/profile", (req, res) => {
  if (requireLogin(req)) {
    res.redirect("/login");
  }

  var conditions = {
   userId : req.body.userId 
  }
 
  var update = {
    userId:  req.body.userId,
    username:  req.body.username,
    email:  req.body.email,
    phoneNumber:  req.body.phoneNumber,
    address: req.body.address,
    cart: req.body.cart,
    orders: req.body.orders , 
  }
 
   Users.findOneAndUpdate(conditions,update).then((updatedUser)=>{
    if (updatedUser) {
      currentUser.username = updatedUser.username;
      currentUser.email = updatedUser.email;
      currentUser.address = updatedUser.address;
      currentUser.phoneNumber = updatedUser.phoneNumber;
      currentUser.cart = updatedUser.cart;
      currentUser.orders = updatedUser.orders;


      res.render('profile' , { title: "Profile", currentUser })
    } else {
      res.redirect('/profile')
    }

  })


  
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About us" });
});

//redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.get("/index", (req, res) => {
  res.redirect("/");
});

//404
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Not Found" });
});

function requireLogin(req) {
  if (!req.session.user) {
    return true;
  } else {
    return false;
  }
}
