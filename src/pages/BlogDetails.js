import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Avatar
} from '@mui/material';
import API from '../api';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error('Failed to load blog:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );

  if (!blog)
    return (
      <Container>
        <Typography variant="h5" color="error">
          Blog not found.
        </Typography>
      </Container>
    );

  const authorName =
    typeof blog.author === 'object'
      ? blog.author?.name || blog.author?.email || 'Unknown'
      : blog.author || 'Unknown';

  return (
    <Box
      sx={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: 700, textAlign: 'center' }}
          >
            {blog.title}
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={2}
          >
            <Avatar sx={{ bgcolor: '#1976d2', mr: 1 }}>
              {authorName.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="subtitle2" color="textSecondary">
              By {authorName} on{' '}
              {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{ whiteSpace: 'pre-wrap', fontSize: '1.1rem', lineHeight: 1.8 }}
          >
            {blog.content}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default BlogDetails;
