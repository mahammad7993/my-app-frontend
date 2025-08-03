import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to right, #1976d2, #2196f3)',
        boxShadow: 3,
        px: 2
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 600,
            letterSpacing: 1,
            '&:hover': { color: '#e0e0e0' }
          }}
        >
          BlogHub – A Simple Blogging Platform
        </Typography>

        <Box display="flex" gap={2}>
          {token ? (
            <>
              <Button
                component={Link}
                to="/profile"
                sx={{
                  backgroundColor: '#ffffff33',
                  color: '#fff',
                  fontWeight: 500,
                  px: 2,
                  '&:hover': {
                    backgroundColor: '#ffffff55',
                  },
                }}
              >
                My Blogs
              </Button>
              <Button
                onClick={handleLogout}
                sx={{
                  backgroundColor: '#ff5252',
                  color: '#fff',
                  fontWeight: 500,
                  px: 2,
                  '&:hover': {
                    backgroundColor: '#ff1744',
                  },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  fontWeight: 500,
                  px: 2,
                  '&:hover': {
                    backgroundColor: '#388e3c',
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{
                  backgroundColor: '#ff9800',
                  color: '#fff',
                  fontWeight: 500,
                  px: 2,
                  '&:hover': {
                    backgroundColor: '#fb8c00',
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
