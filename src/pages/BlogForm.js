import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import API from '../api';

const BlogForm = ({ id, isModal = false, onSave }) => {
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      API.get(`/blogs/${id}`)
        .then(res => setForm({ title: res.data.title, content: res.data.content }))
        .catch(() => setError('Failed to fetch blog'));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = isEditing
        ? await API.put(`/blogs/${id}`, form)
        : await API.post('/blogs', form);

      if (onSave) onSave(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save blog');
    }
  };

  return (
    <Box >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        {isEditing ? 'Edit Blog' : 'Create Blog'}
      </Typography>
      {error && (
        <Typography color="error" fontSize={13} mb={1}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Typography fontSize={13}>Title</Typography>
        <TextField
          name="title"
          placeholder='Enter Title'
          value={form.title}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
          sx={{
            '& .MuiInputBase-root': {
              height: 35,
              fontSize: 13,
            },
          }}
        />

        <Typography fontSize={13} mt={2}>
          Content
        </Typography>
        <TextField
          name="content"
          placeholder='Enter Content'
          value={form.content}
          onChange={handleChange}
          fullWidth
          margin="dense"
          multiline
          rows={8}
          required
          sx={{
            '& .MuiInputBase-root': {
              fontSize: 13,
              overflowY: 'auto',
            },
            '& textarea': {
              maxHeight: 200,
              overflowY: 'scroll',
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, height: 35, fontSize: 13 }}
        >
          {isEditing ? 'Update Blog' : 'Create Blog'}
        </Button>
      </form>
    </Box>
  );
};

export default BlogForm;
