import React, { useState } from "react";
import "../CSS/IssueBook.css";
import axios from "axios";
import { useEffect } from "react";

function IssueBook() {
  const [history, setHistory] = useState([])
  async function allissueBooks() {
    try {
      let res = await axios.get("http://localhost:2700/api/issuebooks");
      console.log(res)
      setHistory(res.data.data)
    } catch (err) {}
  }

  useEffect(()=>{
    allissueBooks()
  },[])

  

  const [data, setData] = useState({
    student: "",
    book: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const issueBook = (e) => {
    e.preventDefault();

    const now = new Date();

    const newIssue = {
     
      student: data.student,
      book: data.book,
   
    };

    setHistory([newIssue, ...history]);

    setData({
      student: "",
      book: "",
    });

    alert("Book Issued Successfully");
  };

  return (
    <div className="issue-page">
      <div className="issue-form">
        <h2>Issue Book</h2>

        <form onSubmit={issueBook}>
          <input
            type="text"
            name="student"
            placeholder="Student Name"
            value={data.student}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="book"
            placeholder="Book Name"
            value={data.book}
            onChange={handleChange}
            required
          />

          <button>Issue Book</button>
        </form>
      </div>

      <div className="history">
        <h2>Previous Book Issue History</h2>

        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Book</th>
              <th>Author</th>
              <th>Issue Time</th>
             
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item._id}>
                <td>{item.studentName}</td>
                <td>{item.bookName}</td>
                <td>{item.author}</td>
                <td>{item.date}</td>
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IssueBook;
