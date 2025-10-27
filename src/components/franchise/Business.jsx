import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Alert,
  CircularProgress,
  CardActions,
} from '@mui/material';
import { ShoppingCart, CreditScore } from '@mui/icons-material';

const Business = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock packages data
  const packages = [
    {
      id: 1,
      name: 'Starter Package',
      description: 'Perfect for new franchise partners to get started',
      price: 2999,
      credits: 50,
      features: [
        '50 credit reports',
        'Basic dashboard',
        'Email support',
        'Access to leads management',
      ],
    },
    {
      id: 2,
      name: 'Professional Package',
      description: 'Ideal for growing franchise businesses',
      price: 5999,
      credits: 125,
      features: [
        '125 credit reports',
        'Advanced dashboard',
        'Priority email support',
        'Access to leads management',
        'Referral program',
        'Business MIS reports',
      ],
    },
    {
      id: 3,
      name: 'Enterprise Package',
      description: 'Complete solution for established franchise partners',
      price: 9999,
      credits: 250,
      features: [
        '250 credit reports',
        'Premium dashboard with analytics',
        '24/7 priority support',
        'Access to all features',
        'Advanced referral program',
        'Custom business MIS reports',
        'AI-powered insights',
      ],
    },
  ];

  const handlePurchase = (pkg) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    // In a real app, this would initiate the payment process
    setTimeout(() => {
      setLoading(false);
      setSuccess(`Redirecting to payment for ${pkg.name}...`);
    }, 1000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Business
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
      
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Purchase Packages
      </Typography>
      
      <Grid container spacing={3}>
        {packages.map((pkg) => (
          <Grid item xs={12} md={4} key={pkg.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {pkg.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {pkg.description}
                </Typography>
                <Typography variant="h4" component="div" sx={{ my: 2 }}>
                  ₹{pkg.price}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <CreditScore sx={{ verticalAlign: 'middle', mr: 1 }} />
                  {pkg.credits} Credits
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Features:
                </Typography>
                <ul>
                  {pkg.features.map((feature, index) => (
                    <li key={index}>
                      <Typography variant="body2" color="text.secondary">
                        {feature}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  onClick={() => handlePurchase(pkg)}
                  disabled={loading}
                  sx={{ py: 1.5, px: 3 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Purchase'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Business;