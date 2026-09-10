import React, { useEffect, useState } from "react";
import "../CSS/History.css";
import axios from "axios";

function History() {
  let [history, setHistory]= useState([])
  async function getHistory() {
    let email = JSON.parse(sessionStorage.getItem("student")).data.email;

    try {
      let res = await axios.get(
        `http://localhost:2700/api/studenthistory?email=${email}`,
      );

      console.log(res.data.data.submit);
      setHistory(res.data.data.submit)
    } catch (err) {}
  }

  useEffect(() => {
    getHistory();
  }, []);

  
  return (
    <div className="history-page">
      <div className="history-header">
        <h2>📜 Borrowing History</h2>
        <p>View all books you have borrowed.</p>
      </div>

      <div className="history-table">
        <table>
          <thead>
            <tr>
        
              <th>Title</th>
              <th>Author</th>
              <th>Issue Date</th>
              <th>Return Date</th>
         
            </tr>
          </thead>

          <tbody>
            {history.map((book) => (
              <tr key={book.id}>
             

                <td>{book.bookName}</td>

                <td>{book.author}</td>

                <td>{book.issueDate}</td>

                <td>{book.returnDate}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
