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

    removeBook(book) {
        this.books.splice(this.books.indexOf(book), 1);
    }
}

module.exports = Library;
