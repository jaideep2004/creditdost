import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { franchiseAPI } from '../../services/api';

const Profile = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setFetching(true);
        const response = await franchiseAPI.getProfile();
        const profileData = response.data;
        
        setFormData({
          businessName: profileData.businessName || '',
          ownerName: profileData.ownerName || '',
          email: profileData.email || '',
          phone: profileData.phone || '',
          address: {
            street: profileData.address?.street || '',
            city: profileData.address?.city || '',
            state: profileData.address?.state || '',
            pincode: profileData.address?.pincode || '',
          },
        });
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Error fetching profile:', err);
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested address fields
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await franchiseAPI.updateProfile(formData);
      setSuccess(response.data.message || 'Profile updated successfully!');
      
      // Update form data with response data
      const updatedProfile = response.data.franchise;
      setFormData({
        businessName: updatedProfile.businessName || '',
        ownerName: updatedProfile.ownerName || '',
        email: updatedProfile.email || '',
        phone: updatedProfile.phone || '',
        address: {
          street: updatedProfile.address?.street || '',
          city: updatedProfile.address?.city || '',
          state: updatedProfile.address?.state || '',
          pincode: updatedProfile.address?.pincode || '',
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.details || 'Failed to update profile');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
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
      
      <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="businessName"
                  name="businessName"
                  label="Business Name"
                  fullWidth
                  value={formData.businessName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="ownerName"
                  name="ownerName"
                  label="Owner Name"
                  fullWidth
                  value={formData.ownerName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email Address"
                  fullWidth
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  fullWidth
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Address
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address.street"
                  name="address.street"
                  label="Street Address"
                  fullWidth
                  value={formData.address.street}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="address.city"
                  name="address.city"
                  label="City"
                  fullWidth
                  value={formData.address.city}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="address.state"
                  name="address.state"
                  label="State"
                  fullWidth
                  value={formData.address.state}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="address.pincode"
                  name="address.pincode"
                  label="Pincode"
                  fullWidth
                  value={formData.address.pincode}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ py: 1.5, px: 4 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Update Profile'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;