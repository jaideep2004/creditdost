import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';

const SurepassSettings = () => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // In a real app, this would submit to the API
    setTimeout(() => {
      setLoading(false);
      setSuccess('Surepass API key updated successfully!');
    }, 1000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Surepass Settings
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
          <Typography variant="h6" gutterBottom>
            API Configuration
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              required
              fullWidth
              label="Surepass API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ py: 1.5, px: 4 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Update API Key'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Integration Information
          </Typography>
          <Typography variant="body1" paragraph>
            Surepass is used for credit verification and background checks for your customers.
          </Typography>
          <Typography variant="body1" paragraph>
            To configure the integration:
          </Typography>
          <ol>
            <li>
              <Typography variant="body2">
                Sign up for a Surepass account at their official website
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Generate an API key in your Surepass dashboard
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Paste the API key in the field above and save
              </Typography>
            </li>
          </ol>
          <Typography variant="body1" paragraph>
            Once configured, franchise partners will be able to perform credit checks for their customers.
          </Typography> 
        </CardContent>
      </Card>
    </Box>
  );
};

export default SurepassSettings;