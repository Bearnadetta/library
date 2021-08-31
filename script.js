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
        let bookDisplayText = document.createElement('div')
        bookDisplay.className = 'bookDisplay';
        bookDisplay.setAttribute('data-position', i);
        bookDisplayText.textContent = (myLibrary[i].info());
        bookDisplayText.className = 'displayText';
        bookDisplayText.setAttribute('data-position', i);
        let br = document.createElement('br');
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.textContent = 'delete';
        deleteBtn.setAttribute('data-position', i)
        deleteBtn.addEventListener('click', function() {
            for (i = 0; i < myLibrary.length; i ++) {
                let libraryNode = document.querySelectorAll('.bookDisplay');
                if(libraryNode[i].getAttribute('data-position') == this.getAttribute('data-position')) {
                    let target = libraryNode[i];
                    target.remove();
                    removed = (myLibrary.splice(i, 1));
                }
            }
        })
        let readBtn = document.createElement('button')
        readBtn.className = 'readBtn';
        readBtn.textContent = 'Read?';
        readBtn.setAttribute('data-position', i)
        readBtn.addEventListener('click', function() {
            for (i = 0; i < myLibrary.length; i ++) {
                let libraryNode = document.querySelectorAll('.displayText');
                if(libraryNode[i].getAttribute('data-position') == this.getAttribute('data-position')) {
                    if (myLibrary[i].read == true || myLibrary[i].read == 'on') {
                        myLibrary[i].read = false;
                        libraryNode[i].textContent = (myLibrary[i].info());
                    } else if (myLibrary[i].read == !true || myLibrary[i].read == undefined) {
                        myLibrary[i].read = true;
                        libraryNode[i].textContent = (myLibrary[i].info());
                    }
                }
            }
        })
        bookDisplay.appendChild(bookDisplayText)
        bookDisplay.appendChild(br)
        bookDisplay.appendChild(deleteBtn);
        bookDisplay.appendChild(br)
        bookDisplay.appendChild(readBtn)
        library.appendChild(bookDisplay);
    }
}
//A test book for the library
const testBook = new Book('test book', 'anonymous', 1000,)
