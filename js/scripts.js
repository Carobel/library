const library = [];

// book constructor
function Book(title, author, pages, read) {
    // throw error when constructor is called as function (without new keyword)
    if (!new.target) {
        throw Error('Do not call this constructor without the new keyword.')
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

// toggle a book's read status
Book.prototype.toggle = function() {
    this.toggle = !this.toggle;
}

// add book to the library array
function addBook(book) {
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

// add book card to the web page
function addBookCard(book) {
    // create card
    const bookCard = document.createElement('div');
    bookCard.classList.add('book');

    //add card to card container on page and contents to card
    const bookContainer = document.querySelector('#book-container');
    bookContainer.appendChild(bookCard);

    // create card contents
    const cardTitle = document.createElement('div');
    cardTitle.classList.add('title');
    cardTitle.textContent = book.title;

    const cardInfo = document.createElement('ul'); // todo: change html and css
    cardInfo.classList.add('info');

    const cardBottomBar = document.createElement('div');
    cardBottomBar.classList.add('bottom-bar');



    // todo how to add children of children ? 'nested docking structure'
}

// creates a book and calls functions to add it to the library-list and to the page
function createBook(title, author, pages, read) {
    const book1 = new Book(title, author, pages, read);
    addBook(book1);
    addBookCard(book1);
}

createBook('A Memory Called Empire', 'Arkady Martine', 462, true);