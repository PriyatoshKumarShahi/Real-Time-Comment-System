'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, TextField, Button, List, ListItem, Box, IconButton } from '@mui/material';
import axios from 'axios';
import io from 'socket.io-client';

import EmojiPicker from 'emoji-picker-react';

const socket = io('http://localhost:3001');

const CommentsPage = () => {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false); 
  const router = useRouter();

  // Load user session
  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    const storedUsername = localStorage.getItem('username');

    if (!sessionId || !storedUsername) {
      router.push('/login');
    } else {
      setUsername(storedUsername);
    }
  }, [router]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get('http://localhost:3001/comments');
      setComments(response.data);
    };

    fetchComments();

    socket.on('newComment', (newComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
    });

    return () => {
      socket.off('newComment');
    };
  }, []);

  const handlePostComment = async () => {
    if (!comment) return;

    const timestamp = new Date().toISOString();
    const newComment = { username, content: comment, timestamp };

    await axios.post('http://localhost:3001/comments', newComment);
    setComment('');
  };

  const handleLogout = () => {
    router.push('/logout');
  };

  const addEmoji = (emoji) => {
    setComment((prevComment) => prevComment + emoji.emoji);  
    setEmojiPickerOpen(false); 
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        animation: 'fadeIn 1.5s ease-in-out',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          top: '-50px',
          left: '-100px',
          animation: 'moveCircles 10s infinite alternate',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          bottom: '-50px',
          right: '-100px',
          animation: 'moveCircles 10s infinite alternate reverse',
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          mt: 8,
          padding: '40px',
          backgroundColor: '#ffffff',
          borderRadius: '15px',
          boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.3)',
          zIndex: 1,
          animation: 'slideIn 1s ease-out',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#2c387e',
            textAlign: 'center',
            letterSpacing: '1px',
          }}
        >
          Comments
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.2rem',
              color: '#4a4a4a',
              fontStyle: 'italic',
            }}
          >
            Welcome, {username}!
          </Typography>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              background: 'linear-gradient(135deg, #ff512f, #dd2476)',
              color: '#ffffff',
              '&:hover': {
                background: 'linear-gradient(135deg, #ff512f, #ff6b6b)',
              },
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            Logout
          </Button>
        </Box>

        <List
          sx={{
            maxHeight: '300px',
            overflowY: 'auto',
            marginBottom: '20px',
            paddingRight: '10px',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
            },
          }}
        >
          {comments.map((comment) => (
            <ListItem
              key={comment.id}
              sx={{
                borderBottom: '1px solid #ddd',
                padding: '10px 0',
                background: '#f9f9f9',
                borderRadius: '8px',
                mb: 1,
                '&:hover': {
                  background: '#e9e9e9',
                  padding: '10px 5px',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              <strong style={{ color: '#2c387e' }}>{comment.username}:</strong>{' '}
              <span style={{ color: '#555' }}>{comment.content}</span>{' '}
              <em style={{ color: '#888' }}>({comment.timestamp})</em>
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
            sx={{
              background: '#f5f5f5',
              borderRadius: '50%',
              marginRight: '10px',
              color:"yellow",
              '&:hover': {
                background: '#e9e9e9',
              },
            }}
          >
            😊
          </IconButton>

          <TextField
            fullWidth
            label="Post a comment"
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
                color: '#4a4a4a',
              },
            }}
          />
        </Box>

        {emojiPickerOpen && (
          <EmojiPicker
            set="apple"
            onEmojiClick={addEmoji}
            style={{
              position: 'absolute',
              bottom: '100px',
              left: '0px',
              zIndex: 1000,
            }}
          />
        )}

        <Button
          variant="contained"
          sx={{
            mt: 3,
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #3f51b5, #5c6bc0)',
            color: '#ffffff',
            '&:hover': {
              background: 'linear-gradient(135deg, #2c387e, #3949ab)',
              boxShadow: '0px 6px 20px rgba(60, 60, 180, 0.4)',
            },
          }}
          onClick={handlePostComment}
        >
          Post Comment
        </Button>
      </Container>
    </Box>
  );
};

export default CommentsPage;
