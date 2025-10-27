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
  IconButton,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add, Edit, Delete, Check, Close } from '@mui/icons-material';

const ManagePackages = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Starter Package',
      description: 'Perfect for new franchise partners to get started',
      price: 2999,
      creditsIncluded: 50,
      validityDays: 30,
      isActive: true,
    },
    {
      id: 2,
      name: 'Professional Package',
      description: 'Ideal for growing franchise businesses',
      price: 5999,
      creditsIncluded: 125,
      validityDays: 60,
      isActive: true,
    },
    {
      id: 3,
      name: 'Enterprise Package',
      description: 'Complete solution for established franchise partners',
      price: 9999,
      creditsIncluded: 250,
      validityDays: 90,
      isActive: true,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    creditsIncluded: '',
    validityDays: '',
    isActive: true,
  });

  const handleOpenDialog = (pkg = null) => {
    if (pkg) {
      setEditingPackage(pkg);
      setFormData({
        name: pkg.name,
        description: pkg.description,
        price: pkg.price,
        creditsIncluded: pkg.creditsIncluded,
        validityDays: pkg.validityDays,
        isActive: pkg.isActive,
      });
    } else {
      setEditingPackage(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        creditsIncluded: '',
        validityDays: '',
        isActive: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPackage(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // In a real app, this would submit to the API
    setTimeout(() => {
      if (editingPackage) {
        // Update existing package
        setPackages(packages.map(pkg => 
          pkg.id === editingPackage.id 
            ? { ...pkg, ...formData, price: Number(formData.price), creditsIncluded: Number(formData.creditsIncluded), validityDays: Number(formData.validityDays) }
            : pkg
        ));
        setSuccess('Package updated successfully!');
      } else {
        // Create new package
        const newPackage = {
          id: packages.length + 1,
          ...formData,
          price: Number(formData.price),
          creditsIncluded: Number(formData.creditsIncluded),
          validityDays: Number(formData.validityDays),
        };
        setPackages([...packages, newPackage]);
        setSuccess('Package created successfully!');
      }
      setLoading(false);
      handleCloseDialog();
    }, 1000);
  };

  const handleDelete = (id) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    // In a real app, this would call the API to delete the package
    setTimeout(() => {
      setPackages(packages.filter(pkg => pkg.id !== id));
      setLoading(false);
      setSuccess('Package deleted successfully!');
    }, 500);
  };

  const handleToggleStatus = (id) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    // In a real app, this would call the API to toggle package status
    setTimeout(() => {
      setPackages(packages.map(pkg => 
        pkg.id === id ? { ...pkg, isActive: !pkg.isActive } : pkg
      ));
      setLoading(false);
      setSuccess('Package status updated successfully!');
    }, 500);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Packages
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
            >
              Add Package
            </Button>
          </Box>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="packages table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Credits</TableCell>
                  <TableCell>Validity</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow
                    key={pkg.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {pkg.name}
                    </TableCell>
                    <TableCell>{pkg.description}</TableCell>
                    <TableCell>₹{pkg.price}</TableCell>
                    <TableCell>{pkg.creditsIncluded}</TableCell>
                    <TableCell>{pkg.validityDays} days</TableCell>
                    <TableCell>
                      {pkg.isActive ? (
                        <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                          Active
                        </Typography>
                      ) : (
                        <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                          Inactive
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDialog(pkg)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(pkg.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <Delete />
                      </IconButton>
                      <Switch
                        checked={pkg.isActive}
                        onChange={() => handleToggleStatus(pkg.id)}
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingPackage ? 'Edit Package' : 'Add New Package'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Package Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Price (₹)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Credits Included"
                  name="creditsIncluded"
                  type="number"
                  value={formData.creditsIncluded}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Validity (days)"
                  name="validityDays"
                  type="number"
                  value={formData.validityDays}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  <Switch
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    name="isActive"
                    color="primary"
                  />
                  <Typography>Active</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : (editingPackage ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagePackages;