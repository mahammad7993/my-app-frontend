import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  CircularProgress
} from '@mui/material';
import API from '../api';

import blog1 from '../images/blog1.jpg';
import blog2 from '../images/blog2.jpg';
import blog3 from '../images/blog3.jpg';
import blog4 from '../images/blog4.jpg';
import blog5 from '../images/blog5.jpg';
import blog6 from '../images/blog6.jpg';
import blog7 from '../images/blog7.jpg';
import blog8 from '../images/blog8.jpg';

const blogThumbnails = [blog1, blog2, blog3, blog4, blog5, blog6, blog7, blog8];

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get('/blogs');
        setBlogs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f9f9f9' }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 2,
          backgroundImage: `url('/images/blog-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#2d2d2d'
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Explore Blogs
        </Typography>
        <Typography variant="subtitle1">
          Discover insightful stories and industry updates.
        </Typography>
      </Box>

      {/* Blog Cards */}
      <Container sx={{ py: 6 }}>
        {blogs.length === 0 ? (
          <Typography align="center" sx={{ color: 'gray' }}>
            No blogs yet.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {blogs.map((blog, index) => (
              <Grid item xs={12} sm={6} md={3} key={blog._id}>
                <Card
                  sx={{
                    height: 350,
                    width: 350,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: 'hidden',
                    mx: 'auto' // center the card if smaller than grid width
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={blogThumbnails[index % blogThumbnails.length]}
                    alt={blog.title}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {blog.content?.slice(0, 100)}...
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <Link
                        href={`/blogs/${blog._id}`}
                        underline="hover"
                        color="primary"
                      >
                        View Blog →
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Home;
