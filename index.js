const express = require("express");

const booksRoutes = require("./routes/book")

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/books", booksRoutes)

app.listen(8080, () => {
  console.log("Server is on 8080");
});
