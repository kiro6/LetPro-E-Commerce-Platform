/* eslint-disable no-unused-vars */
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Users = require("./models/user.js");
const Products = require("./models/products.js");

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
app.use(bodyParser.json());

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

//  ------------------/index------------------
app.get("/", (req, res) => {
  let Trending = [];


  let Queries = [
    Products.Tshirt.find({ trending: true }),
    Products.Bag.find({ trending: true }),
    Products.Watch.find({ trending: true })
  ];


  Promise.all(Queries)
    .then(results => {
      results.forEach(products => {
        products.forEach(product => {
          Trending.push(product);
        });
      });

      res.render("index", { title: "Home", Trending });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("An error occurred");
    });
});

//------------------/index------------------
app.get('/index' , (req , res) => {
res.redirect('/') ; 
})

// -------------------shop------------------
app.get("/shop", (req, res) => {
  res.render("shop", { title: "Shop" });
});

//  ------------------login------------------

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login"
  });
});

//  ------------------login------------------
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Users.findOne({ username: username, password: password })
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
        res.json({ redirect: "/profile" });
      } else {
        const responseData = { message: "User Name or Password is Wrong" };
        res.json(responseData);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//  ------------------register------------------
app.post("/register", (req, res) => {
  Users.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  })
    .then((userFound) => {
      if (userFound) {
        const responseData = {
          message: "There is a user with this email or username",
        };
        res.json(responseData);
      } else {
        const user = new Users(req.body);
        user
          .save()
          .then(() => {
            const responseData = { message: "Registration successful" };
            res.json(responseData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
});

//  ------------------profile------------------
app.get("/profile", (req, res) => {
  if (requireLogin(req)) {
    res.redirect("/login");
  }

  res.render("profile", { title: "Profile", currentUser });
});

//  ------------------/profile/update------------------
app.post("/profile/update", (req, res) => {
  if (requireLogin(req)) {
    res.redirect("/login");
  }

  var conditions = {
    userId: req.body.userId,
  };

  var update = {
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  };

  Users.findOneAndUpdate(conditions, update).then((updatedUser) => {
    if (updatedUser) {
      currentUser.address = req.body.address;
      currentUser.phoneNumber = req.body.phoneNumber;
      const responseData = { message: "data updated successfully" ,  redirect: "/profile"  };
      res.json(responseData);
    } else {
      req.session.destroy(() => {

        const responseData = { message: "an error happened while updating your data" , redirect: "/index" };
        res.json(responseData);

      });
    }
  });
});

//  ------------------/profile/changepass------------------
app.post("/profile/changepass", (req, res) => {
  var conditions = {
    userId: req.body.userId,
  };

  var update = {
    password: req.body.password,
  };

  Users.findOneAndUpdate(conditions, update).then((updatedUser) => {
    if (updatedUser) {
      currentUser.password = req.body.password;
      const responseData = { message: "password updated successfully" , redirect: "/profile" };
      res.json(responseData);
      
    } else {
      req.session.destroy(() => {

        const responseData = { message: "an error happened while updating your password" , redirect: "/index" };
        res.json(responseData);

      });
    }
  });
});



//  ------------------/product------------------
app.get("/product", (req, res) => {
  const { product } = req.query;
  let Trending=[];

  let Queries = [
    Products.Tshirt.findOne({ name: product }),
    Products.Bag.findOne({ name: product}),
    Products.Watch.findOne({ name: product})
  ];

  Promise.all(Queries)
    .then(results => {

      Trending = Trending.concat(results);
      let productFound;

      Trending.forEach(item=>{
        if(item!=null)
          productFound=item;
      });


      let colors;
      let size = false;

        if(productFound.schema.path('variants')){
          console.log('true');
          size = true;
          colors = productFound.variants;
        }
        else{
          colors = productFound.colors;
        }

      console.log(Trending);
      res.render("product", { title: "Product", product:productFound , size ,colors});
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("An error occurred");
    });
});

//  ------------------/cart------------------
app.get("/cart", (req, res) => {
  res.render("cart", { title: "Cart" });
});

//  ------------------/logout------------------
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

//  ------------------/about------------------
app.get("/about", (req, res) => {
  res.render("about", { title: "About us" });
});
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//  ------------------404------------------
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
