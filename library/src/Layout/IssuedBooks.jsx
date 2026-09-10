import React, { useEffect, useState } from "react";
import "../CSS/IssuedBooks.css";
import axios from "axios";

function IssuedBooks() {
  let [allBook, setAllBook] = useState([]);

  async function getRequestBook() {
    let email = JSON.parse(sessionStorage.getItem("student")).data.email;

    let res = await axios.get(
      `http://localhost:2700/api/studentrequestbook?email=${email}`,
    );
    console.log(res.data.data.issue);
    setAllBook(res.data.data.issue);
  }


  async function submitBook(book) {
    let email = JSON.parse(sessionStorage.getItem("student")).data.email;
    let obj={
      email,
      book
    }
    try{
      let res= await axios.post('http://localhost:2700/api/submitbook',obj)
    }catch(err){
    }
    getRequestBook()

  }

  useEffect(() => {
    getRequestBook();
  }, []);

  return (
    <div className="issued-page">
      <div className="page-header">
        <h2>📖 My Issued Books</h2>
      </div>

      <div className="issued-grid">
        {allBook.map((book) => (
          <div className="issued-card" key={book.id}>
           

            <div className="issued-info">
              <h3>{book.name}</h3>

              <p>
                <strong>Author:</strong> {book.author}
              </p>

            
              <span
                className={`status ${book.available}`}
              >
                {book.status}
              </span>
               <span>
                status : {!book.available ? 'issue':'pending'}
               </span>
              <div className="actions">
            
                <button className="details" onClick={()=>submitBook(book.name)}>submit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IssuedBooks;
