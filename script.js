let myLibrary = [];
const submit = document.getElementById('submitBtn');
const form = document.getElementById('bookForm');
const library = document.getElementById('library');

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

Book.prototype.info = function() {
        return (this.title + ' was written by ' + this.author + '. It has ' + this.pages + 
            ' pages, and ' + isRead(this) + '.')
}
submit.addEventListener('click', function() {
    addBookToLibrary();
    form.reset();
})
function addBookToLibrary() {
    //adds the book from the form section to the library
    let bookData = new FormData(form);
    let bookObject = Object.fromEntries(bookData.entries());
    if(bookObject.title && bookObject.author && bookObject.pages) {
        let myBook = new Book(bookObject.title, bookObject.author, bookObject.pages, bookObject.read);
        myLibrary.push(myBook)
        displayBooks();

    }else {
        alert('Please provide a Title, Author, and the number of Pages')
    }
}

const displayBooks = function() {
    library.textContent = '';
    for (i = 0; i < myLibrary.length; i ++) {
        let bookDisplay = document.createElement('div');
        bookDisplay.className = 'bookDisplay';
        bookDisplay.setAttribute = ('data-position', i);
        bookDisplay.textContent = (myLibrary[i].info());
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.textContent = 'delete';
        deleteBtn.setAttribute('data-position', i)
        deleteBtn.addEventListener('click', function() {
            for (i = 0; i < myLibrary.length; i ++) {
                let libraryNode = document.querySelectorAll('.bookDisplay');
                console.log(this);
                if(libraryNode[i].getAttribute('data-position') == this.getAttribute('data-position')) {
                    let target = libraryNode[i];
                    target.remove();

                }
            }
        })
        bookDisplay.appendChild(deleteBtn);
        library.appendChild(bookDisplay);
    }
}
//A test book for the library
const testBook = new Book('test book', 'anonymous', 1000,)
