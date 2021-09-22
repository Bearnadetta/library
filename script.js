// Global variables based on DOM elements
let myLibrary = [];
const submit = document.getElementById('submitBtn');
const form = document.getElementById('bookForm');
const library = document.getElementById('library');
// Function checks to see if entry has been read, and returns result
const isRead = function(e) {
    if(e.read === true || e.read === 'on') {
        return 'I have already read it'
    }else {
        return 'I have not gotten around to reading it yet'
    }
}
function Book(title, author, pages, read) {
    //constructor function for book objects
    this.title = title
    this.author = author
    this.pages = pages 
    this.read = read
}
// Book prototype that returns information for display
Book.prototype.info = function() {
        return (this.title + ' was written by ' + this.author + '. It has ' + this.pages + 
            ' pages, and ' + isRead(this) + '.')
}
// Book prototype that toggles the 'read' property 
Book.prototype.toggleRead = function() {
    if (this.read == true || this.read == 'on'){
        this.read = false;
    } else if (this.read == false ||this.read == undefined){
        this.read = true;
    }
    displayBooks();    // updates the display with current read values
}
// when the submit button is clicked, runs the addBookToLibrary function and resets form
submit.addEventListener('click', function() {
    addBookToLibrary();
    form.reset();
});
function addBookToLibrary() {
    //adds the book from the form section to the library
    let bookData = new FormData(form);
    let bookObject = Object.fromEntries(bookData.entries());
    if(bookObject.title && bookObject.author && bookObject.pages && !isNaN(bookObject.pages)) {
        let myBook = new Book(bookObject.title, bookObject.author, bookObject.pages, bookObject.read);
        myLibrary.push(myBook)
        displayBooks();

    }else {
        alert('Please provide a Title, Author, and the number of Pages')
    }
}
//saves library to local storage
const storeLibrary = function() {
    let jsonLibrary = JSON.stringify(myLibrary);
    localStorage.setItem('jsonLibrary', jsonLibrary);
    }
//loads library and sets myLibrary to an array of book objects
const loadLibrary = function() {
    let pulledObjs = JSON.parse(localStorage.getItem('jsonLibrary'));
    for (i = 0; i < pulledObjs.length; i++) {
        let bookObject = new Book(pulledObjs[i].title, pulledObjs[i].author, pulledObjs[i].pages, pulledObjs[i].read);
        myLibrary.push(bookObject);
    }
    displayBooks();
}
// displays each book object on it's own div within the library display, each with a button
//that will either delete the book's div or toggle the book's read status
const displayBooks = function() {
    library.textContent = '';
    for (i = 0; i < myLibrary.length; i ++) {
        let bookDisplay = document.createElement('div');
        let bookDisplayText = document.createElement('div')
        bookDisplay.className = 'bookDisplay';
        bookDisplay.setAttribute('data-position', i);
        bookDisplayText.textContent = (myLibrary[i].info());
        bookDisplayText.className = 'displayText';
        bookDisplayText.setAttribute('data-position', i);
        let br = document.createElement('br');
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.textContent = 'Remove';
        deleteBtn.setAttribute('data-position', i)
        deleteBtn.addEventListener('click', function() {
            for (i = 0; i < myLibrary.length; i ++) {
                let libraryNode = document.querySelectorAll('.bookDisplay');
                if(libraryNode[i].getAttribute('data-position') == this.getAttribute('data-position')) {
                    let target = libraryNode[i];
                    target.remove();
                    removed = (myLibrary.splice(i, 1));
                    storeLibrary();
                }
            }
        })
        let readBtn = document.createElement('button')
        readBtn.className = 'readBtn';
        readBtn.textContent = 'Read?';
        readBtn.setAttribute('data-position', i)
        readBtn.addEventListener('click', function() {
            let j = (this.getAttribute('data-position'));
            myLibrary[j].toggleRead();

        })
        bookDisplay.appendChild(bookDisplayText)
        bookDisplay.appendChild(br)
        bookDisplay.appendChild(deleteBtn);
        bookDisplay.appendChild(br)
        bookDisplay.appendChild(readBtn)
        library.appendChild(bookDisplay);
        storeLibrary();
    }
}
// on window load, checks for local json library to pull data from local storage
window.addEventListener('load', function() {
    if(localStorage.getItem('jsonLibrary') == '[]' || localStorage.getItem('jsonLibrary') == null) {

    } else {
        loadLibrary();
    }
})

//TODO: Refactor using class instead of plain constructors
