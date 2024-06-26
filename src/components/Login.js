import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://news-app-n4ff.onrender.com/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate('/', { replace: true });
    } else {
      alert("Invalid Credentials!!!! Please try again");
    }
  }

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="container" style={{ 'marginTop': '90px' }}>
      <h1 style={{ 'marginBottom': '56px', 'textAlign': 'center' }}>
        Login and open the new world of Digital News!!!
      </h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            value={credentials.email}
            onChange={onChange}
            className='form-control'
            id='email'
            name='email'
            aria-describedby='emailHelp'
          />
          <div className="form-text" id="emailHelp">We'll never share your email with anyone</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            name='password'
            id="password"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary mb-3">Login</button>
          <br />
          <Link to="/signup" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
