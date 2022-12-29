const new_card = document.querySelector("#newCard");
const create_card = document.querySelector("#createCard");
const close_card = document.querySelector("#closeCard");
const inputs_create_cards_form = document.querySelector("#inputsCreateCards");
const tbody_cards = document.querySelector("#tbodyCards");
const search = document.querySelector("#cardSearchBy");
const sort = document.querySelector("#cardSortBy");
const select = document.querySelector("select");
const options = document.querySelectorAll("option");
const returnBook = document.querySelector("#returnBook");
let books = JSON.parse(localStorage.getItem("books"));
let visitors = JSON.parse(localStorage.getItem("visitors"));

let chosenTr;
let thisId;

let cardsArray = [];
const $books = document.querySelector("#books");
const $visitors = document.querySelector("#visitors");

const getOrders = async () => {
  const res = await fetch("/cards/all");
  return res.json();
};

const tableCards = document.querySelector("#tableCards");

let currentBook = undefined;
let chosenBook = undefined;

let currentVisitor = undefined;
let chosenVisitor = undefined;

$books.addEventListener("click", (e) => {
  currentBook?.classList?.remove("active");
  currentBook = e.target.closest(".list_wrapper__value");
  const bookId = currentBook.getAttribute("data-id");

  if (bookId === chosenBook) {
    chosenBook = "";
    currentBook.classList.remove("active");
    return;
  }

  currentBook.classList.add("active");
  chosenBook = bookId;
  console.log(chosenBook);
});

$visitors.addEventListener("click", (e) => {
  currentVisitor?.classList?.remove("active");
  currentVisitor = e.target.closest(".list_wrapper__value");
  const visitorId = currentVisitor.getAttribute("data-id");

  if (visitorId === chosenVisitor) {
    chosenVisitor = "";
    chosenVisitor.classList.remove("active");
    return;
  }

  currentVisitor.classList.add("active");
  chosenVisitor = visitorId;
});

tableCards.addEventListener("click", (event) => {
    chosenTr = event.target.closest("tr");
    thisId = chosenTr.getAttribute("data-id");
    console.log(thisId);
});


search.addEventListener("click", (e) => {
  e.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  let table = document.querySelector("#tableCards");
  const btn = document.createElement("button");
  btn.textContent = "Убрать поиск";
  btn.classList.add("removeSearch");
  search.after(btn);
  search.setAttribute("disabled", "disabled");
  let regPhrase = new RegExp(searchInput.value, "i");
  let flag = false;
  for (let i = 1; i < table.rows.length; i++) {
    flag = false;
    for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
      flag = regPhrase.test(table.rows[i].cells[j].textContent);
      if (flag) break;
    }
    if (flag) {
      table.rows[i].style.display = "";
    } else {
      table.rows[i].style.display = "none";
    }
  }
  btn.addEventListener("click", async () => {
    search.removeAttribute("disabled");
    btn.remove();

    const data = await getOrders();

    tbody_cards.innerHTML = ""
    cardsArray = data;
    cardsArray.forEach((element) => {
      drawRaw(element);
    });
    searchInput.value = "";
  });
});

returnBook.addEventListener("click", async () => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const newOrder = {
    returnDate: today.toLocaleDateString()
  };

  await fetch('/cards/edit/' + thisId, {
    method:'PUT',
    body:JSON.stringify(newOrder),
    headers: {
      "Content-Type": "application/json",
    }
  })
  const data = await getOrders();

  tbody_cards.innerHTML = ""
  cardsArray = data;
  cardsArray.forEach((element) => {
    drawRaw(element);
  });
});

sort.addEventListener("click", async () => {
  if (select.value == "id") {
    const data = await getOrders();
    tbody_cards.innerHTML = ""
    cardsArray = data;
    cardsArray.forEach((element) => {
      drawRaw(element);
    });
  } else if (select.value == "borrow") {
    const data = await getOrders();
    tbody_cards.innerHTML = ""
    cardsArray = data;
    cardsArray.reverse().forEach((element) => {
      drawRaw(element);
    });
  } else if (select.value == "return") {


    const data = await getOrders();
    tbody_cards.innerHTML = ""
    cardsArray = data;
    
    cardsArray.sort(order => order.returnDate ? 1 : -1);
    
    cardsArray.reverse().forEach((element) => {
      drawRaw(element);
    });
  }
});

getOrders().then((data) => {
  cardsArray = data;
});

const createTr = (data) => {
  let checker = data.returnDate ? data.returnDate : `<img src="/images/return.png" data-bs-toggle="modal" data-bs-target="#returnCardModal"></img>`;
  return `
    <th>${data._id}</th>
    <th>${data.visitor.name}</th>
    <th>${data.book.title}</th>
    <th>${data.borrowDate}</th>
    <th>${checker}</th>`;
};

const drawRaw = (dataElement) => {
  let tr = document.createElement("tr");
  tr.innerHTML = createTr(dataElement);
  tr.setAttribute("data-id", dataElement._id);
  tbody_cards.appendChild(tr);
};

create_card.addEventListener("click", async () => {
  const newOrder = {
    book: chosenBook,
    visitor: chosenVisitor
  }

  await fetch("/cards/create", {
    method: "POST",
    body: JSON.stringify(newOrder),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await getOrders();

  tbody_cards.innerHTML = ""
  cardsArray = data;
  cardsArray.forEach((element) => {
    drawRaw(element);
  });

  
  currentVisitor?.classList?.remove("active");
  currentBook?.classList?.remove("active");
  chosenBook = undefined;
  chosenVisitor = undefined;
  currentBook = undefined;
  currentVisitor = undefined;
});