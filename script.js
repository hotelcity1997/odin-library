let myLibrary = [];
const submitButton = document.getElementById('submit-book-btn');
const table = document.getElementById('book-list');

submitButton.addEventListener('click', addBook); 



function Book(title, author, pageCount, isRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;
}

Book.prototype.info = function() {
  if (this.isRead === true) {
    return `${this.title} by ${this.author}, ${this.pageCount} pages, has been read.`;
  } else {
    return `${this.title} by ${this.author}, ${this.pageCount} pages, has not been read.`;
  }
}

function addBook(title, author, pageCount, isRead) {
  title = document.getElementById('title').value;
  author = document.getElementById('author').value;
  pageCount = document.getElementById('page-count').value;
  isRead = document.getElementById('is-read').checked;

  
  const newBook = new Book(title, author, pageCount, isRead);
  console.log(newBook.info());
  myLibrary.push(newBook);

  refresh();
}

function refresh() {
  let tableContent = document.getElementsByTagName('tbody')[0];
  while (tableContent.firstChild) {
    tableContent.removeChild(tableContent.firstChild);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    let row = table.getElementsByTagName('tbody')[0].insertRow();
    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    row.id = table.rows.length - 2;
  
    cell1.textContent = myLibrary[i].title;
    cell2.textContent = myLibrary[i].author;
  }
}

function updateLibrary() {
  myLibrary.forEach(function(Book) {
  console.log(Book);
  });
}

function removeBook(bookIndex) {
  myLibrary.splice(bookIndex, 1);
  table.getElementsByTagName('tbody')[0].deleteRow(bookIndex);
  refresh();
}
