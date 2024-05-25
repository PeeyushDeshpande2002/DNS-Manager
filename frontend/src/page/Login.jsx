import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import SnackbarNotification from "../components/Snackbar";

const URL = "https://dns-manager-g5md.onrender.com/api/auth/login";
const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };

  const {storeTokenInLS} = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email : email, password : password}),
      });

      const res_data = await response.json();
      //console.log("response data", res_data);
      if (response.ok) {
        //console.log(email, password);
        setSnackbar({ open: true, message: 'Logged in successfully!', severity: 'success' });
        storeTokenInLS(res_data.token);
        setEmail('');
        setPassword('');
        navigate("/dashboard");

      } 
    } catch (error) {
      setSnackbar({ open: true, message: 'Check your email and password!', severity: 'error' });  
    }
  };
  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  return (
    <Box marginTop={15}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2>Sign In</h2>
        </Grid>
        <TextField
          sx={{ marginBottom: "8px" }}
          label="Email"
          placeholder="Enter email"
          variant="outlined"
          fullWidth
          required
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
        />
        <br />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          variant="outlined"
          fullWidth
          required
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleSubmit}
        >
          Sign in
        </Button>
        <SnackbarNotification
        open={snackbar.open}
        handleClose={handleClose}
        severity={snackbar.severity}
        message={snackbar.message}
      />
        <Typography>
          {" "}
          Do you have an account ?<Link to="/signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
