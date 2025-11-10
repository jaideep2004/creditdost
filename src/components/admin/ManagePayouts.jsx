import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { adminAPI } from '../../services/api';  

const ManagePayouts = () => {
  const [franchises, setFranchises] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [selectedFranchise, setSelectedFranchise] = useState('');
  const [periodStart, setPeriodStart] = useState(null);
  const [periodEnd, setPeriodEnd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [status, setStatus] = useState('');
  const [remarks, setRemarks] = useState('');

  // Fetch franchises and payouts on component mount
  useEffect(() => {
    fetchFranchises();
    fetchAllPayouts();
  }, []);

  const fetchFranchises = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllFranchises();
      setFranchises(response.data);
    } catch (error) {
      showNotification('Error fetching franchises', 'error');
      console.error('Error fetching franchises:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPayouts = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllPayouts();
      setPayouts(response.data);
    } catch (error) {
      showNotification('Error fetching payouts', 'error');
      console.error('Error fetching payouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, severity = 'success') => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleCalculatePayout = async () => {
    if (!selectedFranchise || !periodStart || !periodEnd) {
      showNotification('Please fill all fields', 'error');
      return;
    }

    try {
      setCalculating(true);
      const response = await adminAPI.calculateFranchisePayouts({
        franchiseId: selectedFranchise,
        periodStart: periodStart.toISOString(),
        periodEnd: periodEnd.toISOString(),
      });

      showNotification(response.data.message);
      // Refresh payouts list
      fetchAllPayouts();
      // Reset form
      setSelectedFranchise('');
      setPeriodStart(null);
      setPeriodEnd(null);
    } catch (error) {
      showNotification(
        error.response?.data?.message || 'Error calculating payout',
        'error'
      );
      console.error('Error calculating payout:', error);
    } finally {
      setCalculating(false);
    }
  };

  const handleUpdatePayout = async () => {
    if (!status) {
      showNotification('Please select a status', 'error');
      return;
    }

    try {
      setLoading(true);
      const response = await adminAPI.updatePayout(selectedPayout._id, {
        status,
        remarks,
      });

      showNotification(response.data.message);
      // Refresh payouts list
      fetchAllPayouts();
      // Close dialog
      setOpenDialog(false);
      // Reset form
      setSelectedPayout(null);
      setStatus('');
      setRemarks('');
    } catch (error) {
      showNotification(
        error.response?.data?.message || 'Error updating payout',
        'error'
      );
      console.error('Error updating payout:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUpdateDialog = (payout) => {
    setSelectedPayout(payout);
    setStatus(payout.status);
    setRemarks(payout.remarks || '');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPayout(null);
    setStatus('');
    setRemarks('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getFranchiseName = (franchiseId) => {
    const franchise = franchises.find(f => f._id === franchiseId);
    return franchise ? franchise.businessName : 'Unknown Franchise';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Payouts
      </Typography>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity} 
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      <Grid container spacing={3} style={{ flexDirection: 'column' }}>
    
        {/* Payout Calculation Form */}
        <Grid item xs={12}>
          <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>   
                Calculate Payout
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} style={{flex:"1"}}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Select Franchise</InputLabel>
                    <Select
                      value={selectedFranchise}
                      onChange={(e) => setSelectedFranchise(e.target.value)}
                      label="Select Franchise"
                    >
                      {franchises.map((franchise) => (
                        <MenuItem key={franchise._id} value={franchise._id}>
                          {franchise.businessName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={4} style={{flex:"1"}}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Period Start"
                      value={periodStart}
                      onChange={(newValue) => setPeriodStart(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                  </LocalizationProvider>
                </Grid>
                
                <Grid item xs={12} md={4} style={{flex:"1"}}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Period End"
                      value={periodEnd}
                      onChange={(newValue) => setPeriodEnd(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              
              <Button
                variant="contained"
                color="primary"
                onClick={handleCalculatePayout}
                disabled={calculating}
                sx={{ mt: 2 }}
                startIcon={calculating ? <CircularProgress size={20} /> : null}
              >
                {calculating ? 'Calculating...' : 'Calculate Payout'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Payouts List */}
        <Grid item xs={12}>
          <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payout History
              </Typography>
              
              {loading ? (
                <Box display="flex" justifyContent="center" my={3}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Franchise</TableCell>
                        <TableCell>Period</TableCell>
                        <TableCell align="right">Amount (₹)</TableCell>
                        <TableCell align="right">Credits</TableCell>
                        <TableCell align="right">Referral Bonus</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {payouts.length > 0 ? (
                        payouts.map((payout) => (
                          <TableRow key={payout._id}>
                            <TableCell>{getFranchiseName(payout.franchiseId)}</TableCell>
                            <TableCell>
                              {new Date(payout.periodStart).toLocaleDateString()} - {new Date(payout.periodEnd).toLocaleDateString()}
                            </TableCell>
                            <TableCell align="right">₹{payout.amount.toFixed(2)}</TableCell>
                            <TableCell align="right">{payout.creditsGenerated}</TableCell>
                            <TableCell align="right">₹{payout.referralBonus.toFixed(2)}</TableCell>
                            <TableCell>
                              <Chip 
                                label={payout.status} 
                                color={getStatusColor(payout.status)} 
                                size="small" 
                              />
                            </TableCell>
                            <TableCell>
                              <Button 
                                size="small" 
                                variant="outlined" 
                                onClick={() => handleOpenUpdateDialog(payout)}
                              >
                                Update
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            No payouts found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Update Payout Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Update Payout Status</DialogTitle>
        <DialogContent>
          {selectedPayout && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Franchise: {getFranchiseName(selectedPayout.franchiseId)}
                </Typography>
                <Typography variant="subtitle1">
                  Amount: ₹{selectedPayout.amount.toFixed(2)}
                </Typography>
                <Typography variant="subtitle1">
                  Period: {new Date(selectedPayout.periodStart).toLocaleDateString()} - {new Date(selectedPayout.periodEnd).toLocaleDateString()}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="failed">Failed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Remarks"
                  multiline
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  margin="normal"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleUpdatePayout} 
            variant="contained" 
            color="primary"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagePayouts;