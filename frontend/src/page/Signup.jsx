import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
const URL = `https://dns-manager-g5md.onrender.com/api/auth/register`;
const Signup = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          phone: phone,
          password: password,
        }),
      });
      const res_data = await response.json();
      //console.log("res form server", res_data);

      if (response.ok) {
        toast.success("Signed up successfully")
        setUsername('');
        setEmail('');
        setPassword('');
        setPhone('');
        navigate("/login");
      } 
    } catch (error) {
      //console.log(error);
      toast.error('Error while signing up')  
    }
  };
 
  return (
    <div>
      <Box marginTop={15}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <h2>Sign Up</h2>
          </Grid>
          <TextField
            sx={{ marginBottom: "8px" }}
            label="Username"
            placeholder="Enter username"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <br />
          <TextField
            sx={{ marginBottom: "8px" }}
            label="Email"
            placeholder="Enter email"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <TextField
            sx={{ marginBottom: "8px" }}
            label="Phone"
            placeholder="Enter phone number"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <br />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
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
        </Paper>
      </Box>
    </div>
  );
};

export default Signup;
