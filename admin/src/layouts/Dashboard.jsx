//dashboard.jsx


import React from "react";
import "../CSS/Dashboard.css";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";

function Dashboard() {
  let [totalStudent, setTotalStudent]= useState(0)
  let [totalBook, setTotalBook]= useState(0)
  let [issuedBooks, setIssuedBook]= useState([])

  async function getStudents(){


    try{
      let allstudent= await axios.get('http://localhost:2700/api/getstudents')
  
      setTotalStudent(allstudent.data.data)

       let allbook= await axios.get('http://localhost:2700/api/getAllBooks')
       setTotalBook(allbook.data.data)
       let requestbook= await axios.get('http://localhost:2700/api/requestbook')
       setIssuedBook(requestbook.data.data)

    }catch(err){
       console.log(err)
    }


  }

 useEffect(()=>{
   getStudents()
 },[])

 async function RejectRequest(book){
   getStudents()
  let res= await axios.post('http://localhost:2700/api/reject', {book})

 }
 async function AcceptRequest(book,email){

  console.log(book,email)
  let obj={
    book,
    email
  }

     getStudents()
  let res= await axios.post('http://localhost:2700/api/accept', obj)
      

 }

  return (
    <div className="dashboard-home">

      <h1 style={{color:'white'}}>Library Dashboard</h1>

      {/* Cards */}

      <div className="cards">

        <div className="card blue">
          <h2>{totalStudent.length}</h2>
          <p>Total Students</p>
        </div>

        <div className="card green">
          <h2>{totalBook.length}</h2>
          <p>Total Books</p>
        </div>


        

      </div>

      {/* Request Table */}

      <div className="table-container">

        <h2>Pending Book Requests</h2>

        <table>

          <thead>

            <tr>
              <th>Student</th>
              <th>Book</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

           {issuedBooks.map((obj, ind)=>{
            return  <tr>
              <td>{obj.studentName}</td>
              <td>{obj.bookName}</td>
              <td>{obj.date}</td>
              <td>{obj.status}</td>
              <td>
                <button className="accept" onClick={()=>AcceptRequest(obj.bookName, obj.studentEmail)}>Accept</button>
                <button className="reject" onClick={()=>RejectRequest(obj.bookName)}>Reject</button>
              </td>
            </tr>
           })}

            

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;