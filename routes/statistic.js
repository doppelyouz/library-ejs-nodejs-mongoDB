const { Router } = require("express");
const Book = require("../model/Book");

const router = Router();

router.get("/", (req, res) => {
  res.status(200).render("statistics.ejs");
});

module.exports = router;
