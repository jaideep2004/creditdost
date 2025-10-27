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
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from '@mui/material';
import api from '../../services/api';

const KycVerification = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    aadhaarNumber: '',
    panNumber: '',
    aadhaarFront: null,
    aadhaarBack: null,
    panDocument: null,
    businessRegistration: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const steps = ['Personal Info', 'Document Upload', 'Review & Submit'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      [fieldName]: file,
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Create FormData object for file uploads
    const formDataToSend = new FormData();
    formDataToSend.append('aadhaarNumber', formData.aadhaarNumber);
    formDataToSend.append('panNumber', formData.panNumber);
    
    if (formData.aadhaarFront) {
      formDataToSend.append('aadhaarFrontDocument', formData.aadhaarFront);
    }
    
    if (formData.aadhaarBack) {
      formDataToSend.append('aadhaarBackDocument', formData.aadhaarBack);
    }
    
    if (formData.panDocument) {
      formDataToSend.append('panDocument', formData.panDocument);
    }
    
    if (formData.businessRegistration) {
      formDataToSend.append('businessRegistrationDocument', formData.businessRegistration);
    }
    
    try {
      const response = await api.post('/kyc/submit', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSuccess('KYC documents submitted successfully! Awaiting approval.');
      setActiveStep(0);
      setFormData({
        aadhaarNumber: '',
        panNumber: '',
        aadhaarFront: null,
        aadhaarBack: null,
        panDocument: null,
        businessRegistration: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit KYC documents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} style={{flex: "1"}}>
              <TextField
                required
                id="aadhaarNumber"
                name="aadhaarNumber"
                label="Aadhaar Number"
                fullWidth
                value={formData.aadhaarNumber}
                onChange={handleInputChange}
                inputProps={{ maxLength: 12 }}
              />
            </Grid>
            <Grid item xs={12} style={{flex: "1"}}>
              <TextField
                required
                id="panNumber"
                name="panNumber"
                label="PAN Number"
                fullWidth
                value={formData.panNumber}
                onChange={handleInputChange}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Aadhaar Front
              </Typography>
              <input
                accept="image/*,.pdf"
                type="file"
                onChange={(e) => handleFileChange(e, 'aadhaarFront')}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Aadhaar Back
              </Typography>
              <input
                accept="image/*,.pdf"
                type="file"
                onChange={(e) => handleFileChange(e, 'aadhaarBack')}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                PAN Card
              </Typography>
              <input
                accept="image/*,.pdf"
                type="file"
                onChange={(e) => handleFileChange(e, 'panDocument')}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Business Registration Document
              </Typography>
              <input
                accept="image/*,.pdf"
                type="file"
                onChange={(e) => handleFileChange(e, 'businessRegistration')}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Please review your information before submitting:
            </Typography>
            <Typography>Aadhaar Number: {formData.aadhaarNumber}</Typography>
            <Typography>PAN Number: {formData.panNumber}</Typography>
            <Typography>Documents uploaded: {Object.values(formData).filter(file => file instanceof File).length}</Typography>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        KYC Verification
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
          <Stepper activeStep={activeStep} alternativeLabel >
            {steps.map((label) => (
              <Step key={label} >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Box sx={{ mt: 4 }}>
            {getStepContent(activeStep)}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                sx={{ py: 1.5, px: 4 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Submit KYC'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ py: 1.5, px: 4 }}
              >
                Next
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default KycVerification;