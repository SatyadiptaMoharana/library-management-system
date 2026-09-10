import React, { useEffect, useState } from "react";
import "../CSS/Dashboard.css";
import axios from 'axios'

function Dashboard() {
  let [student, setStudent] = useState(null);
  let [totalStudent, setTotalStudent] = useState(0);
  let [totalBook, setTotalBook] = useState(0);

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

  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("student"));
    console.log(data);
    setStudent(data);
  }, []);

  const issuedBooks = [
    {
      id: 1,
      name: "React JS Complete Guide",
      issueDate: "20 Jul 2026",
      dueDate: "30 Jul 2026",
      status: "Issued",
    },
    {
      id: 2,
      name: "Node.js Mastery",
      issueDate: "18 Jul 2026",
      dueDate: "28 Jul 2026",
      status: "Returned",
    },
    {
      id: 3,
      name: "MongoDB Basics",
      issueDate: "22 Jul 2026",
      dueDate: "01 Aug 2026",
      status: "Issued",
    },
  ];

  return (
    <div className="dashboard">
      <div className="welcome-card">
        <div>
          <h2>Welcome Back 👋</h2>
          {student && student.data.name}
        </div>

        <div>
          <h3>{new Date().toDateString()}</h3>
        </div>
      </div>

      {/* Statistics */}

      <div className="stats">
        <div className="card blue">
          <h2>{totalBook.length}</h2>
          <p>Available Books</p>
        </div>

      </div>

      <div className="dashboard-grid">
        {/* Profile */}

        <div className="profile-card">
          <h3> {student && student.data.name}</h3>

          <hr />

          <p>
            <strong>Student ID:</strong> {student && student.data.regd_no}
          </p>
          <p>
            <strong>Email:</strong> {student && student.data.email}
          </p>
          <p>
            <strong>Mobile:</strong> {student && student.data.mobile}
          </p>
        </div>

        {/* Notice */}

        <div className="notice-card">
          <h3>Latest Notices</h3>

          <ul>
            <li>📢 Library will remain closed on Sunday.</li>
            <li>📚 New MERN Stack books added.</li>
            <li>📝 Return books before due date.</li>
            <li>🎓 Digital Library available now.</li>
          </ul>
        </div>
      </div>

      {/* Issued Books */}

      <div className="table-card">
        <h2>Recently Issued Books</h2>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Issue Date</th>
              
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {totalBook && totalBook.toReversed().map((book,ind) => (
              <tr key={ind+1}>
                <td>#{ind+1}</td>
                <td>{book.name}</td>
                <td>{new Date(book.createdAt).toDateString()}</td>
                <td>
                  <span
                    className={
                      book.available === true 
                        ? "status issued"
                        : "status returned"
                    }
                  >
                    {book.available ? 'available':'not available'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
