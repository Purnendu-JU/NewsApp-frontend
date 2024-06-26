// Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import news from "../News.png";

const Navbar = ({ darkMode, toggleTheme, onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      onSearch(searchText);
      setSearchText(""); // Clear the search input after submission
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Navigate to login page without reloading
  };

  const isAuthenticated = localStorage.getItem("token");

  return (
    <div>
      <nav
        className={`navbar fixed-top navbar-expand-lg navbar-dark ${
          darkMode ? "navbar-dark-mode" : "bg-dark"
        }`}
      >
        <div className="container-fluid">
          <img
            src={news}
            alt="loading"
            style={{ width: "45px", marginLeft: "2px" }}
          />
          <Link className="navbar-brand" to="/" style={{ paddingLeft: "10px" }}>
            News Web
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/general">
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology">
                  Technology
                </Link>
              </li>
            </ul>
            {isAuthenticated && (
              <form className="d-flex" onSubmit={handleSearchSubmit}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: "62%" }}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            )}
            <div className="d-flex align-items-center">
              <div className="form-check form-switch text-light me-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="themeSwitch"
                  onChange={toggleTheme}
                />
                <label className="form-check-label" htmlFor="themeSwitch">
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </label>
              </div>
              {isAuthenticated && (
                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                  style={{ marginRight: "0.2px" }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
