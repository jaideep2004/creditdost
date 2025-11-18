import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  styled,
  Checkbox,
  FormControlLabel,
  Divider,
  Paper,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Work,
  AccountBalance,
  CreditCard,
  CheckCircle,
  TrendingUp,
  Security,
  SupportAgent,
  VerifiedUser,
  Star,
  ArrowForward,
  AttachMoney,
  Home,
  Business,
  DriveEta,
  CreditScore,
} from "@mui/icons-material";
import Header from "./homepage/Header";
import HomePageFooter from "./homepage/HomePageFooter";
import api from "../services/api";

const PageBackground = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
  minHeight: "100vh",
  paddingTop: "20px",
  animation: "fadeIn 0.5s ease-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)",
  borderRadius: "24px",
  padding: theme.spacing(8, 4),
  color: "white",
  marginBottom: theme.spacing(6),
  textAlign: "center",
  boxShadow: "0 20px 40px rgba(3, 105, 161, 0.3)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-100px",
    right: "-100px",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)",
    animation: "pulse 6s ease-in-out infinite",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-80px",
    left: "-80px",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
    animation: "float 8s ease-in-out infinite",
  },
  "@keyframes pulse": {
    "0%, 100%": { transform: "scale(1)", opacity: 1 },
    "50%": { transform: "scale(1.1)", opacity: 0.7 },
  },
  "@keyframes float": {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-20px)" },
  },
  "@keyframes fadeInUp": {
    "0%": { opacity: 0, transform: "translateY(30px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
  "@keyframes fadeInDown": {
    "0%": { opacity: 0, transform: "translateY(-30px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(8),
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(6),
  position: "relative",
  animation: "fadeIn 0.6s ease-out",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-15px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "80px",
    height: "4px",
    background: "linear-gradient(90deg, #0ea5e9, #0891b2)",
    borderRadius: "2px",
    animation: "expandWidth 1s ease-out",
  },
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  "@keyframes expandWidth": {
    "0%": { width: "0px" },
    "100%": { width: "80px" },
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.03)",
  background: "white",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  height: "100%",
  animation: "fadeIn 0.6s ease-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
  },
}));

const ProcessStepCard = styled(StyledCard)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4),
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  height: "100%",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
  },
  animation: "fadeIn 0.6s ease-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
}));

const FeatureCard = styled(StyledCard)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  padding: theme.spacing(4),
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "&:hover": {
    transform: "translateY(-5px)",
    background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
  },
  animation: "fadeIn 0.6s ease-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
}));

const LoanCategoryCard = styled(StyledCard)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(3),
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "&:hover": {
    transform: "translateY(-5px)",
    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
  },
  animation: "fadeIn 0.6s ease-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.8, 4.5),
  borderRadius: 16,
  fontWeight: 700,
  fontSize: "1.1rem",
  textTransform: "none",
  transition: "all 0.4s ease",
  background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
  boxShadow: "0 10px 25px rgba(14, 165, 233, 0.4)",
  "&:hover": {
    transform: "translateY(-5px) scale(1.02)",
    boxShadow: "0 15px 35px rgba(14, 165, 233, 0.5)",
    background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
  },
  "&:disabled": {
    background: "#cbd5e1",
    transform: "none",
    boxShadow: "none",
  },
}));

const FormSection = styled(StyledCard)(({ theme }) => ({
  padding: theme.spacing(5),
  marginBottom: theme.spacing(6),
  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  animation: "fadeIn 0.8s ease-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(30px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
}));

const NoteBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
  borderRadius: "16px",
  border: "1px solid #fde68a",
  boxShadow: "0 5px 15px rgba(251, 191, 36, 0.2)",
  animation: "fadeIn 0.7s ease-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
}));

const ContactCard = styled(StyledCard)(({ theme }) => ({
  padding: theme.spacing(5),
  textAlign: "center",
  background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)",
  color: "white",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-50px",
    right: "-50px",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.05)",
    animation: "pulse 4s ease-in-out infinite",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-80px",
    left: "-80px",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.03)",
    animation: "float 6s ease-in-out infinite",
  },
  "@keyframes pulse": {
    "0%, 100%": { transform: "scale(1)", opacity: 0.5 },
    "50%": { transform: "scale(1.1)", opacity: 0.8 },
  },
  "@keyframes float": {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-15px)" },
  },
  "@keyframes floatIcon": {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-10px)" },
  },
  "& .MuiSvgIcon-root": {
    color: "#7dd3fc",
    transition: "transform 0.3s ease",
  },
  "&:hover .MuiSvgIcon-root": {
    transform: "scale(1.2) rotate(5deg)",
  },
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 20px 40px rgba(3, 105, 161, 0.5)",
  },
  transition: "all 0.4s ease",
}));

const IndianStates = [
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

const LoanAmountOptions = [
  "Below ₹10,000",
  "₹10,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "Above ₹1,00,000",
];

const LoanPurposeOptions = ["Personal", "Business", "Home", "Vehicle", "Other"];

const ApplyForLoanPage = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    city: "",
    state: "",
    monthlyIncome: "",
    creditScore: "",
    loanAmount: "",
    loanPurpose: "",
    message: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    if (!formData.customerName || formData.customerName.length < 2) {
      setError("Please enter your full name");
      return false;
    }
    if (
      !formData.customerEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)
    ) {
      setError("Please enter a valid email address");
      return false;
    }
    if (
      !formData.customerPhone ||
      !/^[0-9]{10}$/.test(formData.customerPhone)
    ) {
      setError("Please enter a valid 10-digit mobile number");
      return false;
    }
    if (!formData.city) {
      setError("Please enter your city");
      return false;
    }
    if (!formData.state) {
      setError("Please select your state");
      return false;
    }
    if (!formData.loanAmount) {
      setError("Please select the loan amount required");
      return false;
    }
    if (!formData.loanPurpose) {
      setError("Please select the loan purpose");
      return false;
    }
    if (!formData.consent) {
      setError("Please agree to the consent checkbox");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Format the data - only send fields that are validated by the backend
      const submissionData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        city: formData.city,
        state: formData.state,
        monthlyIncome: formData.monthlyIncome || undefined,
        creditScore: formData.creditScore || undefined,
        loanAmount: formData.loanAmount,
        loanPurpose: formData.loanPurpose,
        message: formData.message || undefined,
        consent: formData.consent,
        language: "en",
        fullAddress: `${formData.city}, ${formData.state}`,
        occupation: formData.loanPurpose,
        pincode: "000000", // Placeholder since not collected in new form
      };

      // Submit to backend
      const response = await api.post("/forms/business", submissionData);

      if (response.data) {
        setSuccess(true);
        // Reset form
        setFormData({
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          city: "",
          state: "",
          monthlyIncome: "",
          creditScore: "",
          loanAmount: "",
          loanPurpose: "",
          message: "",
          consent: false,
        });
      }
    } catch (err) {
      console.log("Error response:", err.response);
      if (err.response?.data?.details) {
        setError(`Validation error: ${err.response.data.details.join(", ")}`);
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to submit your application. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <PageBackground>
        <Container sx={{ py: 4 }} style={{ maxWidth: "1400px" }}>
          {/* Hero Section */}
          <HeroSection>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: "2.2rem", md: "3rem" },
                lineHeight: 1.2,
                animation: "fadeInDown 1s ease-out",
                "@keyframes fadeInDown": {
                  "0%": { opacity: 0, transform: "translateY(-30px)" },
                  "100%": { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              Guaranteed Loan Approval for Low Credit Scores
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                maxWidth: "800px",
                mx: "auto",
                opacity: 0.95,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                lineHeight: 1.6,
                animation: "fadeInUp 1s ease-out 0.3s both",
              }}
            >
              Rebuild your creditworthiness and secure financing even with a
              poor CIBIL score
            </Typography>
          </HeroSection>

          {/* Challenge Section */}
          <SectionWrapper>
            <SectionHeader>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "#0f172a",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  marginTop:"100px"
                }}
              >
                The Credit Challenge in India
              </Typography>
            </SectionHeader>

            <StyledCard>
              <CardContent sx={{ p: { xs: 3, md: 6 } }}>
                <Grid
                  container
                  spacing={4}
                  alignItems="center"
                  style={{ flexWrap: "nowrap" }}
                >
                  <Grid item xs={12} md={6} style={{ flex: "1" }}>
                    <Box sx={{ pr: { md: 4 } }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: "#0c4a6e",
                          mb: 3,
                        }}
                      >
                        Struggling to Get a Loan Because of a Low Credit Score?
                      </Typography>

                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#334155",
                            fontSize: "1.1rem",
                            lineHeight: 1.8,
                            mb: 2,
                          }}
                        >
                          You're not alone — thousands of people in India are
                          denied credit every day due to low CIBIL scores or
                          past defaults.
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{
                            color: "#334155",
                            fontSize: "1.1rem",
                            lineHeight: 1.8,
                            mb: 2,
                          }}
                        >
                          At Credit Dost, we specialize in helping individuals
                          rebuild their creditworthiness and connect with
                          verified lending institutions that consider applicants
                          with low credit scores.
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{
                            color: "#334155",
                            fontSize: "1.1rem",
                            lineHeight: 1.8,
                          }}
                        >
                          Our expert team works with NBFCs and financial
                          institutions to find genuine loan options while
                          simultaneously improving your credit profile.
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6} style={{ flex: "1" }}>
                    <Box
                      sx={{
                        background:
                          "linear-gradient(135deg, #0ea5e9 0%, #0891b2 100%)",
                        borderRadius: "16px",
                        p: 4,
                        color: "white",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Box sx={{ textAlign: "center", mb: 3 }}>
                        <CreditScore sx={{ fontSize: 80, mb: 2 }} />
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: 700, mb: 1 }}
                        >
                          Credit Score Recovery
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9 }}>
                          Our Specialized Approach
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 2 }}>
                        {[
                          "Personalized credit repair plans",
                          "Verified lender connections",
                          "Ongoing credit monitoring",
                          "Expert financial guidance",
                        ].map((item, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 2,
                              p: 1,
                              borderRadius: "8px",
                              "&:hover": {
                                background: "rgba(255,255,255,0.1)",
                              },
                            }}
                          >
                            <CheckCircle sx={{ mr: 2, color: "#a7f3d0" }} />
                            <Typography variant="body1">{item}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </StyledCard>
          </SectionWrapper>

          {/* Our Process Section */}
          <SectionWrapper>
            <SectionHeader>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "#0f172a",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  marginTop:"110px"
                }}
              >
                Our 5-Step Success Process
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#64748b",
                  mt: 2,
                  maxWidth: "700px",
                  mx: "auto",
                }}
              >
                A transparent and result-driven approach to credit recovery and
                loan facilitation
              </Typography>
            </SectionHeader>

            <Grid container spacing={4} style={{ flexWrap: "nowrap" }}>
              {[
                {
                  icon: <CreditScore sx={{ fontSize: 40 }} />,
                  step: "01",
                  title: "Credit Report Analysis",
                  description:
                    "We evaluate your report and find the exact issues affecting your score.",
                },
                {
                  icon: <TrendingUp sx={{ fontSize: 40 }} />,
                  step: "02",
                  title: "Credit Improvement Plan",
                  description:
                    "You get a personalized roadmap to strengthen your financial profile.",
                },
                {
                  icon: <Business sx={{ fontSize: 40 }} />,
                  step: "03",
                  title: "Loan Matching & Assistance",
                  description:
                    "We connect you with lenders suitable for your credit category.",
                },
                {
                  icon: <SupportAgent sx={{ fontSize: 40 }} />,
                  step: "04",
                  title: "Documentation Support",
                  description:
                    "Our team assists you in every step of your application.",
                },
                {
                  icon: <VerifiedUser sx={{ fontSize: 40 }} />,
                  step: "05",
                  title: "Post-Loan Support",
                  description:
                    "We continue helping you rebuild and maintain your credit health.",
                },
              ].map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  style={{ flex: "1" }}
                >
                  <ProcessStepCard>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "20px",
                        background:
                          "linear-gradient(135deg, #0ea5e9 0%, #0891b2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        color: "white",
                        mx: "auto",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box sx={{ position: "relative", mb: 2 }}>
                      <Typography
                        variant="h2"
                        sx={{
                          fontWeight: 800,
                          color: "#0ea5e9",
                          opacity: 0.1,
                          position: "absolute",
                          top: "-20px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          fontSize: "4rem",
                          zIndex: 0,
                        }}
                      >
                        {item.step}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: "#0f172a",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#64748b",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </ProcessStepCard>
                </Grid>
              ))}
            </Grid>
          </SectionWrapper>

          {/* Loan Categories Section */}
          <SectionWrapper>
            <SectionHeader>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "#0f172a",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  marginTop:"110px"
                }}
              >
                Loan Categories We Facilitate
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#64748b",
                  mt: 2,
                  maxWidth: "700px",
                  mx: "auto",
                }}
              >
                Access to diverse financing options regardless of your credit
                history
              </Typography>
            </SectionHeader>

            <Grid container spacing={3} style={{ justifyContent: "center" }}>
              {[
                {
                  icon: <AccountBalance />,
                  title: "Personal Loan",
                  description: "For individuals with low credit scores",
                },
                {
                  icon: <Business />,
                  title: "Business Loan",
                  description: "Funding for entrepreneurs and businesses",
                },
                {
                  icon: <Home />,
                  title: "Loan Against Property",
                  description: "Secured financing with property collateral",
                },
                {
                  icon: <DriveEta />,
                  title: "Vehicle Loan",
                  description: "For cars, bikes, and commercial vehicles",
                },
                {
                  icon: <CreditCard />,
                  title: "Credit Card Services",
                  description: "Re-issuance or limit enhancement",
                },
              ].map((category, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <LoanCategoryCard>
                    <Box
                      sx={{
                        minWidth: 60,
                        height: 60,
                        borderRadius: "16px",
                        background:
                          "linear-gradient(135deg, #0ea5e9 0%, #0891b2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 3,
                        color: "white",
                      }}
                    >
                      {category.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: "#0f172a",
                        }}
                      >
                        {category.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#64748b",
                        }}
                      >
                        {category.description}
                      </Typography>
                    </Box>
                  </LoanCategoryCard>
                </Grid>
              ))}
            </Grid>
          </SectionWrapper>

          {/* Why Choose Credit Dost Section */}
          <SectionWrapper>
            <SectionHeader>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "#0f172a",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  marginTop:"110px"
                }}
              >
                Why Choose Credit Dost
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#64748b",
                  mt: 2,
                  maxWidth: "700px",
                  mx: "auto",
                }}
              >
                Our commitment to transparency, expertise, and results sets us
                apart
              </Typography>
            </SectionHeader>

            <Grid container spacing={4}>
              {[
                {
                  icon: <VerifiedUser sx={{ fontSize: 35 }} />,
                  title: "100% Transparent Process",
                  description: "No hidden fees or misleading promises",
                },
                {
                  icon: <SupportAgent sx={{ fontSize: 35 }} />,
                  title: "Dedicated Experts",
                  description: "Certified credit and loan specialists",
                },
                {
                  icon: <LocationOn sx={{ fontSize: 35 }} />,
                  title: "PAN-India Coverage",
                  description: "Services available across all Indian states",
                },
                {
                  icon: <Work sx={{ fontSize: 35 }} />,
                  title: "All Employment Types",
                  description:
                    "Support for salaried and self-employed individuals",
                },
                {
                  icon: <Security sx={{ fontSize: 35 }} />,
                  title: "Data Security",
                  description:
                    "Your privacy and information are fully protected",
                },
                {
                  icon: <TrendingUp sx={{ fontSize: 35 }} />,
                  title: "Proven Results",
                  description: "Thousands of successful credit recoveries",
                },
              ].map((feature, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  style={{ width: "31%" }}
                >
                  <FeatureCard>
                    <Box
                      sx={{
                        minWidth: 50,
                        height: 50,
                        borderRadius: "12px",
                        background:
                          "linear-gradient(135deg, #0ea5e9 0%, #0891b2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                        color: "white",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: "#0f172a",
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#64748b",
                          lineHeight: 1.6,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>
          </SectionWrapper>

          {/* Important Note Section */}
          <SectionWrapper>
            <SectionHeader>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "#0f172a",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  marginTop:"110px"
                }}
              >
                Important Disclosure
              </Typography>
            </SectionHeader>

            <NoteBox>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Star sx={{ fontSize: 30, color: "#f59e0b", mr: 1 }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#92400e",
                  }}
                >
                  Please Read Carefully
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: "#92400e",
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  mb: 2,
                }}
              >
                Credit Dost is not a direct lender or NBFC. We work as your
                trusted credit improvement and facilitation partner, connecting
                you with verified lending institutions after reviewing and
                optimizing your credit profile.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#92400e",
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                }}
              >
                All final approvals are subject to lender terms and eligibility.
                We do not guarantee loan approval, but we maximize your chances
                through our expert guidance and verified lender network.
              </Typography>
            </NoteBox>
          </SectionWrapper>

          {/* Application Form Section */}
          <SectionWrapper>
            <SectionHeader>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "#0f172a",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  marginTop:"110px"
                }}
              >
                Apply for Loan Assistance
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#64748b",
                  mt: 2,
                  maxWidth: "700px",
                  mx: "auto",
                }}
              >
                Complete the form below to start your journey toward financial
                recovery
              </Typography>
            </SectionHeader>

            <FormSection>
              {success ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Box sx={{ mb: 4 }}>
                    <AccountBalance
                      sx={{ fontSize: 100, color: "#10b981", mb: 2 }}
                    />
                    <Typography
                      variant="h3"
                      sx={{ mb: 2, fontWeight: 700, color: "#0f172a" }}
                    >
                      Application Submitted Successfully!
                    </Typography>
                    <Typography
                      sx={{
                        mb: 3,
                        color: "#64748b",
                        fontSize: "1.2rem",
                        maxWidth: "600px",
                        mx: "auto",
                      }}
                    >
                      Thank you for applying with Credit Dost!
                    </Typography>
                    <Typography
                      sx={{
                        color: "#64748b",
                        fontSize: "1.1rem",
                        maxWidth: "600px",
                        mx: "auto",
                      }}
                    >
                      Our credit advisor will contact you within 24 working
                      hours to discuss your eligibility and guide you through
                      the next steps.
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <>
                  {error && (
                    <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid
                      container
                      spacing={4}
                      style={{ flexDirection: "column" }}
                    >
                      {/* Personal Information Section */}
                      <Grid item xs={12}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 3 }}
                        >
                          <Person sx={{ color: "#0ea5e9", mr: 2 }} />
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: "#0f172a",
                            }}
                          >
                            Personal Information
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />
                      </Grid>

                      <div style={{ display: "flex", gap: "15px" }}>
                        <Grid item xs={12} md={6} style={{ width: "100%" }}>
                          <TextField
                            fullWidth
                            required
                            label="Full Name"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            variant="outlined"
                            size="medium"
                          />
                        </Grid>

                        <Grid item xs={12} md={6} style={{ width: "100%" }}>
                          <TextField
                            fullWidth
                            required
                            label="Email Address"
                            name="customerEmail"
                            type="email"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            variant="outlined"
                            size="medium"
                          />
                        </Grid>
                      </div>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          required
                          label="Mobile Number"
                          name="customerPhone"
                          value={formData.customerPhone}
                          onChange={handleChange}
                          variant="outlined"
                          size="medium"
                        />
                      </Grid>

                      {/* Address Information Section */}
                      <Grid item xs={12}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", my: 3 }}
                        >
                          <LocationOn sx={{ color: "#0ea5e9", mr: 2 }} />
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: "#0f172a",
                            }}
                          >
                            Address Information
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />
                      </Grid>

                      <div style={{ display: "flex", gap: "15px" }}>
                        <Grid item xs={12} md={6} style={{ width: "100%" }}>
                          <TextField
                            fullWidth
                            required
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            variant="outlined"
                            size="medium"
                          />
                        </Grid>

                        <Grid item xs={12} md={6} style={{ width: "100%" }}>
                          <FormControl fullWidth required>
                            <InputLabel>State</InputLabel>
                            <Select
                              value={formData.state}
                              label="State"
                              name="state"
                              onChange={handleChange}
                              size="medium"
                            >
                              <MenuItem value="">
                                <em>Select State</em>
                              </MenuItem>
                              {IndianStates.map((state) => (
                                <MenuItem key={state} value={state}>
                                  {state}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </div>

                      {/* Financial Information Section */}

                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            my: 3,
                          }}
                        >
                          <AttachMoney sx={{ color: "#0ea5e9", mr: 2 }} />
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: "#0f172a",
                            }}
                          >
                            Financial Information
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />
                      </Grid>
                      <div style={{ display: "flex", gap: "15px" }}>
                        <Grid item xs={12} md={6} style={{ width: "100%" }}>
                          <TextField
                            fullWidth
                            label="Monthly Income (₹)"
                            name="monthlyIncome"
                            type="number"
                            value={formData.monthlyIncome}
                            onChange={handleChange}
                            variant="outlined"
                            size="medium"
                          />
                        </Grid>

                        <Grid item xs={12} md={6} style={{ width: "100%" }}>
                          <TextField
                            fullWidth
                            label="Current Credit Score (if known)"
                            name="creditScore"
                            type="number"
                            value={formData.creditScore}
                            onChange={handleChange}
                            variant="outlined"
                            size="medium"
                          />
                        </Grid>
                      </div>

                      {/* Loan Details Section */}
                      <Grid item xs={12}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", my: 3 }}
                        >
                          <Work sx={{ color: "#0ea5e9", mr: 2 }} />
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: "#0f172a",
                            }}
                          >
                            Loan Details
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />
                      </Grid>

                      <div style={{ display: "flex", gap: "15px" }}>
                        <Grid item xs={12} md={6} style={{ width: "100%" }}>
                          <FormControl fullWidth required>
                            <InputLabel>Loan Amount Required</InputLabel>
                            <Select
                              value={formData.loanAmount}
                              label="Loan Amount Required"
                              name="loanAmount"
                              onChange={handleChange}
                              size="medium"
                            >
                              <MenuItem value="">
                                <em>Select Amount</em>
                              </MenuItem>
                              {LoanAmountOptions.map((amount) => (
                                <MenuItem key={amount} value={amount}>
                                  {amount}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} style={{ width: "100%" }}>
                          <FormControl fullWidth required>
                            <InputLabel>Loan Purpose</InputLabel>
                            <Select
                              value={formData.loanPurpose}
                              label="Loan Purpose"
                              name="loanPurpose"
                              onChange={handleChange}
                              size="medium"
                            >
                              <MenuItem value="">
                                <em>Select Purpose</em>
                              </MenuItem>
                              {LoanPurposeOptions.map((purpose) => (
                                <MenuItem key={purpose} value={purpose}>
                                  {purpose}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </div>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message / Additional Info"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          variant="outlined"
                          multiline
                          rows={4}
                          placeholder="e.g., 'I was rejected by XYZ Bank due to low score.'"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData.consent}
                              onChange={handleChange}
                              name="consent"
                              required
                              sx={{
                                color: "#0ea5e9",
                                "&.Mui-checked": {
                                  color: "#0ea5e9",
                                },
                              }}
                            />
                          }
                          label="I authorize Credit Dost to contact me for loan assistance and updates."
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <StyledButton
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          endIcon={<ArrowForward />}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <CircularProgress
                                size={24}
                                sx={{ mr: 1, color: "white" }}
                              />
                              Processing Your Application...
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </StyledButton>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}
            </FormSection>
          </SectionWrapper>

          {/* Contact Section */}
          <SectionWrapper>
            <SectionHeader>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  marginTop:"110px",
                  color: "#0f172a",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  animation: "fadeInUp 0.8s ease-out",
                  "@keyframes fadeInUp": {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                Get In Touch
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#64748b",
                  mt: 2,
                  maxWidth: "700px",
                  mx: "auto",
                }}
              >
                Our team is ready to assist you with your credit and loan needs
              </Typography>
            </SectionHeader>

            <ContactCard>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6} style={{flex: "1"}}>
                  <Box 
                    sx={{ 
                      mb: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      }
                    }}
                    
                  >
                    <Phone sx={{ fontSize: 50, mb: 2, animation: "floatIcon 3s ease-in-out infinite" }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 , fontSize: "2.1rem"}}>
                      Helpline / WhatsApp
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
                      +91 XXXXXXXXXX
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} style={{flex: "1"}}>
                  <Box 
                    sx={{ 
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      }
                    }}
                  >
                    <Email sx={{ fontSize: 50, mb: 2, animation: "floatIcon 3.5s ease-in-out infinite" }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: "2rem" }}>
                      Email Support
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
                      info@creditdost.co.in
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={{
                  mt: 4,
                  pt: 4,
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  animation: "fadeIn 1s ease-in-out",
                  "@keyframes fadeIn": {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                  },
                }}
              >
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Our support team is available Monday to Saturday, 9:00 AM to
                  6:00 PM IST
                </Typography>
              </Box>
            </ContactCard>
          </SectionWrapper>
        </Container>
      </PageBackground>
      <HomePageFooter />
    </>
  );
};

export default ApplyForLoanPage;
