const { Router } = require("express");
const Book = require("../model/Book");

const router = Router();

router.get("/", async (req, res) => {
  const books = await Book.find();
  res.status(200).render("books.ejs", {
    books
  });
});

router.get("/all", async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
});

router.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const books = await Book.updateOne({
    _id: id
  }, req.body);

  res.status(200).json(books);
});

router.delete("/delete/:id", async (req, res) => {
  await Book.deleteOne({ _id:req.params.id })
  res.status(200).json('deleted');
});

router.post("/create", async (req, res) => {
  const book = new Book({
    title:req.body.title,
    author:req.body.author,
    publisherName:req.body.publisherName,
    publishingYear:req.body.publishingYear,
    pages:req.body.pages,
    count:req.body.count
  });

  await book.save();
  res.status(200).json({"title": "ok"});
});

module.exports = router;
