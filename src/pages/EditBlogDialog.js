import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Typography, Box
} from '@mui/material';

const EditBlogDialog = ({ open, onClose, blog, onSave }) => {
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (blog) {
      setForm({ title: blog.title || '', content: blog.content || '' });
    }
  }, [blog]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.content) {
      setError('Both title and content are required.');
      return;
    }
    setError('');
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 'bold' }}>Edit Blog</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          {error && (
            <Typography color="error" fontSize={13} mb={1}>
              {error}
            </Typography>
          )}

          <Typography fontSize={13} mb={0.5}>
            Title
          </Typography>
          <TextField
            fullWidth
            size="small"
            name="title"
            placeholder="Enter Title"
            value={form.title}
            onChange={handleChange}
            required
            sx={{
              mb: 2,
              '& .MuiInputBase-root': {
                height: 35,
                fontSize: 13,
              },
            }}
          />

          <Typography fontSize={13} mb={0.5}>
            Content
          </Typography>
          <TextField
            fullWidth
            size="small"
            name="content"
            placeholder="Enter Content"
            value={form.content}
            onChange={handleChange}
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
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} size="small">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="small"
          sx={{ height: 35, fontSize: 13 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBlogDialog;
