const new_visitor = document.querySelector("#newVisitor");
const create_visitor = document.querySelector("#createVisitor");
const close_visitor = document.querySelector("#closeVisitor");
const inputs_create_visitors_form = document.querySelector("#inputsCreateVisitors");
const tbody_visitors = document.querySelector("#tbodyVisitors");
const inputs_edit_visitors_form = document.querySelector("#inputsChangeVisitors");
const search = document.querySelector("#visitorSearchBy");
const sort = document.querySelector("#visitorSortBy");
const select = document.querySelector("select");
const options = document.querySelectorAll("option");

let chosenTr;
let thisId;

let localData = localStorage.getItem("visitors");
let visitorsArray = [];
const save_edit_visitor = document.querySelector("#saveChangesVisitor");
const closeChangeBook = document.querySelector("#closeChangesVisitor");

const nameChange = document.querySelector("#nameChange");
const phoneChange = document.querySelector("#phoneChange");


const tableVisitor = document.querySelector("#tableVisitor");

const getVisitors = async () => {
  const res = await fetch('/visitors/all');
  return res.json();
};

tableVisitor.addEventListener("click", (event) => {
  chosenTr = event.target.closest("tr");
  thisId = chosenTr.getAttribute("data-id");

  const thisBook = booksArray.find((elem) => elem._id === thisId);

  nameChange.value = thisBook.name;
  phoneChange.value = thisBook.phone;
});

sort.addEventListener("click", () => {
  console.log(select.value);
  if (select.value == "id") {
    tbody_visitors.innerHTML = "";
    visitorsArray.forEach((el) => {
      tbody_visitors.innerHTML += `
            <tr>
              <th>${el.id}</th>
              <th>${el.name}</th>
              <th>${el.phone}</th>
              <th><img src="/images/edit.png" data-id=${el.id} data-bs-toggle="modal" data-bs-target="#changeVisitorModal"></th>
            </tr>
            `;
    });
  } else if (select.value == "name") {
    let visitorsSortName = [...visitorsArray];
    console.log(visitorsSortName);
    visitorsSortName.sort((a, b) => a.name > b.name ? 1 : -1);
    tbody_visitors.innerHTML = "";
    visitorsSortName.forEach((el) => {
      tbody_visitors.innerHTML += `
            <tr>
              <th>${el.id}</th>
              <th>${el.name}</th>
              <th>${el.phone}</th>
              <th><img src="/images/edit.png" data-id=${el.id} data-bs-toggle="modal" data-bs-target="#changeVisitorModal"></th>
            </tr>
            `;
    });
  }
});

search.addEventListener("click", (e) => {
  e.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  let table = document.querySelector("#tableVisitor");
  const btn = document.createElement("button");
  btn.textContent = "Убрать поиск";
  btn.classList.add("removeSearch");
  search.after(btn);
  search.setAttribute("disabled", "disabled");
  let regPhrase = new RegExp(searchInput.value, 'i');
  let flag = false;
  for (let i = 1; i < table.rows.length; i++) {
    flag = false;
    for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
      flag = regPhrase.test(table.rows[i].cells[j].textContent);
      console.log(flag);
      if (flag) break;
    }
    if (flag) {
      table.rows[i].style.display = "";
    } else {
      table.rows[i].style.display = "none";
    }
  }
  console.log(visitorsArray);
  btn.addEventListener("click", () => {
    console.log("new btn");
    search.removeAttribute("disabled");
    btn.remove();
    let index = 1;
    tbody_visitors.innerHTML = "";
    visitorsArray.forEach((el) => {
      tbody_visitors.innerHTML += `
            <tr>
              <th>${index}</th>
              <th>${el.name}</th>
              <th>${el.phone}</th>
              <th><img src="/images/edit.png" data-id=${index} data-bs-toggle="modal" data-bs-target="#changeVisitorModal"></th>
            </tr>
            `;
      index++;
    });
    searchInput.value = "";
  });
});

save_edit_visitor.addEventListener("click", async () => {
  const newVisitor = {
    name: nameChange.value,
    phone: phoneChange.value,
  };

  await fetch('/visitors/edit/' + thisId, {
    method:'PUT',
    body:JSON.stringify(newVisitor),
    headers: {
      "Content-Type": "application/json",
    }
  })
  const data = await getVisitors();

  tbody_visitors.innerHTML = ""
  visitorsArray = data;
  visitorsArray.forEach((element) => {
    drawRaw(element);
  });
});

getVisitors().then((data) => {
  booksArray = data;
});

const createTr = (data) => {
  return `
          <th>${data._id}</th>
          <th>${data.name}</th>
          <th>${data.phone}</th>
          <th><img src="/images/edit.png" data-bs-toggle="modal" data-bs-target="#changeVisitorModal"></th>
  `;
};

const drawRaw = (dataElement) => {
  let tr = document.createElement("tr");
  tr.innerHTML = createTr(dataElement);
  tr.setAttribute("data-id", dataElement._id);
  tbody_visitors.appendChild(tr);
};

visitorsArray.forEach((element) => {
  drawRaw(element);
});

create_visitor.addEventListener("click", async (e) => {
  e.preventDefault();
  let name = document.querySelector("#name").value;
  let phone = document.querySelector("#phone").value;
  if (name && phone) {
    const newVisitor = {
      name: name,
      phone: phone
    };
    await fetch("/visitors/create", {
      method: "POST",
      body: JSON.stringify(newVisitor),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await getVisitors();
    tbody_visitors.innerHTML = ""
    visitorsArray= data;
    visitorsArray.forEach((element) => {
      drawRaw(element);
    });
  }
  inputs_create_visitors_form.reset();
});
close_visitor.addEventListener("click", (e) => {
  e.preventDefault();
  inputs_create_visitors_form.reset();
});