import { useState, useEffect, useContext } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import BooksContext from "./context/books";


function App() {

  const {fetchBooks} = useContext(BooksContext);

  useEffect(() => {
    fetchBooks();
  }, []); // 2nd arg is [] to run only once when the component is first rendered

  return <div className="app">
    <h1>Reading List</h1>
    <BookList />
    <BookCreate />
  </div>
}

export default App;