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

// add book card to the DOM
function addBookCard(book) {
    // create card and add to card container
    const bookContainer = document.querySelector('#book-container');
    const bookCard = bookContainer.appendChild(document.createElement('div'));
    bookCard.classList.add('book');

    // create card contents
    const cardTitle = bookCard.appendChild(document.createElement('div'));
    cardTitle.classList.add('title');
    cardTitle.textContent = book.title;

    const cardInfo = bookCard.appendChild(document.createElement('ul'));
    cardInfo.classList.add('info');

    const author = cardInfo.appendChild(document.createElement('li'))
    author.textContent = "Author: " + book.author;
    
    const pages = cardInfo.appendChild(document.createElement('li'));
    pages.textContent = "Pages: " + book.pages;
    
    // add bottom bar contents
    const cardBottomBar = bookCard.appendChild(document.createElement('div'));
    cardBottomBar.classList.add('bottom-bar');

    const trashImg = cardBottomBar.appendChild(document.createElement('img'));
    trashImg.src = './bin/trash-can-outline.svg';
    trashImg.classList.add('icon');

}

// add full library to the DOM
function addLibrary() {
    for (let i = 0; i < library.length; i++) {
	    console.log(i)
    }
}

// creates a book and calls functions to add it to the library-list and to the page
function createBook(title, author, pages, read) {
    const book1 = new Book(title, author, pages, read);
    addBook(book1);
    addBookCard(book1);
}

createBook('A Memory Called Empire', 'Arkady Martine', 462, true);
createBook('Ancillary Justice', 'Ann Leckie', 409, true);
createBook('Gideon the Ninth', 'Tamsyn Muir', 448, true)
addLibrary();