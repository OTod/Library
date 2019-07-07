class Library {
    constructor() {
        this.books = [
            {
                id: 1,
                name: 'Alice in Wonderland',
                author: 'Lewis Carrol',
                publisher: 'Macmillan',
                quantity: 1,
                price: 100,
                pagesCount: 217,
                publishingYear: 1865,
            },
            {
                id: 2,
                name: 'Through the looking glass',
                author: 'Lewis Carrol',
                publisher: 'Macmillan',
                quantity: 1,
                price: 100,
                pagesCount: 194,
                publishingYear: 1871,
            },
            {
                id: 3,
                name: 'Through the looking glass',
                author: 'Lewis Carrol',
                publisher: 'Macmillan',
                quantity: 1,
                price: 100,
                pagesCount: 194,
                publishingYear: 1871,
            },
            {
                id: 4,
                name: 'Through the looking glass',
                author: 'Lewis Carrol',
                publisher: 'Macmillan',
                quantity: 1,
                price: 100,
                pagesCount: 194,
                publishingYear: 1871,
            },
            {
                id: 5,
                name: 'Through the looking glass',
                author: 'Lewis Carrol',
                publisher: 'Macmillan',
                quantity: 1,
                price: 100,
                pagesCount: 194,
                publishingYear: 1871,
            },
            {
                id: 6,
                name: 'Through the looking glass',
                author: 'Lewis Carrol',
                publisher: 'Macmillan',
                quantity: 1,
                price: 100,
                pagesCount: 194,
                publishingYear: 1871,
            },
            {
                id: 7,
                name: 'Through the looking glass',
                author: 'Lewis Carrol',
                publisher: 'Macmillan',
                quantity: 1,
                price: 100,
                pagesCount: 194,
                publishingYear: 1871,
            },
        ];

    }

    getBooks() {
        return this.books;
    }

    addNewBook(book) {
        this.books.push(book);
    }

    update(id, updateInfo) {
        let book = this.books.find((item) => {
            return item.id === id
        });
        let updatedBook = {...book, ...updateInfo };
        this.books[this.books.indexOf(book)] = updatedBook;
    }

    removeBooks(bookIds) {
        bookIds.forEach(element => {
            this.books = this.books.filter(book => book.id !== parseInt(element))
        });
    }
}

module.exports = Library;
