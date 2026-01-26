import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  UploadFile as UploadIcon,
  Visibility as ViewIcon
} from "@mui/icons-material";
import { adminAPI } from "../../services/api";

const ManageAIAnalysis = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [responseFile, setResponseFile] = useState(null);
  const [notes, setNotes] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Fetch all AI analysis documents
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getAIAnalysisDocuments();
      setDocuments(response.data);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load documents on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  // Handle response file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'text/html' || file.name.toLowerCase().endsWith('.html'))) {
      setResponseFile(file);
      setUploadError('');
    } else {
      setUploadError('Please select a PDF or HTML file');
      setResponseFile(null);
    }
  };

  // Open dialog for responding to a document
  const handleOpenDialog = (document) => {
    setSelectedDocument(document);
    setOpenDialog(true);
    setResponseFile(null);
    setNotes('');
    setUploadError('');
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDocument(null);
    setResponseFile(null);
    setNotes('');
    setUploadError('');
  };

  // Submit response
  const handleSubmitResponse = async () => {
    if (!responseFile) {
      setUploadError('Please select a response file');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('document', responseFile);
      if (notes) {
        formData.append('notes', notes);
      }

      const response = await adminAPI.respondToAIAnalysisDocument(selectedDocument._id, formData);
      
      if (response.data) {
        // Refresh documents list
        fetchDocuments();
        handleCloseDialog();
      }
    } catch (error) {
      setUploadError(error.response?.data?.message || 'Failed to submit response');
    } finally {
      setUploading(false);
    }
  };



  // Get status chip color
  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded': return 'primary';
      case 'responded': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        AI Analysis Documents
      </Typography>
      
      <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Document Management
          </Typography>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Franchise</TableCell>
                    <TableCell>Document</TableCell>
                    <TableCell>Uploaded At</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc._id}>
                      <TableCell>
                        <Typography variant="body2">{doc.franchiseName}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {doc.franchiseEmail}
                        </Typography>
                      </TableCell>
                      <TableCell>{doc.uploadedDocumentName}</TableCell>
                      <TableCell>
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={doc.status} 
                          color={getStatusColor(doc.status)} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View Details">
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog(doc)}
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Response Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Respond to Document
        </DialogTitle>
        <DialogContent>
          {selectedDocument && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedDocument.franchiseName}
              </Typography>
              
              <Typography variant="body2" color="textSecondary" paragraph>
                Uploaded: {new Date(selectedDocument.uploadedAt).toLocaleString()}
              </Typography>
              
              <Typography variant="body1" sx={{ mt: 2 }}>
                Original Document: {selectedDocument.uploadedDocumentName}
              </Typography>
              
              <input
                accept="application/pdf,.html,text/html"
                style={{ display: 'none' }}
                id="response-upload"
                type="file"
                onChange={handleFileChange}
              />
              
              <label htmlFor="response-upload">
                <Button 
                  variant="outlined" 
                  component="span" 
                  startIcon={<UploadIcon />}
                  sx={{ mt: 2 }}
                  disabled={uploading}
                >
                  Upload Response PDF/HTML
                </Button>
              </label>
              
              {responseFile && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected: {responseFile.name}
                </Typography>
              )}
              
              {uploadError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {uploadError}
                </Alert>
              )}
              
              <TextField
                label="Notes (Optional)"
                multiline
                rows={3}
                fullWidth
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmitResponse} 
            variant="contained" 
            disabled={!responseFile || uploading}
          >
            {uploading ? <CircularProgress size={24} /> : 'Submit Response'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageAIAnalysis;