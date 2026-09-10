import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import "../CSS/AdminLogin.css"

function AdminLogin() {
    let navigate= useNavigate()

    let [adminData, setAdminData]= useState({
        email:"",
        password:""
    })

    let admin= import.meta.env.VITE_ADMIN_ID  
    let password= import.meta.env.VITE_ADMIN_PASSWORD  

    function handleInput(e){

        setAdminData({
            ...adminData,
            [e.target.name]: e.target.value.trim() 
        })
        
    }

    function handleForm(e){
        e.preventDefault()

        if(admin== adminData.email && password==adminData.password){
            toast.success("Admin Login Success")
            // navigate("admindashboard")
            window.location.replace('admindashboard')
            
        }
        else{
            toast.error("Invalid Credential !")
        }


    }

  return (
   
    <div className="container">
    <form className="login-form" onSubmit={handleForm}>
        <h2>ADMIN LOGIN</h2>
        <p>Welcome Back! Please login to continue.</p>

        <div className="input-box">
            <input type="email" placeholder="Enter Email ID" required  name='email' value={adminData.email} onChange={handleInput}/>
        </div>

        <div className="input-box">
            <input type="password" placeholder="Enter Password" required name='password' value={adminData.password} onChange={handleInput} />
        </div>

        <button type="submit">LOGIN</button>
    </form>
</div>

  )
}

export default AdminLogin