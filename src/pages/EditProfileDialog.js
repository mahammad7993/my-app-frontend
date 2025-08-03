import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, TextField, Typography
} from '@mui/material';

const EditProfileDialog = ({ open, onClose, profile, onSave }) => {
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (profile) {
      setForm({ name: profile.name, email: profile.email, role: profile.role });
    }
  }, [profile]);

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.role) newErrors.role = 'Role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(form);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography fontSize={13} mb={0.5}>Name</Typography>
            <TextField
              fullWidth
              size="small"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              inputProps={{ style: { height: 35, fontSize: 13 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography fontSize={13} mb={0.5}>Email</Typography>
            <TextField
              fullWidth
              size="small"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              inputProps={{ style: { height: 35, fontSize: 13 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography fontSize={13} mb={0.5}>Role</Typography>
            <TextField
              fullWidth
              size="small"
              name="role"
              value={form.role}
              onChange={handleChange}
              error={!!errors.role}
              helperText={errors.role}
              inputProps={{ style: { height: 35, fontSize: 13 } }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
