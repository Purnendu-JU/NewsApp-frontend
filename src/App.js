import './App.css';
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import SearchNews from './components/SearchNews';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = darkMode ? 'bg-dark text-light' : 'bg-light text-dark';
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/search?query=${query}`);
  };

  return (
    <div>
      <NavBar toggleTheme={toggleTheme} darkMode={darkMode} onSearch={handleSearch} />
      <LoadingBar height={3} color="#f11946" progress={progress} />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<ProtectedRoute element={News} setProgress={setProgress} key={'general'} pageSize={5} country="in" category="general" darkMode={darkMode} />} />
        <Route exact path="/business" element={<ProtectedRoute element={News} setProgress={setProgress} key={'business'} pageSize={5} country="in" category="business" darkMode={darkMode} />} />
        <Route exact path="/entertainment" element={<ProtectedRoute element={News} setProgress={setProgress} key={'entertainment'} pageSize={5} country="in" category="entertainment" darkMode={darkMode} />} />
        <Route exact path="/general" element={<ProtectedRoute element={News} setProgress={setProgress} key={'general'} pageSize={5} country="in" category="general" darkMode={darkMode} />} />
        <Route exact path="/health" element={<ProtectedRoute element={News} setProgress={setProgress} key={'health'} pageSize={5} country="in" category="health" darkMode={darkMode} />} />
        <Route exact path="/science" element={<ProtectedRoute element={News} setProgress={setProgress} key={'science'} pageSize={5} country="in" category="science" darkMode={darkMode} />} />
        <Route exact path="/sports" element={<ProtectedRoute element={News} setProgress={setProgress} key={'sports'} pageSize={5} country="in" category="sports" darkMode={darkMode} />} />
        <Route exact path="/technology" element={<ProtectedRoute element={News} setProgress={setProgress} key={'technology'} pageSize={5} country="in" category="technology" darkMode={darkMode} />} />
        <Route exact path="/search" element={<ProtectedRoute element={SearchNews} setProgress={setProgress} searchQuery={searchQuery} darkMode={darkMode} />} />
      </Routes>
    </div>
  );
};

export default App;
