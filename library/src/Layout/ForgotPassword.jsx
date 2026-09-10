import React, { useState } from "react";
import "../CSS/ForgotPassword.css";
import { NavLink } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // API Call Here
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="forgot-container">

      <div className="forgot-card">

        <div className="icon">
          🔒
        </div>

        <h2>Forgot Password?</h2>

        <p>
          Enter your registered email address.
          We'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">
            Send Reset Link
          </button>

        </form>

        <NavLink to="/">
          ← Back to Login
        </NavLink>

      </div>

    </div>
  );
}

export default ForgotPassword;