let myLibrary = [];
const submit = document.getElementById('submitBtn');
const form = document.getElementById('bookForm');


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
    
    }else {
        alert('Please provide a Title, Author, and the number of Pages')
    }
    
}
//A test book for the library
const testBook = new Book('test book', 'anonymous', 1000,)
