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
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
} from '@mui/material';
import api from '../../services/api';
import { franchiseAPI } from '../../services/api'; // Import franchiseAPI

const KycVerification = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [verificationMethod, setVerificationMethod] = useState('manual'); // 'manual' or 'digilocker'
  const [formData, setFormData] = useState({
    aadhaarNumber: '',
    panNumber: '',
    aadhaarFront: null,
    aadhaarBack: null,
    panDocument: null,
    businessRegistration: null,
  });
  const [loading, setLoading] = useState(false);
  const [digilockerLoading, setDigilockerLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [digilockerToken, setDigilockerToken] = useState(null);

  const steps = ['Choose Method', 'Provide Details', 'Document Upload/Verification', 'Review & Submit'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format Aadhaar number (only digits, max 12 characters)
    if (name === 'aadhaarNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 12);
    }
    
    // Format PAN number (uppercase letters and digits, max 10 characters)
    if (name === 'panNumber') {
      formattedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue,
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
    // Validate required fields before submission
    if (!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar number');
      return;
    }
    
    if (!formData.panNumber || formData.panNumber.length !== 10) {
      setError('Please enter a valid 10-character PAN number');
      return;
    }
    
    // Additional PAN format validation (5 uppercase letters, 4 digits, 1 uppercase letter)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.panNumber)) {
      setError('Please enter a valid PAN number format (e.g., ABCDE1234F)');
      return;
    }

    if (verificationMethod === 'digilocker') {
      // For DigiLocker, we need to create a KYC request record in the database
      setLoading(true);
      setError('');
      setSuccess('');
      
      try {
        // Create a minimal KYC request with just the numbers (no file uploads)
        const kycData = {
          aadhaarNumber: formData.aadhaarNumber,
          panNumber: formData.panNumber
        };
        
        const response = await franchiseAPI.submitKyc(kycData);
        
        setSuccess('KYC documents submitted successfully via DigiLocker! Awaiting approval.');
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
        console.error('KYC submission error:', err);
        const errorMessage = err.response?.data?.details 
          ? Array.isArray(err.response.data.details) 
            ? err.response.data.details.join(', ')
            : err.response.data.details
          : err.response?.data?.message || 'Failed to submit KYC documents. Please try again.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
      return;
    }

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
      const response = await franchiseAPI.submitKyc(formDataToSend);
      
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
      console.error('KYC submission error:', err);
      const errorMessage = err.response?.data?.details 
        ? Array.isArray(err.response.data.details) 
          ? err.response.data.details.join(', ')
          : err.response.data.details
        : err.response?.data?.message || 'Failed to submit KYC documents. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Initialize DigiLocker SDK
  const initializeDigiLockerSDK = (token) => {
    try {
      console.log('Initializing DigiLocker SDK with token:', token);
      
      // Use a configurable gateway setting instead of relying on development mode
      // Check for explicit environment variable first, then fall back to mode-based detection
      const gateway = import.meta.env.VITE_DIGILOCKER_GATEWAY || 
                     (import.meta.env.MODE === 'development' ? 'sandbox' : 'production');
      
      console.log('Using gateway:', gateway);
      console.log('Environment mode:', import.meta.env.MODE);
      
      window.DigiboostSdk({
        gateway: gateway,
        token: token,
        selector: '#digilocker-button',
        style: {
          backgroundColor: '#613AF5',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
          fontSize: '16px',
          fontWeight: '600'
        },
        onSuccess: function(data) {
          console.log('DigiLocker verification successful:', data);
          setSuccess('DigiLocker verification completed successfully! Documents have been fetched and KYC request has been submitted for approval.');
          setDigilockerLoading(false);
          // Move to the next step
          handleNext();
        },
        onFailure: function(error) {
          console.log('DigiLocker verification failed:', error);
          setError('DigiLocker verification was cancelled or failed. Please try again.');
          setDigilockerLoading(false);
        }
      });
    } catch (err) {
      console.error('Failed to initialize DigiLocker SDK:', err);
      setError('Failed to initialize DigiLocker SDK. Please try again.');
      setDigilockerLoading(false);
    }
  };

  // Load DigiLocker SDK script and initialize it
  const loadDigiLockerSDK = (token) => {
    // Check if script is already loaded
    if (window.DigiboostSdk) {
      initializeDigiLockerSDK(token);
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/surepassio/surepass-digiboost-web-sdk@latest/index.min.js';
    script.async = true;
    script.onload = () => {
      initializeDigiLockerSDK(token);
    };
    script.onerror = () => {
      setError('Failed to load DigiLocker SDK. Please try again.');
      setDigilockerLoading(false);
    };
    
    document.body.appendChild(script);
  };

  // Initialize DigiLocker
  const initDigiLocker = async () => {
    setDigilockerLoading(true);
    setError('');
    
    try {
      const response = await franchiseAPI.initDigiLocker();
      const { token } = response.data;
      setDigilockerToken(token);
      
      // Load the DigiLocker SDK script dynamically
      loadDigiLockerSDK(token);
    } catch (err) {
      console.error('Failed to initialize DigiLocker:', err);
      setError(err.response?.data?.message || 'Failed to initialize DigiLocker. Please try again.');
      setDigilockerLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select KYC Verification Method
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="verification-method"
                name="verificationMethod"
                value={verificationMethod}
                onChange={(e) => setVerificationMethod(e.target.value)}
              >
                <FormControlLabel
                  value="manual"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle1">Manual Document Upload</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Upload your documents manually
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="digilocker"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle1">DigiLocker Verification</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Fetch documents directly from DigiLocker (Aadhaar, PAN, etc.)
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
      case 2:
        if (verificationMethod === 'digilocker') {
          return (
            <Box>
              <Typography variant="h6" gutterBottom>
                DigiLocker Verification
              </Typography>
              <Typography variant="body1" paragraph>
                Click the button below to start the DigiLocker verification process. 
                You'll be redirected to DigiLocker to authenticate and select documents.
              </Typography>
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              <Box id="digilocker-button" sx={{ mt: 2, mb: 2 }}>
                {/* DigiLocker button will be rendered here */}
              </Box>
              
              <Button
                variant="contained"
                onClick={initDigiLocker}
                disabled={digilockerLoading}
                sx={{ py: 1.5, px: 4 }}
              >
                {digilockerLoading ? <CircularProgress size={24} /> : 'Start DigiLocker Verification'}
              </Button>
              
              <Divider sx={{ my: 3 }} />
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  How DigiLocker Verification Works:
                </Typography>
                <Typography variant="body2" component="div">
                  <ol>
                    <li>Click the button above to initiate the DigiLocker process</li>
                    <li>You'll be redirected to DigiLocker to log in with your credentials</li>
                    <li>Select the required documents (Aadhaar, PAN) from your DigiLocker</li>
                    <li>Once documents are fetched, your KYC request will be automatically submitted</li>
                    <li>You'll see a confirmation message when the process is complete</li>
                  </ol>
                </Typography>
              </Alert>
            </Box>
          );
        } else {
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
        }
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Please review your information before submitting:
            </Typography>
            <Typography><strong>Verification Method:</strong> {verificationMethod === 'manual' ? 'Manual Upload' : 'DigiLocker'}</Typography>
            <Typography><strong>Aadhaar Number:</strong> {formData.aadhaarNumber}</Typography>
            <Typography><strong>PAN Number:</strong> {formData.panNumber}</Typography>
            
            {verificationMethod === 'manual' && (
              <Typography><strong>Documents uploaded:</strong> {Object.values(formData).filter(file => file instanceof File).length}</Typography>
            )}
            
            {verificationMethod === 'digilocker' && (
              <Box sx={{ mt: 2 }}>
                <Alert severity="info">
                  <Typography variant="body1">
                    <strong>DigiLocker Verification Status:</strong> Completed
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Your documents have been successfully fetched from DigiLocker. 
                    Upon submission, your KYC request will be sent for approval.
                  </Typography>
                </Alert>
              </Box>
            )}
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
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
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
                disabled={activeStep === 2 && verificationMethod === 'digilocker' && !digilockerToken}
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