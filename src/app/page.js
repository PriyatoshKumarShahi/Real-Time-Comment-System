'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button, List, ListItem, Box } from '@mui/material';
import axios from 'axios';

const HomePage = () => {
  const [comments, setComments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/comments');
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1d3557, #457b9d)",
        color: "#f1faee",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "32px 0",
        overflowX: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          textAlign: "center",
          animation: "fadeIn 1.5s ease-in-out",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontFamily: "'Poppins', sans-serif",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
          }}
        >
          Welcome to Our Real-Time Comments System!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            lineHeight: "1.8",
            fontFamily: "'Roboto', sans-serif",
            animation: "fadeInUp 1s ease-in-out",
          }}
        >
          This page is designed to foster seamless interaction and engagement.
          Here's what you can do:
        </Typography>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            mt: 2,
            animation: "fadeInUp 1.2s ease-in-out",
          }}
        >
          <ListItem>💬 <strong>Post Comments:</strong> Share your thoughts and join the conversation in real time.</ListItem>
          <ListItem>🔄 <strong>Instant Updates:</strong> New comments appear instantly—no need to refresh!</ListItem>
          <ListItem>🕒 <strong>Time Stamps:</strong> See when each comment was made, down to the minute.</ListItem>
          <ListItem>🌟 <strong>User-Friendly Design:</strong> Enjoy a clean, responsive, and interactive interface.</ListItem>
        </List>
      </Container>

      <Container
        maxWidth="md"
        sx={{
          textAlign: "center",
          animation: "fadeInUp 1.5s ease-in-out",
        }}
      >
       
        <Box
          display="flex"
          justifyContent="center"
          mt={4}
          sx={{
            animation: "fadeInUp 1s ease-in-out 0.5s",
            marginTop:"-50px"
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{
              background: "linear-gradient(135deg, #e63946, #f77f00)",
              color: "#ffffff",
              fontWeight: "bold",
              padding: "12px 24px",
              borderRadius: "8px",
              textTransform: "none",
              transition: "transform 0.3s, box-shadow 0.3s",
              marginTop:"-30px",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0 6px 20px rgba(230, 57, 70, 0.5)",
                background: "linear-gradient(135deg, #f77f00, #e63946)",
              },
            }}
          >
            Login to Post Comments
          </Button>
        </Box>
      </Container>

      <Box
        sx={{
          width: "100%",
          background: "#1d3557",
          padding: "16px 0",
          textAlign: "center",
          color: "#f1faee",
          boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.2)",
          fontFamily: "'Roboto', sans-serif",
          fontSize: "0.9rem",
        }}
      >
        <Typography>
          Thank you for visiting! We hope you enjoy this real-time interaction platform. Share your feedback to help us improve further. 💡
        </Typography>
      </Box>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>

  );
};

export default HomePage;
