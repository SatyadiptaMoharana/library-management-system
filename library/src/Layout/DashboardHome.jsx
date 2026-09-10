import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../CSS/DashboardHome.css";

function DashboardHome() {
let navigate= useNavigate()

  function Logout(){
      navigate('/')
      sessionStorage.removeItem('student')
  }


  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logos">
          📚 <span>Student Panel</span>
        </div>

        <nav>

          <NavLink
            to=""
            end
            className={({ isActive }) =>
              isActive ? "menu active" : "menu"
            }
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="allbooks"
            className={({ isActive }) =>
              isActive ? "menu active" : "menu"
            }
          >
            📚 All Books
          </NavLink>

          <NavLink
            to="issuebooks"
            className={({ isActive }) =>
              isActive ? "menu active" : "menu"
            }
          >
            📖 Issued Books
          </NavLink>

       

          <NavLink
            to="history"
            className={({ isActive }) =>
              isActive ? "menu active" : "menu"
            }
          >
            📜 History
          </NavLink>

     

        
        </nav>

        <button className="logout-btn" onClick={Logout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}

      <main className="content">
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardHome;