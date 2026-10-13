import { useState } from "react";
import { Box, Card, CardContent, TextField, Button, Typography, Alert, Stack } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/authApi";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login({email,password});
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box sx={{minHeight:"100vh",display:"grid",placeItems:"center",backgroundColor:"background.default",p:2}}>
      <Card sx={{width:"100%",maxWidth:430,border:1,borderColor:"divider"}}>
        <CardContent sx={{p:4}}>
          <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>Smart Calculator</Typography>
          <Typography color="text.secondary" sx={{mb:3}}>Login to continue</Typography>
          {error && <Alert severity="error" sx={{mb:2}}>{error}</Alert>}
          <Stack component="form" spacing={2} onSubmit={submit}>
            <TextField label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            <Button type="submit" variant="contained" size="large">Login</Button>
            <Button component={Link} to="/register">Create account</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
