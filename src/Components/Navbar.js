import React from "react";
import { auth } from "../Pages/Config"; // Import the Firebase Authentication SDK
import "../Styles/navbar.css";
import { Link } from "react-router-dom";

function Navbarpage() {
  const logout = () => {
    auth.signOut() // Sign out the user using the Firebase Authentication SDK
    localStorage.removeItem("@user");
    window.location.href = "/";
  }

  return (
    <nav className="nav-bar">
      <div className="nav1">
        <Link to="">Browse</Link>
        <input
          type="text"
          id="search_book"
          placeholder="Welcome to book store 😊"
          style={{ border: "none", width: "220px" }}
        />
      </div>
      <h3>Readbooks</h3>
      <div className="icon-about">
        <i className="material-icons">
          <span className="material-icons-outlined">Account_circle</span>
        </i>
        <button
          className="btn btn-dark text-white"
          style={{ fontSize: "12px", padding: "5px", textAlign: "center" }}
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}

export default Navbarpage;
