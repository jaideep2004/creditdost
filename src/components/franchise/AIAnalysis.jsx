import React, { useState, useEffect } from "react";
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
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar
} from "@mui/material";
import { 
  UploadFile as UploadIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  HourglassEmpty as HourglassIcon,
  CloudUpload as CloudUploadIcon,
  Analytics as AnalyticsIcon
} from "@mui/icons-material";
import { franchiseAPI } from "../../services/api";

const AIAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [analyzingDocId, setAnalyzingDocId] = useState(null);
  
  // Snackbar state for notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' // 'success', 'error', 'warning', 'info'
  });

  // Show snackbar notification
  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

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

  // Upload document with progress tracking
  const handleUpload = async () => {
    if (!selectedFile) {
      showSnackbar('Please select a file to upload', 'warning');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setShowProgressDialog(true);
    setIsAnalyzing(false);

    try {
      const formData = new FormData();
      formData.append('document', selectedFile);

      // Simulate progress during upload
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev < 60) return prev + 10; // Progress up to 60% during upload
          return prev;
        });
      }, 200);

      const response = await franchiseAPI.uploadAIAnalysisDocument(formData);
      
      clearInterval(progressInterval);
      setUploadProgress(70); // Upload complete
      
      if (response.data) {
        // Start analyzing phase
        setIsAnalyzing(true);
        setUploadProgress(80);
        
        // Simulate analysis progress
        const analysisInterval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev < 95) return prev + 2; // Slow progress during analysis
            return prev;
          });
        }, 500);

        // Poll for analysis completion
        const pollInterval = setInterval(async () => {
          try {
            const docsResponse = await franchiseAPI.getAIAnalysisDocuments();
            const uploadedDoc = docsResponse.data.find(d => 
              d.uploadedDocumentName === selectedFile.name &&
              d.claudeAnalysisStatus !== 'pending'
            );

            if (uploadedDoc) {
              clearInterval(analysisInterval);
              clearInterval(pollInterval);
              
              if (uploadedDoc.claudeAnalysisStatus === 'completed') {
                setUploadProgress(100);
                showSnackbar(
                  '✅ Analysis complete! Report sent to your email.',
                  'success'
                );
                setTimeout(() => {
                  setShowProgressDialog(false);
                }, 1500);
              } else if (uploadedDoc.claudeAnalysisStatus === 'failed') {
                showSnackbar(
                  '⚠️ Analysis failed. You can retry manually.',
                  'warning'
                );
                setTimeout(() => {
                  setShowProgressDialog(false);
                }, 2000);
              }
              
              setSelectedFile(null);
              fetchDocuments();
            }
          } catch (error) {
            console.error('Polling error:', error);
          }
        }, 3000); // Poll every 3 seconds

        // Timeout after 3 minutes
        setTimeout(() => {
          clearInterval(analysisInterval);
          clearInterval(pollInterval);
          setUploadProgress(100);
          showSnackbar(
            '📧 Upload successful! Analysis in progress. You will receive the report via email.',
            'info'
          );
          setTimeout(() => {
            setShowProgressDialog(false);
          }, 2000);
          setSelectedFile(null);
          fetchDocuments();
        }, 180000); // 3 minutes timeout
      }
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || 'Failed to upload document',
        'error'
      );
      setTimeout(() => {
        setShowProgressDialog(false);
      }, 2000);
    } finally {
      setUploading(false);
      setIsAnalyzing(false);
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

  // Trigger AI analysis manually
  const handleAnalyze = async (docId) => {
    setAnalyzingDocId(docId);
    try {
      await franchiseAPI.analyzeWithClaude(docId);
      setUploadSuccess(false);
      // Refresh documents after a delay to show processing status
      setTimeout(() => fetchDocuments(), 2000);
    } catch (error) {
      setUploadError(error.response?.data?.message || 'Failed to trigger AI analysis');
    } finally {
      setAnalyzingDocId(null);
    }
  };

  // Download Claude analysis report
  const handleDownloadAnalysis = async (docId, fileName) => {
    try {
      const response = await franchiseAPI.downloadClaudeAnalysis(docId, { responseType: 'blob' });
      
      // Create blob and download
      const blob = new Blob([response.data], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName || `analysis_${docId}.html`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download analysis:', error);
      alert('Failed to download analysis report. Please try again.');
    }
  };

  // Load documents on component mount
  useEffect(() => {
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
            Upload your credit report or any PDF/HTML document for Claude AI-powered analysis.
            The AI will analyze your document and send a comprehensive HTML report to your email. <br/>
            Analysis typically completes within 1-2 minutes.
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
            <Box sx={{ mt: 2, mb: 2 }}>
              <Alert severity="info" icon={<CloudUploadIcon />}>
                <Typography variant="body2">
                  Selected: <strong>{selectedFile.name}</strong>
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                  Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
              </Alert>
            </Box>
          )}
          
          <Button 
            variant="contained" 
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            sx={{ mt: 2 }}
            startIcon={uploading ? null : <UploadIcon />}
          >
            {uploading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                Uploading...
              </Box>
            ) : (
              'Upload & Analyze Document'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Progress Dialog */}
      <Dialog 
        open={showProgressDialog} 
        onClose={() => !uploading && setShowProgressDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isAnalyzing ? <AnalyticsIcon color="action" /> : <CloudUploadIcon color="primary" />}
            {isAnalyzing ? 'AI Analysis in Progress...' : 'Uploading Document...'}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ py: 3 }}>
            <Typography variant="body2" gutterBottom>
              {isAnalyzing 
                ? 'Claude AI is analyzing your document. This typically takes 1-2 minutes.'
                : 'Uploading your document to the server...'
              }
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <CircularProgress 
                variant="determinate" 
                value={uploadProgress} 
                size={60}
                thickness={4}
                sx={{ display: 'block', mx: 'auto', mb: 2 }}
              />
              
              <Typography variant="caption" color="text.secondary" align="center" display="block">
                {uploadProgress}% Complete
              </Typography>
            </Box>

            {isAnalyzing && (
              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="caption">
                  📊 Generating comprehensive HTML report with charts, risk analysis, and action plan...
                </Typography>
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowProgressDialog(false)}
            disabled={uploading}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

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
              {documents.map((doc) => {
                const isAnalyzing = analyzingDocId === doc._id;
                const analysisStatus = doc.claudeAnalysisStatus || 'pending';
                const hasAnalysis = doc.claudeAnalysisStatus === 'completed' && doc.claudeAnalysisHtml;
                const analysisFailed = doc.claudeAnalysisStatus === 'failed';

                return (
                  <React.Fragment key={doc._id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {doc.uploadedDocumentName}
                            {hasAnalysis && (
                              <Chip 
                                icon={<CheckCircleIcon />} 
                                label="AI Analyzed" 
                                color="success" 
                                size="small"
                                variant="outlined"
                              />
                            )}
                            {analysisStatus === 'processing' && (
                              <Chip 
                                icon={<HourglassIcon />} 
                                label="Analyzing..." 
                                color="warning" 
                                size="small"
                                variant="outlined"
                              />
                            )}
                            {analysisFailed && (
                              <Chip 
                                icon={<ErrorIcon />} 
                                label="Analysis Failed" 
                                color="error" 
                                size="small"
                                variant="outlined"
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" component="div">
                              Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" component="div">
                              Status: {doc.status}
                            </Typography>
                            {doc.analyzedAt && (
                              <Typography variant="body2" component="div">
                                Analyzed: {new Date(doc.analyzedAt).toLocaleString()}
                              </Typography>
                            )}
                            {analysisFailed && doc.claudeAnalysisError && (
                              <Typography variant="body2" color="error" component="div" sx={{ mt: 1 }}>
                                Error: {doc.claudeAnalysisError}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                        {/* Download Analysis Button */}
                        {hasAnalysis && (
                          <Tooltip title="Download AI Analysis Report">
                            <IconButton 
                              onClick={() => handleDownloadAnalysis(doc._id, doc.claudeAnalysisFileName)}
                              color="success"
                              size="small"
                            >
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        
                        {/* Re-analyze Button */}
                        {!hasAnalysis && !isAnalyzing && (
                          <Tooltip title={analysisFailed ? "Retry AI Analysis" : "Trigger AI Analysis"}>
                            <IconButton 
                              onClick={() => handleAnalyze(doc._id)}
                              disabled={analysisStatus === 'processing'}
                              color="primary"
                              size="small"
                            >
                              <RefreshIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        
                        {/* Analyzing Indicator */}
                        {isAnalyzing && (
                          <CircularProgress size={24} />
                        )}
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                );
              })}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AIAnalysis;
