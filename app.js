/* eslint-disable */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
/* eslint-enable */

class BookCollection {
  constructor() {
    this.books = [];
  }

  addBook(title, author) {
    const newBook = new Book(title, author);
    this.books.push(newBook);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  removeBook(index) {
    /* eslint-disable */
    this.books = this.books.filter((book, ind) => ind != index);
    /* eslint-enable */
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  displayBooks() {
    const bookListContainer = document.querySelector('.books-col');
    bookListContainer.innerHTML = '';
    for (let k = 0; k < this.books.length; k += 1) {
      const bookItem = document.createElement('div');
      bookItem.setAttribute('class', 'book-item');
      bookItem.innerHTML = `
        <span class="tle-author-holder">
          <p class="book-title">${this.books[k].title}</p>
          <span>by</span>
          <p class="book-author">${this.books[k].author}</p>
        </span>
        <button class="remove-button${k}">Remove</button>
      `;
      bookListContainer.appendChild(bookItem);
    }
    this.addRemoveListeners();
  }

  addRemoveListeners() {
    const removeBtn = document.querySelectorAll('.book-item button');
    for (let i = 0; i < removeBtn.length; i += 1) {
      removeBtn[i].addEventListener('click', () => {
        const btnClass = removeBtn[i].className;
        const index = btnClass.replace('remove-button', '');
        this.removeBook(index);
      });
    }
  }

  showDiv(index, id) {
    document.getElementById('div1').style.display = 'none';
    document.getElementById('div2').style.display = 'none';
    document.getElementById('div3').style.display = 'none';
    document.getElementById('link1').classList.remove('active');
    document.getElementById('link2').classList.remove('active');
    document.getElementById('link3').classList.remove('active');
    
    id.classList.add('active');
    document.getElementById(index).style.display = 'block';
  }
}

const addBtn = document.getElementById('add-books');
const bookCollection = new BookCollection();

addBtn.addEventListener('click', () => {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  bookCollection.addBook(title.value, author.value);
  title.value = '';
  author.value = '';
});

if (localStorage.getItem('books')) {
  bookCollection.books = JSON.parse(localStorage.getItem('books'));
  bookCollection.displayBooks();
}

/* Date and time */

const today = new Date();
const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
const formattedDate = today.toLocaleDateString('en-US', options);
document.getElementById("datetime").innerHTML = formattedDate;

/* Menu Control */

const links = document.querySelectorAll('.nav-menu a');
for (let n = 0; n < links.length; n += 1) {
  links[n].addEventListener('click', (e) => {
    e.preventDefault();
    const href = links[n].getAttribute('href');
    bookCollection.showDiv(href.replace('#', ''), links[n]);
  })
}
