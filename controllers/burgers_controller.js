
var express = require("express");

var router = express.Router();

var db = require("../models/");

// get route 
router.get("/", function(req, res) {

  res.redirect("/burgers");
});

// get route, edited to match sequelize
router.get("/burgers", function(req, res) {

  db.Burger.findAll()
    // use promise method to pass the burgers...
    .then(function(dbBurger) {
      console.log(dbBurger);
      // into the main index, updating the page
      var hbsObject = { burger: dbBurger };
      return res.render("index", hbsObject);
    });
});

// post route to create burgers
router.post("/burgers/create", function(req, res) {
  // edited burger create to add in a burger_name
  db.Burger.create({
    burger_name: req.body.burger_name
  })
    // pass the result of our call
  .then(function(dbBurger) {
 
    console.log(dbBurger);
      // redirect
    res.redirect("/");
  });
});

// put route to devour a burger
router.put("/burgers/update", function(req, res) {

  db.Burger.update({
    devoured: true
  },
    {
      where: {
        id: req.body.burger_id
      }
    }
  ).then(function(dbBurger) {
    res.redirect("/");
  });
});

module.exports = router;
