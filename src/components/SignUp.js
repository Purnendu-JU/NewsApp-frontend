import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("https://news-app-backend-red.vercel.app/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/", { replace: true });
    } else {
      alert("Invalid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ marginTop: "90px" }}>
      <h1 style={{ marginBottom: "56px", textAlign: "center" }}>
        Sign Up and open the world of news!!!
      </h1>

      <form onSubmit={handleSubmit} className="form-signup">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>

          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>

          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />

          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>

          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
          >
            Submit
          </button>
          <br />
          <Link to="/login" variant="body2">
            Already have an account? Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
