let myLibrary = [];

function Book(title, author) {
    //constructor function for book objects
    this.title = title
    this.author = author
    this.info = function() {
        return (title + ' was written by ' + author + '.')
    }
}

function addBookToLibrary() {
    //adds the book from the form section to the library
}