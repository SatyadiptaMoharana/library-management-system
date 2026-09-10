import React from "react";
import { Outlet, NavLink ,useNavigate} from "react-router-dom";
import "../CSS/AdminDashboard.css";

function AdminDashboard() {
  let navigate= useNavigate()
  return (
    <div className="dashboard">

      <aside className="sidebar">

        <div className="logo">
          <h2>📚 Library Admin</h2>
        </div>

        <nav>

          <NavLink to="" end>
            Dashboard
          </NavLink>

          <NavLink to="allbooks">
            All Books
          </NavLink>
          <NavLink to="allstudents">
            All Students
          </NavLink>

          <NavLink to="addstudent">
            Add Student
          </NavLink>

          <NavLink to="removestudent">
            Remove Student
          </NavLink>

          <NavLink to="addbook">
            Add Book
          </NavLink>

          <NavLink to="removebook">
            Remove Book
          </NavLink>

          <NavLink to="issuebook">
            Issue Book
          </NavLink>

          <NavLink to="submitbook">
            Submit Book
          </NavLink>
          

        </nav>
         <button className="logout-btn" onClick={()=>navigate('/')}>
          🚪 Logout
        </button>

      </aside>

      <main className="content">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminDashboard;