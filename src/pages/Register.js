import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={5}
          sx={{
            padding: 4,
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          <Typography variant="h5" align="center" fontWeight="bold" mb={3}>
            Create Your Account
          </Typography>

          {error && (
            <Typography color="error" mb={2} fontSize="13px">
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <Box mb={2}>
              <Typography variant="body2" fontWeight="500" mb={0.5}>
                Name
              </Typography>
              <TextField
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  sx: { height: 35, fontSize: 13 },
                }}
                size="small"
              />
            </Box>

            <Box mb={2}>
              <Typography variant="body2" fontWeight="500" mb={0.5}>
                Email
              </Typography>
              <TextField
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  sx: { height: 35, fontSize: 13 },
                }}
                size="small"
              />
            </Box>

            <Box mb={3}>
              <Typography variant="body2" fontWeight="500" mb={0.5}>
                Password
              </Typography>
              <TextField
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  sx: { height: 35, fontSize: 13 },
                }}
                size="small"
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                height: 35,
                fontSize: 13,
                textTransform: 'none',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#115293',
                },
              }}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;

