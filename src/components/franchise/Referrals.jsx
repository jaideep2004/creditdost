import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { GroupAdd, Send } from '@mui/icons-material';

const Referrals = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock referrals data
  const referrals = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      status: 'Pending',
      creditsEarned: 0,
      createdAt: '2023-05-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543211',
      status: 'Registered',
      creditsEarned: 10,
      createdAt: '2023-05-16',
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '9876543212',
      status: 'Purchased',
      creditsEarned: 25,
      createdAt: '2023-05-17',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRefer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // In a real app, this would submit to the API
    setTimeout(() => {
      setLoading(false);
      setSuccess('Referral sent successfully!');
      setFormData({ name: '', email: '', phone: '' });
    }, 1000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Referrals
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Refer a Friend
              </Typography>
              
              <Box component="form" onSubmit={handleRefer}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="name"
                      name="name"
                      label="Friend's Name"
                      fullWidth
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Friend's Email"
                      fullWidth
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="phone"
                      name="phone"
                      label="Friend's Phone"
                      fullWidth
                      value={formData.phone}
                      onChange={handleInputChange}
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<Send />}
                        disabled={loading}
                        sx={{ py: 1.5, px: 4 }}
                      >
                        {loading ? <CircularProgress size={24} /> : 'Send Referral'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Referral Program
              </Typography>
              <Typography variant="body1" paragraph>
                Earn credits by referring new franchise partners to CreditDost.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>How it works:</strong>
              </Typography>
              <ul>
                <li>
                  <Typography variant="body2">
                    Refer a friend using the form
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Your friend registers and purchases a package
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    You earn credits based on their purchase
                  </Typography>
                </li>
              </ul>
              <Typography variant="body1" paragraph>
                <strong>Rewards:</strong>
              </Typography>
              <ul>
                <li>
                  <Typography variant="body2">
                    10 credits for registration
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    25 credits for first package purchase
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Your Referrals
          </Typography>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="referrals table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Credits Earned</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {referrals.map((referral) => (
                  <TableRow
                    key={referral.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {referral.name}
                    </TableCell>
                    <TableCell>{referral.email}</TableCell>
                    <TableCell>{referral.phone}</TableCell>
                    <TableCell>{referral.status}</TableCell>
                    <TableCell>{referral.creditsEarned}</TableCell>
                    <TableCell>{referral.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Referrals;