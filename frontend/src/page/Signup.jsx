import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  //const {storeTokenInLS} = useAuth();
  // const handleInput = (e) => {
  //   const {name, value} = e.target;
  //   setUser({
  //     ...user,
  //     [name]: value,
  //   });
  // };

  // handle form on submit
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
      console.log("res form server", res_data);

      if (response.ok) {
        //storeTokenInLS(res_data.token)
        setUsername('');
        setEmail('');
        setPassword('');
        setPhone('');
        navigate("/login");
        toast.success("Registered Successfully");
      } else {
        toast.error(
          res_data.errorDetails ? res_data.errorDetails : res_data.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Box>
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
