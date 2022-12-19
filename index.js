const express = require("express");
const mongoose = require('mongoose');

const booksRoutes = require("./routes/book")
const visitorsRoutes = require("./routes/visitor")
const orderRoutes = require("./routes/order")

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://doppelyouz:daneka18@cluster0.tt7avdq.mongodb.net/library?retryWrites=true&w=majority',() => {
  console.log('mongo connected');
}, (err) => {
  console.log(err);
})
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/books", booksRoutes)
app.use("/visitors", visitorsRoutes)
app.use("/cards", orderRoutes)

app.listen(8080, () => {
  console.log("Server is on 8080");
});
