const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const booksPath = path.resolve("data", "books.json");

class Book {
  constructor({
    title = "Unknown",
    author = "Unknown",
    count = "Unknown",
    pages = "Unknown",
    publisherName = "Unknown",
    publishingYear = "Unknown",
  }) {
    this.id = uuid();
    this.title = title;
    this.author = author;
    this.count = count;
    this.pages = pages;
    this.publisherName = publisherName;
    this.publishingYear = publishingYear;
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(booksPath, { encoding: "utf-8" }, (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data || "[]"));
      });
    });
  }

  static write(data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(booksPath, JSON.stringify(data), (err) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  async save() {
    const books = await Book.getAll();
    books.push(this);

    return Book.write(books);
  }
  static async update(id, data) {
    const books = await Book.getAll();
    const ind = books.findIndex(e => e.id === id);

    const newBook = {
      ...books[ind],
      ...data,
      id
    };
    books[ind] = newBook;

    return Book.write(books);
  }
  static async delete(id) {
    const books = await Book.getAll();
    const newBooks = books.filter(e => e.id !== id);

    return Book.write(newBooks);
  }
}

module.exports = Book;
