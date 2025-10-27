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
import { Search, CreditScore } from '@mui/icons-material';

const CreditCheck = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [creditReports, setCreditReports] = useState([]);

  // Mock credit reports data
  const mockReports = [
    {
      id: 1,
      name: 'John Doe',
      mobile: '9876543210',
      score: 750,
      createdAt: '2023-05-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      mobile: '9876543211',
      score: 680,
      createdAt: '2023-05-16',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckCredit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // In a real app, this would call the API to check credit
    setTimeout(() => {
      setLoading(false);
      setSuccess('Credit check completed successfully!');
      setCreditReports(mockReports);
    }, 1500);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Credit Check
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
            Check Customer Credit
          </Typography>
          
          <Box component="form" onSubmit={handleCheckCredit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Customer Name"
                  fullWidth
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="mobile"
                  name="mobile"
                  label="Mobile Number"
                  fullWidth
                  value={formData.mobile}
                  onChange={handleInputChange}
                  inputProps={{ maxLength: 10 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<CreditScore />}
                    disabled={loading}
                    sx={{ py: 1.5, px: 4 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Check Credit'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      
      {creditReports.length > 0 && (
        <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Credit Reports
            </Typography>
            
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="credit reports table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Credit Score</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {creditReports.map((report) => (
                    <TableRow
                      key={report.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {report.name}
                      </TableCell>
                      <TableCell>{report.mobile}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          sx={{
                            color: report.score >= 700 ? 'success.main' : 
                                   report.score >= 600 ? 'warning.main' : 'error.main',
                            fontWeight: 'bold',
                          }}
                        >
                          {report.score}
                        </Typography>
                      </TableCell>
                      <TableCell>{report.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CreditCheck;