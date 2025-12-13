import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { franchiseAPI } from "../../services/api";

const DigitalAgreement = () => {
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [initiatingEsign, setInitiatingEsign] = useState(false);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openEsignDialog, setOpenEsignDialog] = useState(false);
  const [openSignDialog, setOpenSignDialog] = useState(false);
  const [esignData, setEsignData] = useState({
    signerName: "",
    signerEmail: "",
    signerPhone: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const fetchDigitalAgreement = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await franchiseAPI.getDigitalAgreement();
      setAgreement(response.data);
      
      // Pre-fill eSign data with user info
      if (response.data.userId) {
        setEsignData({
          signerName: response.data.userId.name || "",
          signerEmail: response.data.userId.email || "",
          signerPhone: "",
        });
      }
    } catch (err) {
      setError("Failed to fetch digital agreement");
      console.error("Error fetching digital agreement:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDigitalAgreement();
  }, []);

  const handleDownloadPdf = async () => {
    try {
      setDownloading(true);
      setError("");

      // Trigger PDF download
      const response = await franchiseAPI.downloadDigitalAgreement();

      // Create a blob from the response
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `franchise_agreement_${agreement.userName.replace(/\s+/g, "_")}.pdf`
      );

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSuccess("PDF downloaded successfully!");

      // Refresh agreement status
      fetchDigitalAgreement();
    } catch (err) {
      setError("Failed to download PDF");
      console.error("Error downloading PDF:", err);
    } finally {
      setDownloading(false);
    }
  };

  const handleOpenEsignDialog = () => {
    setOpenEsignDialog(true);
  };

  const handleCloseEsignDialog = () => {
    setOpenEsignDialog(false);
    setEsignData({
      signerName: agreement?.userId?.name || "",
      signerEmail: agreement?.userId?.email || "",
      signerPhone: "",
    });
    setAgreeToTerms(false);
  };

  const handleEsignDataChange = (field, value) => {
    setEsignData({
      ...esignData,
      [field]: value,
    });
  };

  const handleInitiateEsign = async () => {
    try {
      setInitiatingEsign(true);
      setError("");

      // Validate required fields
      if (!esignData.signerName || !esignData.signerEmail || !esignData.signerPhone) {
        setError("Please fill in all required fields");
        return;
      }

      if (!agreeToTerms) {
        setError("Please agree to the terms and conditions");
        return;
      }

      // Provide the document URL for eSign
      // In a real implementation, this would be the actual URL where the PDF can be accessed
      const documentUrl = `${window.location.origin}/api/digital-agreements/download`;
      
      const requestData = {
        ...esignData,
        documentUrl: documentUrl,
      };

      const response = await franchiseAPI.initiateEsign(requestData);

      setSuccess("eSign process initiated successfully!");
      
      // Redirect user to Surepass eSign portal
      if (response.data.redirectUrl) {
        // Instead of opening in a new window, we'll provide instructions to the user
        // This avoids CORS issues that can occur with cross-origin redirects
        window.open(response.data.redirectUrl, "_blank", "noopener,noreferrer");
      }
      
      handleCloseEsignDialog();
    } catch (err) {
      setError("Failed to initiate eSign process");
      console.error("Error initiating eSign:", err);
    } finally {
      setInitiatingEsign(false);
    }
  };

  const handleOpenSignDialog = () => {
    setOpenSignDialog(true);
  };

  const handleCloseSignDialog = () => {
    setOpenSignDialog(false);
    setTransactionId("");
  };

  const handleSubmitSignedPdf = async () => {
    try {
      setSigning(true);
      setError("");

      const response = await franchiseAPI.submitSignedDigitalAgreement({
        transactionId,
      });

      setSuccess("Signed PDF submitted successfully!");
      setAgreement(response.data.agreement);
      handleCloseSignDialog();
    } catch (err) {
      setError("Failed to submit signed PDF");
      console.error("Error submitting signed PDF:", err);
    } finally {
      setSigning(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "submitted":
        return "warning";
      default:
        return "info";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "downloaded":
        return "Downloaded";
      case "signed":
        return "Signed";
      case "submitted":
        return "Submitted for Review";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Digital Agreement
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
          {agreement ? (
            <>
              <Typography variant="h6" gutterBottom>
                Franchise Agreement for {agreement.userName}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Typography variant="body1">
                  Status: <strong>{getStatusText(agreement.status)}</strong>
                </Typography>
                <Box
                  sx={{
                    bgcolor: `${getStatusColor(agreement.status)}.light`,
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    color={`${getStatusColor(agreement.status)}.dark`}
                  >
                    {agreement.status.toUpperCase()}
                  </Typography>
                </Box>
              </Box>

              {agreement.status === "rejected" && agreement.rejectionReason && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Rejection Reason:</Typography>
                  <Typography variant="body2">
                    {agreement.rejectionReason}
                  </Typography>
                </Alert>
              )}

              <Typography variant="body1" paragraph>
                Please download the franchise agreement PDF, sign it
                electronically using Surepass eSign, and submit the transaction
                ID for admin review.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  onClick={handleDownloadPdf}
                  disabled={downloading}
                  startIcon={downloading ? <CircularProgress size={20} /> : null}
                >
                  {downloading ? "Downloading..." : "Download Agreement"}
                </Button>

                {(agreement.status === "downloaded" ||
                  agreement.status === "pending") && (
                  <>
                    <Button
                      variant="outlined"
                      onClick={handleOpenEsignDialog}
                    >
                      eSign Agreement
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleOpenSignDialog}
                    >
                      Submit Signed Agreement
                    </Button>
                  </>
                )}
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                No Agreement Found
              </Typography>
              <Typography variant="body1" paragraph>
                You don't have a digital agreement yet. Please contact support.
              </Typography>
            </>
          )}
        </CardContent>
      </Card>

      {/* eSign Agreement Dialog */}
      <Dialog open={openEsignDialog} onClose={handleCloseEsignDialog} maxWidth="sm" fullWidth>
        <DialogTitle>eSign Agreement</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={esignData.signerName}
              onChange={(e) => handleEsignDataChange("signerName", e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={esignData.signerEmail}
              onChange={(e) => handleEsignDataChange("signerEmail", e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={esignData.signerPhone}
              onChange={(e) => handleEsignDataChange("signerPhone", e.target.value)}
              margin="normal"
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
              }
              label="I agree to the terms and conditions for electronic signing"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEsignDialog}>Cancel</Button>
          <Button
            onClick={handleInitiateEsign}
            variant="contained"
            disabled={initiatingEsign}
            startIcon={initiatingEsign ? <CircularProgress size={20} /> : null}
          >
            {initiatingEsign ? "Initiating..." : "Initiate eSign"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Submit Signed Agreement Dialog */}
      <Dialog open={openSignDialog} onClose={handleCloseSignDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Submit Signed Agreement</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              margin="normal"
              helperText="Enter the transaction ID from the eSign process"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSignDialog}>Cancel</Button>
          <Button
            onClick={handleSubmitSignedPdf}
            variant="contained"
            disabled={signing}
            startIcon={signing ? <CircularProgress size={20} /> : null}
          >
            {signing ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DigitalAgreement;