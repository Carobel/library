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
    this.read = !this.read;
}

// find book index by id number
function findBookIndex(bookId) {
    // throw error if book by this id does not exist
    const targetIndex = library.findIndex(book => book.id == bookId);
    if (targetIndex === -1) {
        throw Error('Book not found.')
    }
    return targetIndex;
}

// create and add book card to the DOM
function addBookCard(book) {
    // create card and add to card container
    const bookContainer = document.querySelector('#book-container');
    const bookCard = bookContainer.appendChild(document.createElement('div'));
    bookCard.classList.add('book');
    bookCard.dataset.id = book.id;

    // create card contents
    const cardTitle = bookCard.appendChild(document.createElement('div'));
    cardTitle.classList.add('title');
    cardTitle.textContent = book.title;

    const cardInfo = bookCard.appendChild(document.createElement('ul'));
    cardInfo.classList.add('info');

    const author = cardInfo.appendChild(document.createElement('li'))
    author.textContent = book.author;
    
    const pages = cardInfo.appendChild(document.createElement('li'));
    pages.textContent = book.pages + ' pages';
    
    // add bottom bar contents
    const cardBottomBar = bookCard.appendChild(document.createElement('div'));
    cardBottomBar.classList.add('bottom-bar');

    const readCheck = cardBottomBar.appendChild(document.createElement('input'));
    readCheck.type = 'checkbox';
    readCheck.checked = book.read;
    readCheck.addEventListener('change', toggleRead);

    const trashImg = cardBottomBar.appendChild(document.createElement('img'));
    trashImg.src = './bin/trash-can-outline.svg';
    trashImg.classList.add('icon');
    trashImg.addEventListener('click', deleteBook);
}

// creates a book and calls functions to add it to the library-list and to the page
function createBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    library.push(book);
    refreshCards();
}

// refrehses book container (in DOM) based on current library
function refreshCards() {
    const bookContainer = document.querySelector('#book-container');
    // delete all
    bookContainer.textContent = '';

    // add cards again based on library
    for (const book of library) {
        addBookCard(book);
    }
}

// handle clicks on a book's delete button
function deleteBook(event) {
    const targetId = event.target.closest('.book').dataset.id;
    const targetIndex = findBookIndex(targetId);
    library.splice(targetIndex, 1);
    refreshCards();
}

// handle clicks on a book's read toggle
function toggleRead(event) {
    targetId = event.target.closest('.book').dataset.id;
    const targetIndex = findBookIndex(targetId);
    library[targetIndex].toggle();
}

// placeholder books
createBook('A Memory Called Empire', 'Arkady Martine', 462, true);
createBook('Ancillary Justice', 'Ann Leckie', 409, true);
createBook('Gideon the Ninth', 'Tamsyn Muir', 448, true);


// ADD BOOK MODAL
// use plus icon to open the add book modal
const modal = document.querySelector('dialog');
const addButton = document.querySelector('.add-book');
const addForm = modal.querySelector('form');
const cancelBtn = modal.querySelector('#cancel-btn');

// show add book modal
addButton.addEventListener('click', () => {
    modal.showModal();
})

// handle cancel button
cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    modal.close();
})

// upon form submission, prevent default and add book to library
addForm.addEventListener('submit', (event) => {
    // create book from form submission
    const title = modal.querySelector('#title');
    const author = modal.querySelector('#author');
    const pages = modal.querySelector('#pages');
    const read = modal.querySelector('#read');
    createBook(title.value, author.value, pages.value, read.checked);

    // empty form
    title.value = '';
    author.value = '';
    pages.value = '';
    event.preventDefault();
    modal.close();
})




