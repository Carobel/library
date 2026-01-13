const library = [];

// book constructor
function Book(title, author, pages, read, id) {
    // throw error when constructor is called as function (without new keyword)
    if (!new.target) {
        throw Error('Do not call this constructor without the new keyword.')
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

// toggle a book's read status
Book.prototype.toggle = function() {
    this.toggle = !this.toggle;
}

// create book and adds it to the library array
function addBook(title, author, pages, read) {
    const id = crypto.randomUUID();
    const book = new Book(title, author, pages, read, id);

    library.push(book);
}

// delete book by id number
function deleteBook(bookId){
    //throw error if book by this id does not exist
    const target = library.findIndex(book => book.id == bookId);
    if (target === -1) {
        throw Error('Book not found.')
    }
    //need to +1 because slice starts counting from 1 instead of 0
    library.slice(target+1);

}

