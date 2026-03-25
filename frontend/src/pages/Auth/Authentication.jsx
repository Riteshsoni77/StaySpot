
import { TextField, Button, Grid, Typography, Container, Box, Card, Avatar, } from "@mui/material";
import axios from "axios";
import { useState } from "react"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Navbar from "../../conponents/includes/Navbar";
import Footer from "../../conponents/includes/Footer";
import { useNavigate } from "react-router-dom";


export default function Authentication() {
    const navigate = useNavigate();
  const [formState, setFormState] = useState(0);

  const [formData, setformData] = useState(
    {

      name: "",
      username: "",
      password: ""
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));


  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     const response= await axios.post("http://localhost:8000/user/login",
        {

          username: formData.username,
          password: formData.password,

        });
      if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                 alert("Login successful");
               navigate("/home");
            }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/user/register",
        {
          name: formData.name,
          username: formData.username,
          password: formData.password,

        });
      alert("Registration successful!");

      setformData({
        name: "",
        username: "",
        password: "",
      });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }

  };

  return (
     <div style={{ paddingTop:"70px"}}> <Navbar /> 

    <Card
      sx={{
        mt: 8,
        p: 3,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: 2,
        width: "28%",
        margin: "auto",
          
      }}

    >
      <Avatar sx={{
        m: 1,
        bgcolor: 'secondary.main',
        mx: "auto"
      }}>
        <LockOutlinedIcon />
      </Avatar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <Button variant={formState === 0 ? "contained" : ""} onClick={() => { setFormState(0) }}>
          Sign In
        </Button>
        <Button variant={formState === 1 ? "contained" : ""} onClick={() => { setFormState(1) }}>
          Sign Up
        </Button>
      </Box>
      <form onSubmit={formState === 0 ? handleLogin : handleRegister}>

        <Box
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            {formState === 0 ? "" : <Grid item xs={12} sx={{ width: "100%" }}>
              <TextField
                name="name"
                label="Full Name"
                variant="outlined"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>}

            <Grid item xs={12} sx={{ width: "100%" }}>
              <TextField
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                required
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: "100%" }}>
              <TextField
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            {formState === 0 ? "Login " : "Register"}
          </Button>
        </Box>
      </form>
    </Card>

    <div style={{ 
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000 
}} > 
  <Footer /> 
</div>
   
    </div>

  );
};