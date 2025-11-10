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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { 
  Search, 
  Visibility, 
  Edit, 
  Check, 
  Close, 
  CheckCircle, 
  Cancel, 
  Pending, 
  Download,
  PictureAsPdf as PictureAsPdfIcon
} from '@mui/icons-material';
import { adminAPI } from '../../services/api';

const ManageFranchises = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [franchises, setFranchises] = useState([]);
  const [filteredFranchises, setFilteredFranchises] = useState([]);
  const [kycDialogOpen, setKycDialogOpen] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [kycData, setKycData] = useState(null);
  const [kycLoading, setKycLoading] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [franchiseToReject, setFranchiseToReject] = useState(null);

  // Fetch all franchises on component mount
  useEffect(() => {
    fetchFranchises();
  }, []);

  const fetchFranchises = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await adminAPI.getAllFranchises();
      setFranchises(response.data);
      setFilteredFranchises(response.data);
    } catch (err) {
      setError('Failed to fetch franchises. Please try again later.');
      console.error('Error fetching franchises:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setFilteredFranchises(franchises);
      return;
    }
    
    const filtered = franchises.filter(franchise => 
      franchise.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      franchise.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      franchise.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      franchise.phone.includes(searchTerm)
    );
    
    setFilteredFranchises(filtered);
  };

  const handleApproveKyc = async (franchiseId) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // First, get the KYC request for this franchise
      const kycResponse = await adminAPI.getKycByFranchiseId(franchiseId);
      const kycRequestId = kycResponse.data._id;
      
      // Then approve the KYC request using its ID
      await adminAPI.approveKyc(kycRequestId);
      setSuccess('KYC approved successfully! Email notification sent to franchise partner.');
      
      // Refresh the franchise list
      fetchFranchises();
    } catch (err) {
      setError('Failed to approve KYC. Please try again.');
      console.error('Error approving KYC:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectKycClick = (franchise) => {
    setFranchiseToReject(franchise);
    setRejectDialogOpen(true);
  };

  const handleRejectKyc = async () => {
    if (!rejectionReason.trim()) {
      setError('Please provide a rejection reason.');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // First, get the KYC request for this franchise
      const kycResponse = await adminAPI.getKycByFranchiseId(franchiseToReject._id);
      const kycRequestId = kycResponse.data._id;
      
      // Then reject the KYC request using its ID
      await adminAPI.rejectKyc(kycRequestId, rejectionReason);
      setSuccess('KYC rejected successfully! Email notification sent to franchise partner.');
      setRejectDialogOpen(false);
      setRejectionReason('');
      setFranchiseToReject(null);
      
      // Refresh the franchise list
      fetchFranchises();
    } catch (err) {
      setError('Failed to reject KYC. Please try again.');
      console.error('Error rejecting KYC:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (franchiseId, currentStatus) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      if (currentStatus) {
        await adminAPI.deactivateFranchise(franchiseId);
        setSuccess('Franchise deactivated successfully!');
      } else {
        await adminAPI.activateFranchise(franchiseId);
        setSuccess('Franchise activated successfully!');
      }
      
      // Refresh the franchise list
      fetchFranchises();
    } catch (err) {
      setError('Failed to update franchise status. Please try again.');
      console.error('Error updating franchise status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewKyc = async (franchise) => {
    try {
      setKycLoading(true);
      setSelectedFranchise(franchise);
      
      // Fetch the actual KYC documents
      const response = await adminAPI.getKycByFranchiseId(franchise._id);
      setKycData(response.data);
      
      setKycDialogOpen(true);
    } catch (err) {
      setError('Failed to load KYC details. Please try again.');
      console.error('Error loading KYC details:', err);
    } finally {
      setKycLoading(false);
    }
  };

  const handleCloseKycDialog = () => {
    setKycDialogOpen(false);
    setSelectedFranchise(null);
    setKycData(null);
  };

  const handleCloseRejectDialog = () => {
    setRejectDialogOpen(false);
    setRejectionReason('');
    setFranchiseToReject(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      'approved': { label: 'Approved', color: 'success', icon: <CheckCircle /> },
      'pending': { label: 'Pending', color: 'warning', icon: <Pending /> },
      'rejected': { label: 'Rejected', color: 'error', icon: <Cancel /> },
      'submitted': { label: 'Submitted', color: 'info', icon: <Pending /> },
    };
    
    const config = statusConfig[status.toLowerCase()] || { label: status, color: 'default' };
    
    return (
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color}
        size="small"
        variant="outlined"
      />
    );
  };

  const handleViewDocument = (documentUrl, documentName) => {
    // Open the document in a new tab
    if (documentUrl) {
      window.open(documentUrl, '_blank');
    } else {
      alert(`Document not available: ${documentName}`);
    }
  };

  // Function to determine if a file is an image based on its URL
  const isImageFile = (url) => {
    if (!url) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  // Function to render document preview
  const renderDocumentPreview = (documentUrl, documentName) => {
    if (!documentUrl) {
      return (
        <Box sx={{ 
          width: '100%', 
          height: 140, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: '#fafafa',
          borderRadius: 1,
          border: '1px dashed #ccc'
        }}>
          <Typography color="textSecondary" variant="body2">
            No document
          </Typography>
        </Box>
      );
    }

    if (isImageFile(documentUrl)) {
      return (
        <Box sx={{ 
          width: '100%', 
          height: 140, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: 1,
          border: '1px solid #ddd',
          bgcolor: '#fff'
        }}>
          <img 
            src={documentUrl} 
            alt={documentName}
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'contain' 
            }} 
          />
        </Box>
      );
    } else {
      // For PDF or other documents, show a placeholder
      return (
        <Box sx={{ 
          width: '100%', 
          height: 140, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: '#fafafa',
          borderRadius: 1,
          border: '1px solid #ddd'
        }}>
          <PictureAsPdfIcon sx={{ fontSize: 40, color: '#d32f2f' }} />
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            PDF Document
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Franchise Partners
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
          <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={10}>
                <TextField
                  fullWidth
                  placeholder="Search franchises by business name, owner name, or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Search'}
                </Button>
              </Grid>
            </Grid>
          </Box>
          
          {loading && filteredFranchises.length === 0 ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="franchises table">
                <TableHead>
                  <TableRow>
                    <TableCell>Business Name</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>KYC Status</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Credits</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredFranchises.map((franchise) => (
                    <TableRow
                      key={franchise._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {franchise.businessName}
                      </TableCell>
                      <TableCell>{franchise.ownerName}</TableCell>
                      <TableCell>{franchise.email}</TableCell>
                      <TableCell>{franchise.phone}</TableCell>
                      <TableCell>
                        {getStatusChip(franchise.kycStatus)}
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={franchise.isActive}
                              onChange={() => handleToggleStatus(franchise._id, franchise.isActive)}
                              color="primary"
                            />
                          }
                          label={franchise.isActive ? 'Active' : 'Inactive'}
                          labelPlacement="end"
                        />
                      </TableCell>
                      <TableCell>{franchise.credits}</TableCell>
                      <TableCell>{formatDate(franchise.createdAt)}</TableCell>
                      <TableCell>
                        <IconButton 
                          size="small" 
                          onClick={() => handleViewKyc(franchise)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                        {franchise.kycStatus === 'submitted' && (
                          <>
                            <IconButton 
                              size="small" 
                              onClick={() => handleApproveKyc(franchise._id)}
                              sx={{ color: 'success.main' }}
                            >
                              <Check />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              onClick={() => handleRejectKycClick(franchise)}
                              sx={{ color: 'error.main' }}
                            >
                              <Close />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* KYC Documents Dialog */}
      <Dialog open={kycDialogOpen} onClose={handleCloseKycDialog} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
          KYC Documents - {selectedFranchise?.businessName}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#f5f5f5' }}>
          {kycLoading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : kycData ? (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    Personal Information
                  </Typography>
                  <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="textSecondary"><strong>Aadhaar Number:</strong></Typography>
                          <Typography variant="body1" sx={{ mt: 0.5 }}>{kycData.aadhaarNumber || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="textSecondary"><strong>PAN Number:</strong></Typography>
                          <Typography variant="body1" sx={{ mt: 0.5 }}>{kycData.panNumber || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="textSecondary"><strong>Submitted At:</strong></Typography>
                          <Typography variant="body1" sx={{ mt: 0.5 }}>{formatDate(kycData.submittedAt)}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="textSecondary"><strong>Status:</strong></Typography>
                          <Box sx={{ mt: 0.5 }}>
                            {getStatusChip(kycData.status)}
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2, color: 'primary.main', fontWeight: 'bold' }}>
                    Documents
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3} style={{ flex: "1" }}>
                      <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}>
                        <CardContent sx={{ flexGrow: 1, p: 2 }}>
                          <Typography variant="subtitle1" gutterBottom align="center" sx={{ fontWeight: 'medium', color: 'primary.dark', mb: 1 }}>
                            Aadhaar Front
                          </Typography>
                          {renderDocumentPreview(kycData.aadhaarFrontDocument, 'Aadhaar Front')}
                          {kycData.aadhaarFrontDocument ? (
                            <Button
                              startIcon={<Visibility />}
                              onClick={() => handleViewDocument(kycData.aadhaarFrontDocument, 'Aadhaar Front')}
                              fullWidth
                              sx={{ mt: 1.5 }}
                              variant="outlined"
                              size="small"
                            >
                              View Full
                            </Button>
                          ) : (
                            <Typography color="textSecondary" variant="body2" align="center" sx={{ mt: 1.5 }}>
                              Document not available
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3} style={{ flex: "1" }}>
                      <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}>
                        <CardContent sx={{ flexGrow: 1, p: 2 }}>
                          <Typography variant="subtitle1" gutterBottom align="center" sx={{ fontWeight: 'medium', color: 'primary.dark', mb: 1 }}>
                            Aadhaar Back
                          </Typography>
                          {renderDocumentPreview(kycData.aadhaarBackDocument, 'Aadhaar Back')}
                          {kycData.aadhaarBackDocument ? (
                            <Button
                              startIcon={<Visibility />}
                              onClick={() => handleViewDocument(kycData.aadhaarBackDocument, 'Aadhaar Back')}
                              fullWidth
                              sx={{ mt: 1.5 }}
                              variant="outlined"
                              size="small"
                            >
                              View Full
                            </Button>
                          ) : (
                            <Typography color="textSecondary" variant="body2" align="center" sx={{ mt: 1.5 }}>
                              Document not available
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3} style={{ flex: "1" }}>
                      <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}>
                        <CardContent sx={{ flexGrow: 1, p: 2 }}>
                          <Typography variant="subtitle1" gutterBottom align="center" sx={{ fontWeight: 'medium', color: 'primary.dark', mb: 1 }}>
                            PAN Card
                          </Typography>
                          {renderDocumentPreview(kycData.panDocument, 'PAN Card')}
                          {kycData.panDocument ? (
                            <Button
                              startIcon={<Visibility />}
                              onClick={() => handleViewDocument(kycData.panDocument, 'PAN Card')}
                              fullWidth
                              sx={{ mt: 1.5 }}
                              variant="outlined"
                              size="small"
                            >
                              View Full
                            </Button>
                          ) : (
                            <Typography color="textSecondary" variant="body2" align="center" sx={{ mt: 1.5 }}>
                              Document not available
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3} style={{ flex: "1" }}>
                      <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}>
                        <CardContent sx={{ flexGrow: 1, p: 2 }}>
                          <Typography variant="subtitle1" gutterBottom align="center" sx={{ fontWeight: 'medium', color: 'primary.dark', mb: 1 }}>
                            Business Registration
                          </Typography>
                          {renderDocumentPreview(kycData.businessRegistrationDocument, 'Business Registration')}
                          {kycData.businessRegistrationDocument ? (
                            <Button
                              startIcon={<Visibility />}
                              onClick={() => handleViewDocument(kycData.businessRegistrationDocument, 'Business Registration')}
                              fullWidth
                              sx={{ mt: 1.5 }}
                              variant="outlined"
                              size="small"
                            >
                              View Full
                            </Button>
                          ) : (
                            <Typography color="textSecondary" variant="body2" align="center" sx={{ mt: 1.5 }}>
                              Document not available
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Typography>No KYC data available</Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#f5f5f5', p: 2 }}>
          <Button 
            onClick={handleCloseKycDialog} 
            variant="contained" 
            color="primary"
            sx={{ 
              bgcolor: 'primary.main', 
              '&:hover': { bgcolor: 'primary.dark' },
              fontWeight: 'bold'
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* KYC Rejection Dialog */}
      <Dialog open={rejectDialogOpen} onClose={handleCloseRejectDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Reject KYC Request</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Please provide a reason for rejecting the KYC request for {franchiseToReject?.businessName}.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Rejection Reason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRejectDialog}>Cancel</Button>
          <Button 
            onClick={handleRejectKyc} 
            variant="contained" 
            color="error"
            disabled={!rejectionReason.trim() || loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Reject KYC'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageFranchises;