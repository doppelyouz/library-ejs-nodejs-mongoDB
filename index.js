const express = require("express");
const mongoose = require('mongoose');

const booksRoutes = require("./routes/book")

const app = express();
mongoose.connect('mongodb+srv://doppelyouz:sdGHhSL4Mnb6mZqv@cluster0.tt7avdq.mongodb.net/library?retryWrites=true&w=majority',() => {
  console.log('mongo connected');
}, (err) => {
  console.log(err);
})
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/books", booksRoutes)

app.listen(8080, () => {
  console.log("Server is on 8080");
});
