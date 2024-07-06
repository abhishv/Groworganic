import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !phone || !email) {
      setError('All fields are required.');
      return;
    }
    localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
    navigate('/second');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4">User Information</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default UserForm;
