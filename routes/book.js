const { Router } = require("express");
const Book = require("../model/Book");

const router = Router();

router.get("/", (req, res) => {
  res.status(200).render("books.ejs");
});

router.get("/all", async (req, res) => {
  const books = await Book.getAll();
  res.status(200).json(books);
});

router.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const books = await Book.update(id, req.body);

  res.status(200).json(books);
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const books = await Book.delete(id);

  res.status(200).json(books);
});

router.post("/create", async (req, res) => {
  const book = new Book({
    ...req.body,
  });

  const books = await book.save()
  res.status(200).json(books)
});

module.exports = router;
