const new_book = document.querySelector("#newBook");
const create_book = document.querySelector("#createBook");
const close_book = document.querySelector("#closeBook");
const inputs_create_form = document.querySelector("#inputsCreateBooks");
const save_edit_book = document.querySelector("#saveChangesBook");
const tbody_books = document.querySelector("#tbodyBooks");
const inputs_edit_form = document.querySelector("#inputsChangeBooks");

let chosenTr;
let thisId;

let booksArray = [];

const saveChangesBook = document.querySelector("#saveChangesBook");
const closeChangeBook = document.querySelector("#closeChangeBook");
const deleteBook = document.querySelector("#deleteBook");

const titleChange = document.querySelector("#titleChange");
const authorChange = document.querySelector("#authorChange");
const publishingYearChange = document.querySelector("#publishingYearChange");
const publisherNameChange = document.querySelector("#publisherNameChange");
const pagesChange = document.querySelector("#pagesChange");
const countChange = document.querySelector("#countChange");

const tableBook = document.querySelector("#tableBook");

tableBook.addEventListener("click", (event) => {
  chosenTr = event.target.closest("tr");
  thisId = chosenTr.getAttribute("data-id");

  const thisBook = booksArray.find((elem) => elem.id === thisId);

  titleChange.value = thisBook.title;
  authorChange.value = thisBook.author;
  publishingYearChange.value = thisBook.publishingYear;
  publisherNameChange.value = thisBook.publisherName;
  pagesChange.value = thisBook.pages;
  countChange.value = thisBook.count;
});

saveChangesBook.addEventListener("click", async () => {
  const newBook = {
    title: titleChange.value,
    author: authorChange.value,
    publishingYear: publishingYearChange.value,
    publisherName: publisherNameChange.value,
    pages: pagesChange.value,
    count: countChange.value,
  };

  const res = await fetch('/books/edit/' + thisId, {
    method:'PUT',
    body:JSON.stringify(newBook),
    headers: {
      "Content-Type": "application/json",
    }
  })
  const data = await res.json();

  tbody_books.innerHTML = ""
  booksArray = data;
  booksArray.forEach((element) => {
    drawRaw(element);
  });
});

deleteBook.addEventListener("click", async () => {
  const res = await fetch('/books/delete/' + thisId, {
    method:'delete'
  })
  const data = await res.json();

  tbody_books.innerHTML = ""
  booksArray = data;
  booksArray.forEach((element) => {
    drawRaw(element);
  });
});

const createTr = (tr, data) => {
  return `
          <th>${data.id}</th>
          <th>${data.title}</th>
          <th>${data.author}</th>
          <th>${data.publishingYear}</th>
          <th>${data.publisherName}</th>
          <th>${data.pages}</th>
          <th>${data.count}</th>
          <th><img src="/images/edit.png" data-bs-toggle="modal" data-bs-target="#exampleModal"></th>
          <th><img src="/images/delete.png" data-bs-toggle="modal" data-bs-target="#exampleModalDelete"></th>
  `;
};

const drawRaw = (dataElement) => {
  let tr = document.createElement("tr");
  tr.innerHTML = createTr(tr, dataElement);
  tr.setAttribute("data-id", dataElement.id);
  tbody_books.appendChild(tr);
};

const getBooks = async () => {
  const res = await fetch("/books/all");
  return res.json();
};

getBooks().then((data) => {
  booksArray = data;
  // booksArray.forEach((element) => {
  //   drawRaw(element);
  // });
});

create_book.addEventListener("click", async (e) => {
  e.preventDefault();
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let publishingYear = document.querySelector("#publishingYear").value;
  let publisherName = document.querySelector("#publisherName").value;
  let pages = document.querySelector("#pages").value;
  let count = document.querySelector("#count").value;
  if (!count) count = 1;
  if (title && author && publishingYear && publisherName && pages) {
    const newBook = {
      title: title,
      author: author,
      publishingYear: publishingYear,
      publisherName: publisherName,
      pages: pages,
      count: count,
    };
    const res = await fetch("/books/create", {
      method: "POST",
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    const data = await res.json();
    console.log('data: ', data);
    tbody_books.innerHTML = ""
    booksArray = data;
    booksArray.forEach((element) => {
      drawRaw(element);
    });
  }
  inputs_create_form.reset();
});

close_book.addEventListener("click", (e) => {
  e.preventDefault();
  inputs_create_form.reset();
});