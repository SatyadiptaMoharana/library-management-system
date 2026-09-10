//AllBooks.jsx
import React, { useState } from "react";
import "../CSS/AllBooks.css";
import axios from "axios"
import { useEffect } from "react";


  
function AllBooks() {
  const [search, setSearch] = useState("");
  let [books, setBooks]= useState([])

  async function getAllBooks() {
    
    try{

      let res= await axios.get('http://localhost:2700/api/getAllBooks')

      console.log(res)
      setBooks(res.data.data)

    }catch(err){

    }

  }

useEffect(()=>{
    getAllBooks()
},[])

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="books-page">
      <div className="books-header">
        <h1>📚 Library Books</h1>

        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="book-grid">
        {filteredBooks.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.photo} alt={book.title}  style={{minHeight:'30%'}}/>

            <div className="book-content">
              <span>{book.category}</span>

              <h3>{book.name}</h3>

              <p>Author: {book.author}</p>

              <p
                className={
                  book.available ? "available" : "not-available"
                }
              >
                {book.available ? "Available" : "Issued"}
              </p>

              <button>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllBooks;