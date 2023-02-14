let books = [];
const addBtn = document.getElementById('add-books');

function displayBooks() {
  const bookListContainer = document.querySelector('.books-col');
  bookListContainer.innerHTML = '';
  for (let k = 0; k < books.length; k += 1) {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('class', 'book-item');
    bookItem.innerHTML = `
      <p class="book-title">${books[k].title}</p>
      <p class="book-author">${books[k].author}</p>
      <button class="remove-button${k}">Remove</button>
    `;
    bookListContainer.appendChild(bookItem);
  }
  /* eslint-disable */
  addRemoveListeners();
  /* eslint-enable */
}

function removeBook(index) {
  /* eslint-disable */
  books = books.filter((book, ind) => ind != index);
  /* eslint-enable */
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}

function addRemoveListeners() {
  const removeBtn = document.querySelectorAll('.book-item button');
  for (let i = 0; i < removeBtn.length; i += 1) {
    removeBtn[i].addEventListener('click', () => {
      const btnClass = removeBtn[i].className;
      const index = btnClass.replace('remove-button', '');
      removeBook(index);
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