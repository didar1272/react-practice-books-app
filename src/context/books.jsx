import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({children}) {

    const [books, setBooks] = useState([]);
    
    const fetchBooks = async () => {
        const response = await axios.get("http://localhost:3001/books");
        setBooks(response.data);
    }

    const createBook = async (title) => {
        const response = await axios.post("http://localhost:3001/books", {title});
        const updatedBooks = [...books, response.data]
        // const updatedBooks = [...books, {id: Math.round(Math.random() * 9999), title}];
        setBooks(updatedBooks);
    }

    const editBookById = async (id, newTitle) => {
        const response  = await axios.put(`http://localhost:3001/books/${id}`, {title: newTitle});

        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return {...book, ...response.data};
            }
            return book;
        });
        setBooks(updatedBooks);
    }

    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);
        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        })
        setBooks(updatedBooks);
    }

    const valueToShare = {
        books,
        fetchBooks,
        createBook,
        editBookById,
        deleteBookById
    }

    return <BooksContext.Provider value = {valueToShare}>
        {children}
    </BooksContext.Provider>
}

export { Provider }; // named export - we can have multiple named exports in a file
export default BooksContext;

// we can import them like this: import BooksContext, { Provider } from "./context/books"; 
// - default export can be imported with any name, but named export has to be imported with the same name as it was exported.