'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField, Container, Typography,Box } from '@mui/material';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!username) {
      alert('Please enter a username');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/login', { username });
      const { sessionId } = response.data;

      localStorage.setItem('sessionId', sessionId);
      localStorage.setItem('username', username);

      router.push('/comments');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Box
    sx={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      color: "#fff",
      overflow: "hidden",
      animation: "fadeIn 1.5s ease-in-out",
      position: "relative",
    }}
  >
    {/* Background Animated Circles */}
    <Box
      sx={{
        position: "absolute",
        width: "300px",
        height: "300px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "50%",
        top: "-50px",
        left: "-100px",
        animation: "moveCircles 10s infinite alternate",
      }}
    />
    <Box
      sx={{
        position: "absolute",
        width: "200px",
        height: "200px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "50%",
        bottom: "-50px",
        right: "-100px",
        animation: "moveCircles 10s infinite alternate reverse",
      }}
    />

    <Container
      maxWidth="sm"
      sx={{
        padding: "40px",
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
        zIndex: 1,
        animation: "slideIn 1s ease-out",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#3f51b5",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
          letterSpacing: "1px",
        }}
      >
        Welcome Back!
      </Typography>

      <Typography
        variant="body1"
        gutterBottom
        sx={{
          marginBottom: "20px",
          color: "#555",
          fontStyle: "italic",
        }}
      >
        Please enter your username to continue exploring.
      </Typography>

      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{
          mt: 3,
          "& .MuiInputBase-root": {
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
          },
          "& .MuiFormLabel-root": {
            color: "#3f51b5",
            transform: "translate(0, -28px) scale(0.85)",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#3f51b5",
            },
            "&:hover fieldset": {
              borderColor: "#2c387e",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2c387e",
            },
          },
        }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 3,
          padding: "12px",
          fontSize: "1.1rem",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #3f51b5, #5c6bc0)",
          "&:hover": {
            background: "linear-gradient(135deg, #2c387e, #3949ab)",
            boxShadow: "0px 6px 20px rgba(60, 60, 180, 0.4)",
          },
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
        }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>

    {/* Animations */}
    <style>
      {`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes moveCircles {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(20px);
          }
        }
      `}
    </style>
  </Box>

  
  );
};

export default LoginPage;
