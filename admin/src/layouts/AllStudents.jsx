//AllStudents.jsx

import React, { useState } from "react";
import "../CSS/AllStudents.css";
import { useEffect } from "react";
import axios from "axios"

function AllStudents() {

  const [search, setSearch] = useState("");

    let [totalStudent, setTotalStudent]= useState([])

  async function getStudents(){


    try{
      let res= await axios.get('http://localhost:2700/api/getstudents')
      console.log(res)
      setTotalStudent(res.data.data)
    }catch(err){
       console.log(err)
    }


  }

 useEffect(()=>{
   getStudents()
 },[])

 
  const filteredStudents = totalStudent.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    student.regd_no.toString().includes(search)
  );

  return (
    <div className="students-page">

      <div className="header">

        <h2>👨‍🎓 All Students</h2>

        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>

      <div className="table-container">

        <table>

          <thead>

            <tr>
          
              <th>Student</th>
              <th>Registration No</th>
              <th>Email</th>
              <th>Password</th>
              <th>Mobile</th>
              <th>DOB</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredStudents.map(student=>(
              <tr key={student.id}>

             

                <td>{student.name}</td>

                <td>{student.regd_no}</td>

    

                <td>{student.email}</td>
                <td>{student.password}</td>

                <td>{student.mobile}</td>
                <td>{student.dob}</td>

            

                <td>

                  <button className="view">
                    View
                  </button>

                  {/* <button className="edit">
                    Edit
                  </button>

                  <button className="delete">
                    Delete
                  </button> */}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AllStudents;