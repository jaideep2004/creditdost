import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  Card,
  CardContent,
  styled,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Snackbar, // Add Snackbar for toast notifications
  Alert as MuiAlert, // Rename to avoid conflict
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth.jsx";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
} from "@mui/icons-material";

// Toast notification component
const ToastAlert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.shadows[15],
  overflow: "visible",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: theme.shape.borderRadius * 3.5,
    zIndex: -1,
  },
}));

const IllustrationSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, #ffffff 0%, #03dac6 100%)`,
  minHeight: "100%",
  borderRadius: `${theme.shape.borderRadius * 3}px 0 0 ${
    theme.shape.borderRadius * 3
  }px`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
  color: "white",
  [theme.breakpoints.down("md")]: {
    borderRadius: `${theme.shape.borderRadius * 3}px ${
      theme.shape.borderRadius * 3
    }px 0 0`,
  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
  },
}));

const LogoBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(3),
  "& svg": {
    width: 80,
    height: 80,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "50%",
    padding: theme.spacing(2),
    color: "white",
  },
}));

// Indian states list
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [language, setLanguage] = useState("english");
  const [otherLanguage, setOtherLanguage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" }); // Toast state
  const navigate = useNavigate();
  const { register } = useAuth();

  // Handle toast close
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast({ ...toast, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!name || !email || !phone || !state || !pincode || !language) {
      setError("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    // Pincode validation (6 digits)
    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(pincode)) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }

    // Language validation
    const selectedLanguage = language === "other" ? otherLanguage : language;
    if (language === "other" && !otherLanguage.trim()) {
      setError("Please specify your preferred language");
      return;
    }

    try {
      // For registration without password, we'll send a placeholder
      const result = await register({
        name,
        email,
        phone,
        state,
        pincode,
        language: selectedLanguage,
        password: "temp_password", // Placeholder password
      });

      setSuccess(true);
      // Show success toast
      setToast({
        open: true,
        message: "Registration successful! Redirecting to packages page...",
        severity: "success"
      });
      
      // Redirect to packages page after a short delay
      setTimeout(() => {
        navigate("/franchise/packages"); // Redirect to packages page
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      // Show error toast
      setToast({
        open: true,
        message: err.response?.data?.message || "Registration failed. Please try again.",
        severity: "error"
      });
    }
  };

  return (
    <GradientBackground>
      <Container maxWidth="lg">
        <StyledCard>
          <Grid container style={{ flexWrap: "nowrap" }}>
            <Grid item xs={12} md={5} style={{ flex: "0.8" }}>
              <IllustrationSection>
               
                <Typography
                  variant="h4"
                  fontWeight="700"
                  textAlign="center"
                  mb={2}
                  color="black"
                >
                  Welcome to
                </Typography>
                 <LogoBox>
                  <img src="/images/cred.png" alt="Logo" style={{width: "292px"}}/>
                </LogoBox>
                <Typography
                  variant="body1"
                  textAlign="center"
                    color="black"
                  sx={{ maxWidth: 300 }}
                >
                  Join our franchise network and empower businesses with credit
                  verification services
                </Typography>
              </IllustrationSection>
            </Grid>
            <Grid item xs={12} md={7} style={{ flex: "1" }}>
              <FormSection>
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  mb={3}
                  fontWeight="700"
                >
                  Create Your Account
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                    Registration successful! Please check your email for further
                    instructions. You will be redirected to the packages page shortly.
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <div
                      style={{ display: "flex", gap: "16px", width: "100%" }}
                    >
                      <Grid item xs={12} sm={6} style={{ width: "100%" }}>
                        <TextField
                          fullWidth
                          required
                          id="name"
                          label="Full Name"
                          name="name"
                          autoComplete="name"
                          autoFocus
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} style={{ width: "100%" }}>
                        <TextField
                          fullWidth
                          required
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </div>

                    <div
                      style={{ display: "flex", gap: "16px", width: "100%" }}
                    >
                      <Grid item xs={12} sm={6} style={{ width: "100%" }}>
                        <TextField
                          fullWidth
                          required
                          id="phone"
                          label="Phone Number"
                          name="phone"
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} style={{ width: "100%" }}>
                        <TextField
                          fullWidth
                          required
                          id="pincode"
                          label="Pincode"
                          name="pincode"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </div>

                    <Grid item xs={12} sm={6} style={{ width: "100%" }}>
                      <FormControl fullWidth required>
                        <InputLabel id="state-label">State</InputLabel>
                        <Select
                          labelId="state-label"
                          id="state"
                          value={state}
                          label="State"
                          onChange={(e) => setState(e.target.value)}
                          startAdornment={
                            <InputAdornment position="start">
                              <LocationIcon />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="">
                            <em>Select State</em>
                          </MenuItem>
                          {indianStates.map((state) => (
                            <MenuItem key={state} value={state}>
                              {state}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl
                        component="fieldset"
                        fullWidth
                        margin="normal"
                        required
                      >
                        <Typography
                          component="legend"
                          variant="body1"
                          sx={{ mb: 1 }}
                        >
                          Preferred Language
                        </Typography>
                        <RadioGroup
                          row
                          aria-label="language"
                          name="language"
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                        >
                          <FormControlLabel
                            value="english"
                            control={<Radio />}
                            label="English"
                          />
                          <FormControlLabel
                            value="hindi"
                            control={<Radio />}
                            label="Hindi"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    {language === "other" && (
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          margin="normal"
                          id="other-language"
                          label="Specify Language"
                          value={otherLanguage}
                          onChange={(e) => setOtherLanguage(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LanguageIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    )}
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 3,
                      mb: 2,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 600,
                      boxShadow: "0 4px 12px rgba(98, 0, 234, 0.3)",
                    }}
                  >
                    Register
                  </Button>

                  <Box textAlign="center">
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <Typography
                        variant="body2"
                        color="primary.main"
                        fontWeight="500"
                      >
                        {"Already have an account? Sign In"}
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              </FormSection>
            </Grid>
          </Grid>
        </StyledCard>
      </Container>
      
      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <ToastAlert
          onClose={handleToastClose}
          severity={toast.severity}
          sx={{ width: '100%' }}
        >
          {toast.message}
        </ToastAlert>
      </Snackbar>
    </GradientBackground>
  );
};

export default Register;