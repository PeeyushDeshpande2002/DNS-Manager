import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Login from './page/Login';
import Home from './page/Home';
import Signup from './page/Signup';
import Dashboard from './page/Dashboard';
import Navbar from './page/Navbar';
import DnsRecordDashboard from './page/DnsRecordDashboard';
import { Logout } from './page/Logout';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:hostedZoneId" element={<DnsRecordDashboard />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;