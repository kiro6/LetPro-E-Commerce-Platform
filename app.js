/* eslint-disable no-unused-vars */
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const crypto = require("crypto");
const mongoose = require("mongoose");

const Users = require("./models/user.js");
const Products = require("./models/products.js");
const { log } = require("console");

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

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


// security

function hashString(inputString) {
  const hash = crypto.createHash("sha256");
  hash.update(inputString);
  const hashedString = hash.digest("hex");
  return hashedString;
}

function generateId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < 24; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}

//sessions
app.use(
  session({
    secret: generateId(),
    resave: false,
    saveUninitialized: false,
  })
);

//logs
app.use(morgan("dev"));

//  ------------------/index------------------
app.get("/", (req, res) => {
  let Trending = [];

  let Queries = [
    Products.Tshirt.find({ trending: true }),
    Products.Bag.find({ trending: true }),
    Products.Watch.find({ trending: true }),
  ];

  Promise.all(Queries)
    .then((results) => {
      results.forEach((products) => {
        products.forEach((product) => {
          Trending.push(product);
        });
      });

      res.render("index", { title: "Home", Trending });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred");
    });
});

//------------------/index------------------
app.get("/index", (req, res) => {
  res.redirect("/");
});

// -------------------shop------------------
app.get("/shop", (req, res) => {
  let shopItems = [];

  let Queries = [
    Products.Tshirt.find(),
    Products.Bag.find(),
    Products.Watch.find(),
  ];

  Promise.all(Queries)
    .then((results) => {
      results.forEach((products) => {
        products.forEach((product) => {
          shopItems.push(product);
        });
      });

      shopItems = shuffleItems(shopItems);
      res.render("shop", { title: "Shop", shopItems });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred");
    });
});

//  ------------------login------------------

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
  });
});

//  ------------------login------------------
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Users.findOne({ username: username, password: password })
    .then((user) => {
      if (user) {
        req.session.user = user;
        res.json({ redirect: "/profile", userId: user.userId });

      } else {
        const responseData = { message: "User Name or Password is Wrong" };
        res.json(responseData);
      }
    })
    .catch((err) => {
      console.log(err);
      const responseData = { message: "An error occurred" };
      res.json(responseData);
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
  } else {
    const userId = req.cookies.userId;

    Users.findOne({ userId }).then((currentUser) => {
      if (currentUser) {
        res.render("profile", { title: "Profile", currentUser });
      }
    });
  }
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
    userBalance : req.body.userBalance 
  };

  Users.findOneAndUpdate(conditions, update).then((updatedUser) => {
    if (updatedUser) {
      const responseData = {
        message: "data updated successfully",
        redirect: "/profile",
      };
      res.json(responseData);
    } else {
      req.session.destroy(() => {
        const responseData = {
          message: "an error happened while updating your data",
          redirect: "/index",
        };
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
      const responseData = {
        message: "password updated successfully",
        redirect: "/profile",
      };
      res.json(responseData);
    } else {
      req.session.destroy(() => {
        const responseData = {
          message: "an error happened while updating your password",
          redirect: "/index",
        };
        res.json(responseData);
      });
    }
  });
});

//  ------------------/product------------------
app.get("/product", (req, res) => {
  const { product } = req.query;
  let Trending = [];

  let Queries = [
    Products.Tshirt.findOne({ name: product }),
    Products.Bag.findOne({ name: product }),
    Products.Watch.findOne({ name: product }),
  ];

  Promise.all(Queries)
    .then((results) => {
      Trending = Trending.concat(results);
      let productFound;

      Trending.forEach((item) => {
        if (item != null) productFound = item;
      });

      let colors;
      let size = false;

      if (productFound.schema.path("variants")) {
        size = true;
        colors = productFound.variants;
      } else {
        colors = productFound.colors;
      }

      res.render("product", {
        title: "Product",
        product: productFound,
        size,
        colors,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred");
    });
});

//  ------------------/product/cartadd------------------
app.post("/product/cartadd", (req, res) => {
  var conditions = {
    userId: req.body.userId,
  };

  var update = {
    $push: {
      cart: req.body.cart,
     
    } , 
    $inc: {
      cartTotalPrice:  Number(req.body.cartTotalPrice)
    }
  };

  Users.findOneAndUpdate(conditions, update)
    .then((updatedUser) => {
      if (updatedUser && !requireLogin(req)) {
        const responseData = {
          message: "item added to cart successfully",
          done: true,
        };
        res.json(responseData);
      } else {
        const responseData = {
          message: "plz login to add items to cart",
          done: false,
        };
        res.json(responseData);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//  ------------------/cart------------------
app.get("/cart", (req, res) => {
  if (requireLogin(req)) {
    res.redirect("login");
  } else {
    const userId = req.cookies.userId;

    Users.findOne({ userId }).then((currentUser) => {
      if (currentUser) {
        res.render("cart", { title : "Cart" , currentUser });
      } else {
        res.redirect("login");
      }
    });
  }
});


//----------------/cart/checkout--------------

app.post('/cart/checkout', (req, res) => {
  Users.findOne({ _id: req.body.user }).then((userFound) => {
    if (userFound.userBalance >= userFound.cartTotalPrice) {
      // Sufficient balance to checkout
      
      // Calculate updated balance
      const updatedBalance = userFound.userBalance - userFound.cartTotalPrice;
      
      // Move cart items to orderedProducts
      const orderedProducts = userFound.cart.map((cartItem) => ({
        product: cartItem.product,
        colorIndex: cartItem.colorIndex,
        sizeIndex: cartItem.sizeIndex,
        quantity: cartItem.quantity,
        price: cartItem.price,
        createAt: new Date().toISOString(),
        status: 'Pending',
      }));
      
      // Reset cart and update balance
      Users.findOneAndUpdate(
        { _id: req.body.user },
        {
          $push: { orderedProducts: { $each: orderedProducts } },
          $set: { cart: [], userBalance: updatedBalance, cartTotalPrice: 0 },
        },
        { new: true }
      )
        .then((updatedUser) => {
          console.log('Cart items moved to orderedProducts successfully');
          const responseData = {
            message: 'Checkout successful',
            done: true,
            user: updatedUser,
          };
          res.json(responseData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: 'Internal server error' });
        });
    } else {
      // Insufficient balance to checkout
      const responseData = {
        message: 'Insufficient balance to checkout',
        done: false,
      };
      res.json(responseData);
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
});




//  ------------------/logout------------------
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("userId");
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
function shuffleItems(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}