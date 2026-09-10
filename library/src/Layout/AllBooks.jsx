import React, { useEffect, useState } from "react";
import "../CSS/AllBooks.css";
import axios from "axios";
import {toast} from 'react-toastify'

function AllBooks() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("student")),
  );

  let [totalStudent, setTotalStudent] = useState(0);
  let [totalBook, setTotalBook] = useState([]);

  async function getStudents() {
    try {
      let allstudent = await axios.get("http://localhost:2700/api/getstudents");

      setTotalStudent(allstudent.data.data);

      let allbook = await axios.get("http://localhost:2700/api/getAllBooks");
      setTotalBook(allbook.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getStudents();
  }, []);

  const categories = [
    "All",
    ...new Set(totalBook.map((book) => book.category)),
  ];

  const books = totalBook.filter((book) => {
    const matchSearch =
      book.name.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    return matchSearch;
  });

  const requestBook = async (book) => {
    let data = {
      studentName: user.data.name,
      studentEmail: user.data.email,
      bookName: book.name,
      date: new Date().toLocaleString(),
      status: "pending",
    };

    try{

      let res= await axios.post('http://localhost:2700/api/requestbook', data)

      toast.success(res.data.message)
      getStudents();

    }catch(err){
        toast.error("Something error")
    }

    console.log(data);

    console.log(book);
    // alert(`Issue request sent for "${book.name}"`);
  };

  console.log(books);

  return (
    <div className="books-page">
      <div className="books-header">
        <h2>📚 Library Books</h2>

        <div className="filters">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="book-container">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.photo} alt={book.title} />

            <div className="book-content">
              <h3>{book.name}</h3>

              <p>
                <b>Author:</b> {book.author}
              </p>

              {book.available ? (
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                  }}
                >
                  available
                </button>
              ) : (
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                  }}
                >
                 
                  not available
                </button>
              )}

              <p className="description">{book.description}</p>

              <div className="buttons">
        
                <button
                  className="request-btn"
                  disabled={book.available === false}
                  onClick={() => requestBook(book)}
                >
                  {book.available === true ?   "Request Issue" : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllBooks;
