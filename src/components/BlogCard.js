import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';

const BlogCard = ({ blog, imageUrl, onView }) => {
  return (
    <Card
      sx={{
        width: 300,
        height: 380,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 3,
        boxShadow: 3,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={imageUrl}
        alt="Blog Thumbnail"
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom noWrap>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ height: 50, overflow: 'hidden' }}>
          {blog.content}
        </Typography>
      </CardContent>
      <Button onClick={onView} sx={{ m: 2 }} variant="outlined" fullWidth>
        View Blog
      </Button>
    </Card>
  );
};

export default BlogCard;


