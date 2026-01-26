import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Alert, 
  CircularProgress, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Chip
} from "@mui/material";
import { UploadFile as UploadIcon } from "@mui/icons-material";
import { franchiseAPI } from "../../services/api";

const AIAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'text/html' || file.name.toLowerCase().endsWith('.html'))) {
      setSelectedFile(file);
      setUploadError('');
    } else {
      setUploadError('Please select a PDF or HTML file');
      setSelectedFile(null);
    }
  };

  // Upload document
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setUploadError('');
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append('document', selectedFile);

      const response = await franchiseAPI.uploadAIAnalysisDocument(formData);
      
      if (response.data) {
        setUploadSuccess(true);
        setSelectedFile(null);
        // Refresh documents list
        fetchDocuments();
      }
    } catch (error) {
      setUploadError(error.response?.data?.message || 'Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  // Fetch documents
  const fetchDocuments = async () => {
    setLoadingDocuments(true);
    try {
      const response = await franchiseAPI.getAIAnalysisDocuments();
      setDocuments(response.data);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoadingDocuments(false);
    }
  };



  // Load documents on component mount
  React.useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        AI Analysis
      </Typography>

      {/* Upload Section */}
      <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upload Document for AI Analysis
          </Typography>
          <Typography variant="body2" paragraph>
            Upload your credit report or any PDF/HTML document for AI-powered analysis.
            Our team will review and provide insights. <br/>
            The Response will be sent to your email.
          </Typography>
          
          <input
            accept="application/pdf,.html,text/html"
            style={{ display: 'none' }}
            id="pdf-upload"
            type="file"
            onChange={handleFileChange}
          />
          
          <label htmlFor="pdf-upload">
            <Button 
              variant="outlined" 
              component="span" 
              startIcon={<UploadIcon />}
              disabled={uploading}
            >
              Select PDF/HTML File
            </Button>
          </label>
          
          {selectedFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {selectedFile.name}
            </Typography>
          )}
          
          {uploadError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {uploadError}
            </Alert>
          )}
          
          {uploadSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Document uploaded successfully! Our team will review and respond shortly.
            </Alert>
          )}
          
          <Button 
            variant="contained" 
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            sx={{ mt: 2 }}
          >
            {uploading ? <CircularProgress size={24} /> : 'Upload Document'}
          </Button>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Your Documents
          </Typography>
          
          {loadingDocuments ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : documents.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 3 }}>
              No documents uploaded yet
            </Typography>
          ) : (
            <List>
              {documents.map((doc) => (
                <React.Fragment key={doc._id}>
                  <ListItem>
                    <ListItemText 
                      primary={doc.uploadedDocumentName}
                      secondary={`Uploaded: ${new Date(doc.uploadedAt).toLocaleDateString()} | Status: ${doc.status}`}
                    />
                    <Chip 
                      label={doc.status} 
                      color={
                        doc.status === 'uploaded' ? 'primary' : 
                        doc.status === 'responded' ? 'success' : 'default'
                      } 
                      size="small" 
                      sx={{ ml: 2 }}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AIAnalysis;
