import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
// import AddRecord from './components/AddRecord';
// import EditRecord from './components/EditRecord';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/add" element={<AddRecord />} />
          <Route path="/edit/:id" element={<EditRecord />} /> */}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;