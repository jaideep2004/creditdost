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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { franchiseAPI } from '../../services/api';
import axios from 'axios';

const Business = () => {
  const [customerPackages, setCustomerPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeStep, setActiveStep] = useState(0); // For step navigation
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    panNumber: '',
    aadharNumber: '',
    pincode: '',
    state: '',
    language: '',
    occupation: '',
    monthlyIncome: '',
    fullAddress: '',
  });
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [razorpayOrderId, setRazorpayOrderId] = useState('');
  const [businessFormId, setBusinessFormId] = useState('');

  // Fetch customer packages
  useEffect(() => {
    fetchCustomerPackages();
  }, []);

  const fetchCustomerPackages = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('http://localhost:5000/api/customer-packages');
      setCustomerPackages(response.data);
    } catch (err) {
      setError('Failed to fetch customer packages. Please try again later.');
      console.error('Error fetching customer packages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleSubmitForm = async () => {
    if (!selectedPackage) {
      setError('Please select a package before proceeding.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Include selected package in the form data
      const formDataWithPackage = {
        ...formData,
        selectedPackage: selectedPackage._id,
      };
      
      const response = await franchiseAPI.submitBusinessForm(formDataWithPackage);
      setRazorpayOrderId(response.data.orderId);
      setBusinessFormId(response.data.businessFormId);
      setSuccess('Form submitted successfully. Please proceed with payment.');
      handleNext(); // Move to payment step
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit form. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!selectedPackage) {
      setError('Please select a package.');
      return;
    }
    
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use the correct variable
      amount: selectedPackage.price * 100,
      currency: 'INR',
      name: 'CreditDost',
      description: selectedPackage.name,
      order_id: razorpayOrderId,
      handler: async function (response) {
        try {
          // Verify payment
          await franchiseAPI.verifyBusinessPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            businessFormId: businessFormId,
          });
          
          setSuccess('Payment successful! Business form has been submitted.');
          resetForm();
          setActiveStep(0); // Reset to first step
        } catch (err) {
          setError('Payment verification failed. Please contact support.');
          console.error('Error verifying payment:', err);
        }
      },
      prefill: {
        name: formData.customerName,
        email: formData.customerEmail,
        contact: formData.customerPhone,
      },
      theme: {
        color: '#6200ea',
      },
    };
    
    // Check if Razorpay key is available
    if (!options.key) {
      setError('Razorpay key is not configured. Please contact administrator.');
      return;
    }
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      panNumber: '',
      aadharNumber: '',
      pincode: '',
      state: '',
      language: '',
      occupation: '',
      monthlyIncome: '',
      fullAddress: '',
    });
    setSelectedPackage(null);
  };

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
    'Daman and Diu', 'Lakshadweep', 'Delhi', 'Puducherry'
  ];

  const languages = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu', 'Gujarati', 'Kannada', 'Odia', 'Punjabi', 'Malayalam', 'Assamese'];

  const occupations = ['Salaried', 'Self Employed', 'Business Owner', 'Student', 'Retired', 'Homemaker', 'Others'];

  const steps = [
    'Customer Information',
    'Package Selection',
    'Payment'
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Business Form
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
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
                <StepContent>
                  {index === 0 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Customer Information
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Customer Name"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Customer Email"
                            name="customerEmail"
                            type="email"
                            value={formData.customerEmail}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Customer Phone"
                            name="customerPhone"
                            value={formData.customerPhone}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="PAN Number"
                            name="panNumber"
                            value={formData.panNumber}
                            onChange={handleInputChange}
                            inputProps={{ maxLength: 10 }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Aadhar Number"
                            name="aadharNumber"
                            value={formData.aadharNumber}
                            onChange={handleInputChange}
                            inputProps={{ maxLength: 12 }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth required>
                            <InputLabel>State</InputLabel>
                            <Select
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              label="State"
                            >
                              {states.map((state) => (
                                <MenuItem key={state} value={state}>{state}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth required>
                            <InputLabel>Language</InputLabel>
                            <Select
                              name="language"
                              value={formData.language}
                              onChange={handleInputChange}
                              label="Language"
                            >
                              {languages.map((language) => (
                                <MenuItem key={language} value={language}>{language}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth required>
                            <InputLabel>Occupation</InputLabel>
                            <Select
                              name="occupation"
                              value={formData.occupation}
                              onChange={handleInputChange}
                              label="Occupation"
                            >
                              {occupations.map((occupation) => (
                                <MenuItem key={occupation} value={occupation}>{occupation}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Monthly Income"
                            name="monthlyIncome"
                            type="number"
                            value={formData.monthlyIncome}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            label="Full Address"
                            name="fullAddress"
                            value={formData.fullAddress}
                            onChange={handleInputChange}
                            multiline
                            rows={3}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              disabled={loading}
                            >
                              {loading ? <CircularProgress size={24} /> : 'Next'}
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  
                  {index === 1 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Select Package for Customer
                      </Typography>
                      
                      {customerPackages.length === 0 ? (
                        <Alert severity="info">No packages available at the moment.</Alert>
                      ) : (
                        <Grid container spacing={3}>
                          {customerPackages.map((pkg) => (
                            <Grid item xs={12} sm={6} md={4} key={pkg._id}>
                              <Card
                                sx={{
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  cursor: 'pointer',
                                  border: selectedPackage?._id === pkg._id ? '2px solid #6200ea' : '1px solid #e0e0e0',
                                  '&:hover': {
                                    boxShadow: 6,
                                  },
                                }}
                                onClick={() => handlePackageSelect(pkg)}
                              >
                                <CardContent sx={{ flexGrow: 1 }}>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6" component="h3" fontWeight="bold">
                                      {pkg.name}
                                    </Typography>
                                    {selectedPackage?._id === pkg._id && (
                                      <Chip label="Selected" color="primary" size="small" />
                                    )}
                                  </Box>
                                  
                                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 60 }}>
                                    {pkg.description}
                                  </Typography>
                                  
                                  <Box sx={{ mb: 3 }}>
                                    <Typography variant="h4" component="div" color="primary.main" fontWeight="bold">
                                      ₹{pkg.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      for {pkg.creditsIncluded} credits
                                    </Typography>
                                  </Box>
                                  
                                  <List dense>
                                    {pkg.features && pkg.features.map((feature, index) => (
                                      <ListItem key={index} sx={{ py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                          <CheckIcon color="primary" fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary={feature} primaryTypographyProps={{ variant: 'body2' }} />
                                      </ListItem>
                                    ))}
                                  </List>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button onClick={handleBack}>Back</Button>
                        <Button 
                          variant="contained" 
                          onClick={handleSubmitForm}
                          disabled={loading}
                        >
                          {loading ? <CircularProgress size={24} /> : 'Proceed to Payment'}
                        </Button>
                      </Box>
                    </Box>
                  )}
                  
                  {index === 2 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Payment Confirmation
                      </Typography>
                      
                      {selectedPackage && (
                        <Card sx={{ mb: 3 }}>
                          <CardContent>
                            <Typography variant="h5" gutterBottom>
                              {selectedPackage.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                              {selectedPackage.description}
                            </Typography>
                            <Typography variant="h4" color="primary.main">
                              ₹{selectedPackage.price}
                            </Typography>
                          </CardContent>
                        </Card>
                      )}
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleBack}>Back</Button>
                        <Button 
                          variant="contained" 
                          onClick={handlePayment}
                          disabled={loading}
                        >
                          {loading ? <CircularProgress size={24} /> : 'Pay Now'}
                        </Button>
                      </Box>
                    </Box>
                  )}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Business;