import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogIn = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh" 
        textAlign="center"
        sx={{ backgroundColor: '#f5f5f5', padding: '20px' }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to DNS Manager
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Your one-stop solution for managing DNS records with ease.
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Our DNS Management System provides a user-friendly interface to manage your DNS records effortlessly. Whether you need to add, edit, or delete records, our system makes it simple and efficient.
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          Features:
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          - Add new DNS records quickly and easily<br/>
          - Edit existing DNS records with a few clicks<br/>
          - Delete records you no longer need<br/>
          - View detailed information about your hosted zones
        </Typography>
        <Box marginTop="20px">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSignUp}
            sx={{ marginRight: '10px' }}
          >
            Sign Up
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleLogIn}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
