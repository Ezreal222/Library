document.addEventListener("DOMContentLoaded", main);

function main() {
    displayLibrary();
    const newBookBtn = document.querySelector("#newBookBtn");
    newBookBtn.addEventListener("click", handleNewBookBtn);
}

function handleStatusBtnClick(e) {
    // Find the closest book-card element
    const bookCard = e.target.closest(".book-card");

    // Get the index of the book-card among its parent element's children
    const bookIndex = Array.from(bookCard.parentElement.children).indexOf(bookCard);

    // Toggle the book's read status
    myLibrary[bookIndex].toggleReadStatus();

    // Update the status button text
    e.target.textContent = myLibrary[bookIndex].status;
}


function addStatusBtnListeners() {
    const statusBtns = document.querySelectorAll(".status-button");
    statusBtns.forEach(btn => {
        btn.addEventListener("click", handleStatusBtnClick);
    });
}

function addRemoveBtnListeners() {
    const removeBookBtns = document.querySelectorAll(".delete");
    removeBookBtns.forEach(btn => {
        btn.addEventListener("click", handleRemoveBookBtn);
    });
}

function handleRemoveBookBtn(e) {
    const bookCard = e.target.closest(".book-card");
    // Get the index of the book-card among its parent element's children
    const bookIndex = Array.from(bookCard.parentElement.children).indexOf(bookCard);
    // Remove the book from the myLibrary array
    myLibrary.splice(bookIndex, 1);

    // Remove the book from the DOM
    e.target.closest(".book-card").remove();
}

function handleNewBookBtn() {
    const newBookFormContainer = document.querySelector("#newBookFormContainer");
    const newBookForm = document.querySelector("#newBookForm");
    newBookFormContainer.classList.toggle("hidden");
    newBookForm.addEventListener("submit", handleSubmitBtn);
}

function handleSubmitBtn(e) {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const status = document.querySelector("#read").value;
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
    newBookFormContainer.classList.toggle("hidden");

    const library = document.querySelector("#libraryContainer");
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    bookDiv.innerHTML = `
        <table>
            <tr>
              <td>${title}</td>
            </tr>
            <tr>
                <td>${author}</td>
            </tr>
            <tr>
                <td>${pages}</td>
            </tr>
            <tr>
                <td><button class="status-button">${status}</button></td>
            </tr>
            <tr>
                <td><button class="delete">delete</button></td>
            </tr>
        </table>
        `;
    library.appendChild(bookDiv);
    addRemoveBtnListeners();
    addStatusBtnListeners();
}

class Book {
    constructor(title, author, pages, status) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.status = status;
    }
    toggleReadStatus() {
        this.status = this.status === "read" ? "unread" : "read";
    }
}

let myLibrary = [
  new Book("To Kill a Mockingbird", "Harper Lee", 281, "read"),
  new Book("Pride and Prejudice", "Jane Austen", 279, "unread"),
  new Book("The Catcher in the Rye", "J.D. Salinger", 277, "read"),
  new Book("1984", "George Orwell", 328, "unread")
];


function addBookToLibrary() {
  // do stuff here
}

// display the library
function displayLibrary() {
    const library = document.querySelector("#libraryContainer");
    myLibrary.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book-card");
        bookDiv.innerHTML = `
            <table>
                <tr>
                  <td>${book.title}</td>
                </tr>
                <tr>
                    <td>${book.author}</td>
                </tr>
                <tr>
                    <td>${book.pages}</td>
                </tr>
                <tr>
                    <td><button class="status-button">${book.status}</button></td>
                </tr>
                <tr>
                    <td><button class="delete">delete</button></td>
                </tr>
            </table>
            `;
        library.appendChild(bookDiv);
        addRemoveBtnListeners();
        addStatusBtnListeners();
    });
}