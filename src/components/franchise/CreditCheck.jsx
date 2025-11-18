import React, { useState, useEffect } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Chip,
  Link,
} from "@mui/material";
import {
  Search,
  CreditScore,
  PictureAsPdf,
  Download,
  Info,
} from "@mui/icons-material";
import { franchiseAPI } from "../../services/api";

const CreditCheck = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pan: "",
    aadhaar: "",
    dob: "",
    gender: "",
    bureau: "cibil", // Default to CIBIL as per Surepass documentation
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [creditReports, setCreditReports] = useState([]);
  const [recentReport, setRecentReport] = useState(null);
  const [availableCredits, setAvailableCredits] = useState(0);

  // Bureau options
  const bureauOptions = [
    { value: "cibil", label: "CIBIL" },
    { value: "crif", label: "CRIF" },
    { value: "experian", label: "Experian" },
    // { value: "equifax", label: "Equifax" },
  ];

  // Load recent credit reports and available credits on component mount
  useEffect(() => {
    loadCreditReports();
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const response = await franchiseAPI.getDashboardStats();
      setAvailableCredits(response.data.stats.credits);
    } catch (err) {
      console.error("Error loading dashboard stats:", err);
    }
  };

  const loadCreditReports = async () => {
    try {
      setLoading(true);
      const response = await franchiseAPI.getCreditReports();
      setCreditReports(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading credit reports:", err);
      setError("Failed to load credit reports");
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBureauChange = (e) => {
    setFormData({
      ...formData,
      bureau: e.target.value,
    });
  };

  const handleCheckCredit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    // Validate form data before sending
    if (!formData.name || formData.name.trim().length < 2) {
      setError("Please enter a valid customer name (at least 2 characters)");
      setSaving(false);
      return;
    }

    // Validate mobile number (exactly 10 digits)
    if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      setSaving(false);
      return;
    }

    // Validate PAN if provided (alphanumeric, 10 characters)
    if (formData.pan && !/^[A-Za-z0-9]{10}$/.test(formData.pan)) {
      setError("Please enter a valid PAN number (10 alphanumeric characters)");
      setSaving(false);
      return;
    }

    // Validate Aadhaar if provided (exactly 12 digits)
    if (formData.aadhaar && !/^[0-9]{12}$/.test(formData.aadhaar)) {
      setError("Please enter a valid 12-digit Aadhaar number");
      setSaving(false);
      return;
    }

    // Retry mechanism
    const maxRetries = 2;
    let retries = 0;

    const attemptRequest = async () => {
      try {
        // Prepare data for API call
        const requestData = {
          name: formData.name.trim(),
          mobile: formData.mobile.trim(),
          bureau: formData.bureau,
        };

        // Add optional fields if provided
        if (formData.pan) requestData.pan = formData.pan.trim().toUpperCase();
        if (formData.aadhaar) requestData.aadhaar = formData.aadhaar.trim();
        if (formData.dob) requestData.dob = formData.dob;
        if (formData.gender) requestData.gender = formData.gender;

        // Call the API to check credit
        const response = await franchiseAPI.getCreditReport(requestData);

        setSuccess(
          `Credit check completed successfully from ${formData.bureau.toUpperCase()}! ${
            response.data.remainingCredits
          } credits remaining.`
        );
        setRecentReport(response.data.creditReport);
        setAvailableCredits(response.data.remainingCredits);

        // Reload reports to include the new one
        await loadCreditReports();
      } catch (err) {
        console.error("Credit check error:", err);

        // Handle specific error types
        if (
          err.response?.data?.error === "TIMEOUT_ERROR" ||
          err.response?.status === 504
        ) {
          if (retries < maxRetries) {
            retries++;
            // Wait 2 seconds before retry
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return attemptRequest();
          } else {
            setError(
              "Request timeout when connecting to credit bureau after multiple attempts. Please try again later."
            );
          }
        } else if (
          err.response?.data?.error === "NETWORK_ERROR" ||
          err.response?.status === 502
        ) {
          if (retries < maxRetries) {
            retries++;
            // Wait 2 seconds before retry
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return attemptRequest();
          } else {
            setError(
              "Network error when connecting to credit bureau after multiple attempts. Please check your internet connection and try again."
            );
          }
        } else if (err.response?.data?.message) {
          // Show specific error message from backend
          let errorMessage = err.response.data.message;
          // If there are detailed validation errors, include them
          if (
            err.response.data.details &&
            Array.isArray(err.response.data.details)
          ) {
            errorMessage += ": " + err.response.data.details.join(", ");
          }
          setError(errorMessage);
        } else if (err.response?.status === 400) {
          setError(
            "Invalid request data. Please check all fields and try again."
          );
        } else if (err.response?.status === 401) {
          setError("Authentication failed. Please log in again.");
        } else if (err.response?.status === 403) {
          setError(
            "Access denied. You do not have permission to perform this action."
          );
        } else if (err.response?.status === 404) {
          setError("Resource not found. Please try again or contact support.");
        } else if (err.response?.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("Failed to check credit score. Please try again.");
        }
      }
    };

    await attemptRequest();
    setSaving(false);
  };

  const getScoreColor = (score) => {
    if (score >= 750) return "success";
    if (score >= 700) return "info";
    if (score >= 650) return "warning";
    return "error";
  };

  const getScoreLabel = (score) => {
    if (score >= 750) return "Excellent";
    if (score >= 700) return "Good";
    if (score >= 650) return "Fair";
    return "Poor";
  };

  const getReportUrl = (report) => {
    // Use local path if available, otherwise use the original report URL
    if (report.localPath) {
      return `${"http://localhost:5000"}${report.localPath}`;
    }
    return report.reportUrl;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Credit Check
      </Typography>

      {/* Credits Display */}
      <Card
        sx={{
          mb: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.default",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" component="div">
              Available Credits
            </Typography>
            <Chip
              label={availableCredits}
              color="primary"
              size="large"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                height: "auto",
                py: 1,
                px: 2,
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Check Credit" />
        <Tab label="Recent Reports" />
      </Tabs>

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

      {activeTab === 0 && (
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
                    helperText="Enter the full name of the customer"
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
                    inputProps={{
                      maxLength: 10,
                      pattern: "[0-9]{10}",
                    }}
                    helperText="Enter exactly 10 digits without spaces or dashes"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="pan"
                    name="pan"
                    label="PAN Number"
                    fullWidth
                    value={formData.pan}
                    onChange={handleInputChange}
                    inputProps={{
                      style: { textTransform: "uppercase" },
                      maxLength: 10,
                      pattern: "[A-Za-z0-9]{10}",
                    }}
                    helperText="10-character PAN number (e.g., ABCDE1234F)"
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    id="aadhaar"
                    name="aadhaar"
                    label="Aadhaar Number (Optional)"
                    fullWidth
                    value={formData.aadhaar}
                    onChange={handleInputChange}
                    inputProps={{ 
                      maxLength: 12,
                      pattern: "[0-9]{12}"
                    }}
                    helperText="12-digit Aadhaar number"
                  />
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="dob"
                    name="dob"
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    value={formData.dob}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth style={{ minWidth: "200px" }}>
                    <InputLabel>Gender (Optional)</InputLabel>
                    <Select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      label="Gender (Optional)"
                      onChange={handleInputChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth style={{ minWidth: "200px" }}>
                    <InputLabel id="bureau-label">Credit Bureau</InputLabel>
                    <Select
                      labelId="bureau-label"
                      id="bureau"
                      name="bureau"
                      value={formData.bureau}
                      label="Credit Bureau"
                      onChange={handleBureauChange}
                    >
                      {bureauOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<CreditScore />}
                      disabled={saving}
                      sx={{ py: 1.5, px: 4 }}
                    >
                      {saving ? <CircularProgress size={24} /> : "Check Credit"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {recentReport && (
              <Card sx={{ mt: 3, bgcolor: "background.default" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Credit Report
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="textSecondary">
                        Name
                      </Typography>
                      <Typography variant="body1">
                        {recentReport.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="textSecondary">
                        Bureau
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ textTransform: "uppercase" }}
                      >
                        {recentReport.bureau}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="textSecondary">
                        Mobile
                      </Typography>
                      <Typography variant="body1">
                        {recentReport.mobile}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="textSecondary">
                        Credit Score
                      </Typography>
                      <Chip
                        label={`${recentReport.score} (${getScoreLabel(
                          recentReport.score
                        )})`}
                        color={getScoreColor(recentReport.score)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {recentReport.reportUrl && (
                        <Button
                          variant="outlined"
                          startIcon={<PictureAsPdf />}
                          endIcon={<Download />}
                          component={Link}
                          href={recentReport.reportUrl}
                          target="_blank"
                        >
                          Download PDF Report
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 1 && (
        <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Credit Reports
            </Typography>

            {creditReports.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: "center", py: 4 }}>
                No credit reports found. Check a customer's credit to see
                reports here.
              </Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="credit reports table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Mobile</TableCell>
                      <TableCell>Bureau</TableCell>
                      <TableCell>Credit Score</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {creditReports.map((report) => (
                      <TableRow
                        key={report.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {report.name}
                        </TableCell>
                        <TableCell>{report.mobile}</TableCell>
                        <TableCell>
                          <Chip
                            label={
                              report.bureau
                                ? report.bureau.toUpperCase()
                                : "N/A"
                            }
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          {report.score ? (
                            <Chip
                              label={report.score}
                              color={getScoreColor(report.score)}
                              size="small"
                            />
                          ) : (
                            <Chip label="N/A" size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(report.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {getReportUrl(report) && (
                            <Button
                              size="small"
                              startIcon={<PictureAsPdf />}
                              component={Link}
                              href={getReportUrl(report)}
                              target="_blank"
                            >
                              PDF
                            </Button>
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
      )}

      <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Info color="info" sx={{ mr: 1 }} />
            <Typography variant="h6">Credit Bureau Information</Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Select the credit bureau you want to check:
          </Typography>
          <ul>
            <li>
              <strong>Equifax</strong> - One of India's leading credit bureaus
            </li>
            <li>
              <strong>Experian</strong> - Global credit reporting agency with
              operations in India
            </li>
            <li>
              <strong>CIBIL</strong> - TransUnion CIBIL, India's first credit
              information company
            </li>
            <li>
              <strong>CRIF</strong> - Credit rating and information company
            </li>
          </ul>
          <Typography variant="body2" color="textSecondary">
            Providing additional information like PAN, Aadhaar, DOB, and Gender
            can improve the accuracy of credit reports.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreditCheck;
