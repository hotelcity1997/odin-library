let myLibrary = [];

const submitButton = document.getElementById('submit-book-btn');
submitButton.addEventListener('click', addBook); 

const table = document.getElementById('book-list');

class Book {
  constructor(title, author, pageCount, isRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
  }
  info() {
    if (this.isRead === true) {
      return `${this.title} by ${this.author}, ${this.pageCount} pages, has been read.`;
    } else {
      return `${this.title} by ${this.author}, ${this.pageCount} pages, has not been read.`;
    }
  }
}

// function Book(title, author, pageCount, isRead) {
//   this.title = title;
//   this.author = author;
//   this.pageCount = pageCount;
//   this.isRead = isRead;
// }

// Book.prototype.info = function() {
//   if (this.isRead === true) {
//     return `${this.title} by ${this.author}, ${this.pageCount} pages, has been read.`;
//   } else {
//     return `${this.title} by ${this.author}, ${this.pageCount} pages, has not been read.`;
//   }
// }

let isRead = document.getElementById('is-read');

let readFormCheckbox = document.createElement('input');
readFormCheckbox.setAttribute('type', 'checkbox');

let delButton = document.createElement('button');
delButton.setAttribute('type', 'button');


function addBook(title, author, pageCount, isRead) {
  title = document.getElementById('title').value;
  author = document.getElementById('author').value;
  pageCount = document.getElementById('page-count').value;
  isRead = document.getElementById('is-read').checked;

  if (isRead.checked === true) readFormCheckbox.checked = true;
  
  const newBook = new Book(title, author, pageCount, isRead);
  myLibrary.push(newBook);

  refresh();
}

let readCheckboxes
let delButtons 

function refresh() {
  let tableContent = document.getElementsByTagName('tbody')[0];

  while (tableContent.firstChild) {
    tableContent.removeChild(tableContent.firstChild);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    let row = table.getElementsByTagName('tbody')[0].insertRow();
    let titleCell = row.insertCell();
    let authorCell = row.insertCell();
    let pageCountCell = row.insertCell();
    let readCell = row.insertCell();
    let delBtnCell = row.insertCell();

    let readCheckboxClone = readFormCheckbox.cloneNode();
    let delBtnClone = delButton.cloneNode();

    row.id = table.rows.length - 2;
    readCheckboxClone.setAttribute('data-index', (table.rows.length - 2));
    delBtnClone.setAttribute('data-btn-index', (table.rows.length - 2));
  
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pageCountCell.textContent = myLibrary[i].pageCount;
    readCell.appendChild(readCheckboxClone);
    delBtnCell.appendChild(delBtnClone);

    let xIcon = document.createElement('i')
    xIcon.setAttribute('class', 'fa-solid fa-xmark')
    delBtnClone.appendChild(xIcon);

    if (myLibrary[i].isRead === true) readCheckboxClone.checked = true;
    else readCheckboxClone.checked = false;
    
    readCheckboxes = document.querySelectorAll("[data-index]");
    delButtons = document.querySelectorAll("[data-btn-index]");

    delButtons[i].addEventListener('click', deleteBook);

    loadCheckboxListener();
  }
}

function loadCheckboxListener() {
  for (let i = 0; i < myLibrary.length; i++) {
    readCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('click', () => {
        if (readCheckboxes[i].checked === true) myLibrary[i].isRead = true
        else myLibrary[i].isRead = false
      })
    })
  }
}

function deleteBook() {
  myLibrary.splice([this.dataset.btnIndex], 1);
  table.getElementsByTagName('tbody')[0].deleteRow([this.dataset.btnIndex]);
  refresh();
}


















function populate(title, author, pageCount, isRead) {
  if (isRead === true) readFormCheckbox.checked = true;
  else readFormCheckbox.checked = false

  const newBook = new Book(title, author, pageCount, isRead);
  console.log(newBook.info());
  myLibrary.push(newBook);

  refresh();
}

populate('The Hobbit', 'J.R.R. Tolkien', 304, false);
populate('Blood Meridian', 'Cormac McCarthy', 337, true);
populate('Factotum', 'Charles Bukowski', 208, true);
populate('Fight Club', 'Chuck Palahniuk', 208, false);
populate('The Call of the Wild', 'Jack London', 232, true);
