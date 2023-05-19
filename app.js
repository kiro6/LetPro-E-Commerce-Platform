/* eslint-disable no-unused-vars */
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Users = require("./models/user.js");
const Products = require('./models/products.js');
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


//................Tshirt creation...............

// const tshirt = new Products({
//   name: 'Men Flowers T-Shirt',
//   variants: [
//     {
//       color: 'Mix',
//       sizes: [
//         { size: 'S', quantityLeft: 10 },
//         { size: 'M', quantityLeft: 8 },
//         { size: 'L', quantityLeft: 5 },
//         { size: 'XL', quantityLeft: 5 },
//         { size: 'XXL', quantityLeft: 5 }
//       ]
//     },
//     {
//       color: 'Beige-Green',
//       sizes: [
//         { size: 'S', quantityLeft: 10 },
//         { size: 'M', quantityLeft: 8 },
//         { size: 'L', quantityLeft: 5 },
//         { size: 'XL', quantityLeft: 5 },
//         { size: 'XXL', quantityLeft: 5 }
//       ]
//     },
//     {
//       color: 'Brown',
//       sizes: [
//         { size: 'S', quantityLeft: 10 },
//         { size: 'M', quantityLeft: 8 },
//         { size: 'L', quantityLeft: 5 },
//         { size: 'XL', quantityLeft: 5 },
//         { size: 'XXL', quantityLeft: 5 }
//       ]
//     },
//     {
//       color: 'White',
//       sizes: [
//         { size: 'S', quantityLeft: 10 },
//         { size: 'M', quantityLeft: 8 },
//         { size: 'L', quantityLeft: 5 },
//         { size: 'XL', quantityLeft: 5 },
//         { size: 'XXL', quantityLeft: 5 }
//       ]
//     },
//     {
//       color: 'Purple-Pink',
//       sizes: [
//         { size: 'S', quantityLeft: 10 },
//         { size: 'M', quantityLeft: 8 },
//         { size: 'L', quantityLeft: 5 },
//         { size: 'XL', quantityLeft: 5 },
//         { size: 'XXL', quantityLeft: 5 }
//       ]
//     },
    
//   ],
//   price: 29.99
// });

// tshirt.save()
// .then(savedProduct => {
//   console.log(savedProduct);
// })
// .catch(error => {
//   console.log(error);
// });

//  ------------------/index------------------
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
app.get("/index", (req, res) => {
  res.redirect("/");
});

//  ------------------login------------------

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    show: false,
    message: "",
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
        res.redirect("/profile");
      } else {
        res.render("login", {
          title: "Login",
          show: true,
          message: "there is no account with this credentials",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//  ------------------register------------------
app.post("/register", (req, res) => {
  Users.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }]
  }).then((userFound) => {
    if (userFound) {
      res.render("login", {
        title: "Login",
        show: true,
        message: "There is a user with this username or email",
      });
    } else {
      const user = new Users(req.body);
      user
        .save()
        .then((result) => {
          res.render("login", {
            title: "Login",
            show: true,
            message: "Your account has been registered successfully",
          });
        })
        .catch((err) => console.log(err));
    }
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
      res.render("profile", { title: "Profile", currentUser });
    } else {
      res.redirect("/profile");
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
      currentUser.address = req.body.address;
      currentUser.password = req.body.password;
      res.redirect("/profile") ;
    } else {
      req.session.destroy(() => {
        res.render("login", {
          title: "Login",
          show: true,
          message: "an error happened while updating your password",
        });
      });
    }
  });
});
//  ------------------/product------------------
app.get("/product", (req, res) => {
  const { product } = req.query;

  // console.log(product);
  Products.findOne({ name : product})
    .then((product) => {
      if (product) {
        const variants = product.schema.path('variants');
        let size = false;

        if(variants.schema.path('sizes')){
          console.log('true');
          size = true;
        }

        res.render("product", { title: "Product" , product , size});
      } else {
        res.status(404).render("404", { title: "404 - Not Found" });
      }
    })
    .catch((err) => {
      console.log(err);
    });

});

//  ------------------/cart------------------
app.get('/cart', (req , res)=>{

  res.render('cart',{title: 'Cart'});
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
