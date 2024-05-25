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
import {toast} from 'react-toastify'

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
        toast.success('Logged in successfully')
        storeTokenInLS(res_data.token);
        setEmail('');
        setPassword('');
        navigate("/dashboard");

      } else{
        toast.error(res_data.errorDetails ? res_data.errorDetails : res_data.message);
      }
    } catch (error) {
      toast.error(error.messsage)
    }
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
        <Typography>
          {" "}
          Do you have an account ?<Link to="/signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
