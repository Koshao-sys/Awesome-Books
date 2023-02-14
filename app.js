let books = [];
const addBtn = document.getElementById('add-books');

function displayBooks() {
  const bookListContainer = document.querySelector('.books-col');
  bookListContainer.innerHTML = '';
  books.forEach((book) => {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('class', 'book-item');
    bookItem.innerHTML = `
      <p class="book-title">${book.title}</p>
      <p class="book-author">${book.author}</p>
      <button class="remove-button">Remove</button>
    `;
    bookListContainer.appendChild(bookItem);
  });
}

function removeBook(title) {
  books = books.filter((book) => book.title !== title);
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
  /* eslint-disable */
  addRemoveListeners();
  /* eslint-enable */
}

function addRemoveListeners() {
  const removeBtn = document.querySelectorAll('.book-item');
  for (let i = 0; i < removeBtn.length; i += 1) {
    removeBtn[i].addEventListener('click', () => {
      const tt = document.querySelectorAll('.book-title');
      removeBook(tt[i].textContent);
    });
  }
}

function addBook(title, author) {
  books.push({ title, author });
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}

addBtn.addEventListener('click', () => {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  addBook(title.value, author.value);
});

if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
  displayBooks();
}