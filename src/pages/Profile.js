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
  CircularProgress,
  Button,
  Stack,
  Modal,
} from '@mui/material';
import API from '../api';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import blog1 from '../images/blog1.jpg';
import blog2 from '../images/blog2.jpg';
import blog3 from '../images/blog3.jpg';
import blog4 from '../images/blog4.jpg';
import blog5 from '../images/blog5.jpg';
import blog6 from '../images/blog6.jpg';
import blog7 from '../images/blog7.jpg';
import blog8 from '../images/blog8.jpg';
import EditBlogDialog from './EditBlogDialog';
import BlogForm from './BlogForm';

const blogThumbnails = [blog1, blog2, blog3, blog4, blog5, blog6, blog7, blog8];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/users/me');
      setUser(res.data.user);
      setBlogs(res.data.blogs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      await API.delete(`/blogs/${selectedBlog._id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== selectedBlog._id));
      setOpenDelete(false);
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  const handleEditSave = async (updatedData) => {
    try {
      const res = await API.put(`/blogs/${selectedBlog._id}`, updatedData);
      setBlogs((prev) =>
        prev.map((b) => (b._id === selectedBlog._id ? res.data : b))
      );
      setOpenEdit(false);
    } catch (err) {
      console.error('Failed to update blog:', err);
    }
  };

  const handleCreateSave = (newBlog) => {
    setBlogs((prev) => [newBlog, ...prev]);
    setOpenCreate(false);
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f9f9f9' }}>
      <Box
        sx={{
          textAlign: 'center',
          py: 2,
          backgroundImage: `url('/images/blog-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#2d2d2d',
          position: 'relative',
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          My Blogs
        </Typography>
        <Typography variant="subtitle1">
          Manage your authored content here.
        </Typography>

        <Button
          onClick={() => setOpenCreate(true)}
          variant="contained"
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: '#4caf50',
            color: 'white',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#388e3c' },
          }}
        >
          + Create Blog
        </Button>
      </Box>

      <Container sx={{ py: 6 }}>
  {blogs.length === 0 ? (
    <Box textAlign="center" mt={4}>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        You haven't created any blogs yet.
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Start sharing your thoughts and stories with the world!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCreate(true)}
        sx={{ textTransform: 'none', fontWeight: 500 }}
      >
        + Create Your First Blog
      </Button>
    </Box>
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
                  mx: 'auto',
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
                      overflow: 'hidden',
                    }}
                  >
                    {blog.content?.slice(0, 100)}...
                  </Typography>

                  <Stack direction="row" justifyContent="space-between" mt={2}>
                    <Link href={`/blogs/${blog._id}`} underline="hover" color="primary">
                      View →
                    </Link>
                    <Box>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          setSelectedBlog(blog);
                          setOpenEdit(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => {
                          setSelectedBlog(blog);
                          setOpenDelete(true);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
</Container>

      <EditBlogDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        blog={selectedBlog}
        onSave={handleEditSave}
      />

      <ConfirmDeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDeleteConfirm}
      />

      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            width: 600,
            maxWidth: '95%',
            p: 4,
            mt: '5%',
            mx: 'auto',
          }}
        >
          <BlogForm isModal onSave={handleCreateSave} />
        </Box>
      </Modal>
    </Box>
  );
};

export default Profile;

