import { useState } from "react";
import { Box, Card, CardContent, TextField, Button, Typography, Alert, Stack } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/authApi";

export default function Register() {
  const [form,setForm] = useState({name:"",email:"",password:""});
  const [message,setMessage] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const update = (e) => setForm({...form,[e.target.name]:e.target.value});

  const submit = async (e) => {
    e.preventDefault(); setError(""); setMessage("");
    try {
      await register(form);
      setMessage("Registration successful. Please login.");
      setTimeout(()=>navigate("/login"), 800);
    } catch(err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box sx={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#F5F3FF",p:2}}>
      <Card sx={{width:"100%",maxWidth:430}}>
        <CardContent sx={{p:4}}>
          <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>Create Account</Typography>
          {message && <Alert severity="success" sx={{mb:2}}>{message}</Alert>}
          {error && <Alert severity="error" sx={{mb:2}}>{error}</Alert>}
          <Stack component="form" spacing={2} onSubmit={submit}>
            <TextField name="name" label="Name" value={form.name} onChange={update} required />
            <TextField name="email" label="Email" type="email" value={form.email} onChange={update} required />
            <TextField name="password" label="Password" type="password" value={form.password} onChange={update} required />
            <Button type="submit" variant="contained">Register</Button>
            <Button component={Link} to="/login">Back to Login</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
