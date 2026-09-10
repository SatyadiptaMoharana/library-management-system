import { useState } from "react";
import "../CSS/StudentLogin.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"

function StudentLogin() {
  const [showPassword, setShowPassword] = useState(false);

  let [student, setStudent] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  function handleInput(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value.trim(),
    });
  }

 async function handleForm(e) {
    e.preventDefault();

  try{
     let res= await axios.post('http://localhost:2700/api/studentlogin', student)

     if(res.data.success){
      toast.success(res.data.message)
      sessionStorage.setItem('student', JSON.stringify(res.data))

      navigate('/dashboardhome')

     }
     else{
      toast.error("Invalid Credential")
     }
  }
  catch(err){
      toast.error(err.message)
  }

  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">🎓</div>

        <h2>Student Login</h2>
        <p className="subtitle">Login to access your Library Dashboard</p>

        <form onSubmit={handleForm}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleInput}
              value={student.email}
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                onChange={handleInput}
                value={student.password}
              />

              <button
                type="button"
                className="showbtn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="login-options">
            <NavLink to="/forgotpassword">Forgot Password?</NavLink>
          </div>

          <button className="login-btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
