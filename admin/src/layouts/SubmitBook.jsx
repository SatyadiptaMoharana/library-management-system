import React, { useState } from "react";
import "../CSS/SubmitBook.css";
import { useEffect } from "react";
import axios from 'axios'

function SubmitBook() {
   const [history, setHistory]= useState([])

    async function allsubmitBooks() {
    try {
      let res = await axios.get("http://localhost:2700/api/submitbooks");
      
      setHistory(res.data.data)
      console.log(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    allsubmitBooks()
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

  const submitBook = (e) => {
    e.preventDefault();

    const now = new Date();

    const newSubmit = {

      student: data.student,
      book: data.book,
 
  
    };

    setHistory([newSubmit, ...history]);

    setData({
      student: "",
      book: "",
    });

    alert("Book Submitted Successfully");
  };

  return (
    <div className="submit-page">

      <div className="submit-form">

        <h2>Submit Book</h2>

        <form onSubmit={submitBook}>

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

          <button>Submit Book</button>

        </form>

      </div>

      <div className="history">

        <h2>Previous Book Submit History</h2>

        <table>

          <thead>
            <tr>
              <th>Student</th>
              <th>Book</th>
              <th>Author</th>
              <th>Submit Time</th>
              
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

export default SubmitBook;