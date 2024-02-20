DROP TABLE IF EXISTS book;

CREATE TABLE book
(
    -- The id is a int that is the unique identifier for this book.
    id   INT PRIMARY KEY AUTO_INCREMENT,
    -- The name is a short string that describes the book.
    name  VARCHAR(255)   NOT NULL,
    -- The author is the writer of the book
    author VARCHAR(255)   NOT NULL,
    year   DATE   NOT NULL
);
-- mock data for now to put into the database
INSERT INTO book (name, author, year) VALUES ('To Kill a Mockingbird', 'Harper Lee', '1960-01-01');
INSERT INTO book (name, author, year) VALUES ('1984', 'George Orwell', '1949-01-01');
INSERT INTO book (name, author, year) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', '1925-01-01');
INSERT INTO book (name, author, year) VALUES ('Pride and Prejudice', 'Jane Austen', '1813-01-01');
INSERT INTO book (name, author, year) VALUES ('The Catcher in the Rye', 'J.D. Salinger', '1951-01-01');