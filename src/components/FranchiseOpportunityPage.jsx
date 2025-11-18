import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  styled,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  CheckCircle,
  TrendingUp,
  VerifiedUser,
  Build,
  SupportAgent,
  EmojiEvents,
  Phone,
  Email,
  LocationOn,
  ArrowForward,
} from "@mui/icons-material";
import Header from "./homepage/Header";
import HomePageFooter from "./homepage/HomePageFooter";
import api from "../services/api";

// Custom styled components for unique design
const PageWrapper = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)",
  minHeight: "100vh",
  padding: theme.spacing(2, 0),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-10%",
    left: "-10%",
    width: "400px",
    height: "400px",
    background:
      "radial-gradient(circle, rgba(76, 175, 80, 0.15) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: "pulse 8s ease-in-out infinite",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-15%",
    right: "-10%",
    width: "500px",
    height: "500px",
    background:
      "radial-gradient(circle, rgba(33, 150, 243, 0.15) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: "pulse 10s ease-in-out infinite 2s",
  },
  "@keyframes pulse": {
    "0%, 100%": {
      transform: "scale(1)",
      opacity: 1,
    },
    "50%": {
      transform: "scale(1.1)",
      opacity: 0.8,
    },
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background:
    "linear-gradient(135deg, #0f1b5f 0%, #1a237e 30%, #283593 70%, #303f9f 100%)",
  borderRadius: "24px",
  padding: theme.spacing(8, 4),
  position: "relative",
  overflow: "hidden",
  marginBottom: theme.spacing(8),
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 50%, rgba(76, 175, 80, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(33, 150, 243, 0.2) 0%, transparent 50%)",
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: `conic-gradient(
      transparent, 
      rgba(76, 175, 80, 0.1), 
      transparent 30%
    )`,
    animation: "rotate 15s linear infinite",
    zIndex: 0,
  },
  "@keyframes rotate": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

const SectionCard = styled(Card)(({ theme }) => ({
  borderRadius: "24px",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  background: "white",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  marginBottom: theme.spacing(8),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background: "linear-gradient(90deg, #4caf50, #2196f3)",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.4s ease",
  },
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
    "&::before": {
      transform: "scaleX(1)",
    },
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: "20px",
  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
  border: "1px solid #e9ecef",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background: "linear-gradient(90deg, #4caf50, #2196f3)",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.4s ease",
  },
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
    borderColor: "#4caf50",
    "&::before": {
      transform: "scaleX(1)",
    },
  },
}));

const StepCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "20px",
  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
  border: "2px solid #e9ecef",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  height: "100%",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background: "linear-gradient(90deg, #4caf50, #2196f3)",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.4s ease",
  },
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
    borderColor: "#4caf50",
    "&::before": {
      transform: "scaleX(1)",
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.8, 4),
  borderRadius: "50px",
  fontWeight: 700,
  fontSize: "1.1rem",
  textTransform: "none",
  transition: "all 0.3s ease",
  background: "linear-gradient(135deg, #4caf50 0%, #2196f3 100%)",
  boxShadow: "0 8px 24px rgba(76, 175, 80, 0.3)",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 12px 32px rgba(76, 175, 80, 0.4)",
    background: "linear-gradient(135deg, #43a047 0%, #1e88e5 100%)",
  },
}));

const FormCard = styled(Card)(({ theme }) => ({
  borderRadius: "24px",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
  border: "1px solid #e0e0e0",
  background: "white",
  overflow: "hidden",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "5px",
    background: "linear-gradient(90deg, #4caf50, #2196f3)",
  },
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: "20px",
  background: "linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)",
  border: "1px solid #c8e6c9",
  position: "relative",
  height: "100%",
  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: "4rem",
    color: "#4caf50",
    opacity: 0.2,
    fontFamily: "Georgia, serif",
  },
}));

const FranchiseOpportunityPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    city: "",
    state: "",
    profession: "",
    message: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // For mobile number, only allow digits
    if (name === 'mobileNumber') {
      const cleanValue = value.replace(/\D/g, '');
      // Limit to 10 digits
      if (cleanValue.length <= 10) {
        setFormData({
          ...formData,
          [name]: cleanValue
        });
      }
      return;
    }
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation would go here
    
    try {
      // Submit to backend API
      await api.post('/forms/franchise-opportunity', formData);
      setSubmitted(true);
      // Reset form
      setFormData({
        fullName: "",
        mobileNumber: "",
        email: "",
        city: "",
        state: "",
        profession: "",
        message: "",
        consent: false,
      });
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to submit your request. Please try again.');
    }
  };

  const benefits = [
    {
      icon: <VerifiedUser sx={{ fontSize: 40, color: "#4caf50" }} />,
      title: "Proven Business Model",
      description:
        "A ready-to-execute structure built on transparency and real results.",
    },
    {
      icon: <Build sx={{ fontSize: 40, color: "#2196f3" }} />,
      title: "Expert-Led Training",
      description:
        "Learn directly from experienced professionals in credit score repair and financial consulting.",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: "#ff9800" }} />,
      title: "Technology & Tools",
      description:
        "Access our AI-powered software, CRM systems, and automation support.",
    },
    {
      icon: <SupportAgent sx={{ fontSize: 40, color: "#9c27b0" }} />,
      title: "Brand Credibility",
      description:
        "Operate under a trusted and recognized brand with nationwide presence.",
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 40, color: "#f44336" }} />,
      title: "Continuous Mentorship",
      description:
        "Get lifetime guidance and business support from our expert team.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Apply Online",
      description: "Fill the franchise enquiry form below.",
    },
    {
      number: "2",
      title: "Attend Orientation",
      description:
        "Get a detailed overview of the business model and earning potential.",
    },
    {
      number: "3",
      title: "Complete Training & Certification",
      description:
        "Learn how to manage client cases ethically and effectively.",
    },
    {
      number: "4",
      title: "Start Your Business",
      description:
        "Begin serving clients using our system and brand credibility.",
    },
    {
      number: "5",
      title: "Scale with Support",
      description:
        "Expand your network, grow your income, and become a key partner in our nationwide mission.",
    },
  ];

  const supportFeatures = [
    "Business development and lead generation guidance",
    "Legal and compliance support",
    "Regular training updates and new learning modules",
    "Marketing materials and promotional assets",
    "Dedicated partner success team for assistance",
  ];

  const indianStates = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <>
      <Header />
      <PageWrapper
        style={{
          paddingLeft: "0 !important",
          paddingRight: "0 !important",
        }}
      >
        <Container
          style={{
            maxWidth: "1400px",
            padding: "0px",
          }}
        >
          {/* Hero Section */}
          <HeroSection>
            <Grid
              container
              spacing={6}
              alignItems="center"
              sx={{ position: "relative", zIndex: 1 }}
            >
              <Grid item xs={12} md={7} style={{ flex: "1" }}>
                <Box
                  sx={{ position: "relative", display: "inline-block", mb: 2 }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "#4caf50",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    FUTURE OF FINANCE
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "8px",
                      background: "linear-gradient(90deg, #4caf50, #2196f3)",
                      borderRadius: "4px",
                      opacity: 0.3,
                      zIndex: 0,
                    }}
                  />
                </Box>

                <Typography
                  variant="h1"
                  sx={{
                    color: "white",
                    fontWeight: 800,
                    fontSize: { xs: "2.5rem", md: "3rem" },
                    lineHeight: 1.2,
                    mb: 3,
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Franchise Opportunity – Credit Dost
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    color: "#bbdefb",
                    fontWeight: 600,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    mb: 4,
                  }}
                >
                  Start Your Own Credit Score Repair Business
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.95)",
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                    mb: 4,
                    maxWidth: "90%",
                  }}
                >
                  India's credit awareness and repair industry is growing
                  rapidly — and Credit Dost is at the forefront of this
                  transformation. We are inviting passionate individuals,
                  entrepreneurs, and financial professionals to partner with
                  Credit Dost and build a rewarding business helping people
                  improve their credit scores and financial confidence.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
                  <StyledButton
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                  >
                    Become a Partner
                  </StyledButton>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      color: "white",
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      borderRadius: "50px",
                      padding: "12px 24px",
                      fontWeight: 600,
                      fontSize: "1rem",
                      textTransform: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    Download Brochure
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={5} style={{ flex: "1" }}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
                    transform:
                      "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "perspective(1000px) rotateY(0) rotateX(0)",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(33, 150, 243, 0.1))",
                      zIndex: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Franchise Opportunity"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      position: "relative",
                      zIndex: 0,
                    }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      background: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "12px",
                      padding: "12px 20px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                      zIndex: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#1a237e",
                        mb: 0.5,
                      }}
                    >
                      Why Partner with Credit Dost?
                    </Typography>
                    <List sx={{ padding: 0 }}>
                      {[
                        "Proven Business Model",
                        "Expert-Led Training",
                        "Technology & Tools",
                      ].map((item, index) => (
                        <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <CheckCircle
                              sx={{ color: "#4caf50", fontSize: 16 }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              sx: {
                                color: "#1a237e",
                                fontWeight: 500,
                                fontSize: "0.9rem",
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    justifyContent: "space-evenly",
                    marginTop: "43px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#4caf50",
                        boxShadow: "0 0 0 4px rgba(76, 175, 80, 0.3)",
                        animation: "pulse 2s infinite",
                      }}
                    />
                    <Typography sx={{ color: "white", fontWeight: 500 }}>
                      500+ Partners
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#2196f3",
                        boxShadow: "0 0 0 4px rgba(33, 150, 243, 0.3)",
                        animation: "pulse 2s infinite 0.5s",
                      }}
                    />
                    <Typography sx={{ color: "white", fontWeight: 500 }}>
                      98% Success Rate
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Floating Elements */}
            <Box
              sx={{
                position: "absolute",
                top: "20%",
                left: "5%",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "rgba(76, 175, 80, 0.6)",
                boxShadow: "0 0 0 8px rgba(76, 175, 80, 0.2)",
                animation: "float 4s ease-in-out infinite",
                zIndex: 0,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: "15%",
                right: "8%",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "rgba(33, 150, 243, 0.6)",
                boxShadow: "0 0 0 12px rgba(33, 150, 243, 0.2)",
                animation: "float 5s ease-in-out infinite 1s",
                zIndex: 0,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: "10%",
                right: "15%",
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                background: "rgba(255, 152, 0, 0.6)",
                boxShadow: "0 0 0 6px rgba(255, 152, 0, 0.2)",
                animation: "float 6s ease-in-out infinite 2s",
                zIndex: 0,
              }}
            />

            <style>
              {`
              @keyframes float {
                0%, 100% {
                  transform: translateY(0) translateX(0);
                }
                50% {
                  transform: translateY(-20px) translateX(10px);
                }
              }
              
              @keyframes pulse {
                0%, 100% {
                  transform: scale(1);
                  opacity: 1;
                }
                50% {
                  transform: scale(1.2);
                  opacity: 0.7;
                }
              }
            `}
            </style>
          </HeroSection>

          {/* Benefits Section */}
          <SectionCard>
            <CardContent sx={{ p: 5 }}>
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <Box
                  sx={{ display: "inline-block", position: "relative", mb: 2 }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "#4caf50",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                    }}
                  >
                    PARTNER BENEFITS
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      width: "100%",
                      height: "3px",
                      background: "linear-gradient(90deg, #4caf50, #2196f3)",
                      borderRadius: "2px",
                    }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    fontWeight: 800,
                    color: "#1a237e",
                    mb: 3,
                  }}
                >
                  Why Partner with Credit Dost?
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#666",
                    fontSize: "1.2rem",
                    maxWidth: "800px",
                    mx: "auto",
                    lineHeight: 1.7,
                  }}
                >
                  At Credit Dost, we've designed a complete ecosystem to help
                  you succeed — combining practical training, technology, and
                  ongoing business support.
                </Typography>
              </Box>

              <Grid container spacing={4} style={{ flexWrap: "nowrap" }}>
                {benefits.map((benefit, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={index}
                    style={{ flex: "1" }}
                  >
                    <FeatureCard elevation={0}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          background: "rgba(76, 175, 80, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 3,
                          mx: "auto",
                        }}
                      >
                        {benefit.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#666",
                          textAlign: "center",
                          lineHeight: 1.6,
                        }}
                      >
                        {benefit.description}
                      </Typography>
                    </FeatureCard>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </SectionCard>

          {/* Who Can Join Section */}
          <SectionCard>
            <CardContent sx={{ p: 5 }}>
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <Box
                  sx={{ display: "inline-block", position: "relative", mb: 2 }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "#4caf50",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                    }}
                  >
                    WHO CAN JOIN
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      width: "100%",
                      height: "3px",
                      background: "linear-gradient(90deg, #4caf50, #2196f3)",
                      borderRadius: "2px",
                    }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    fontWeight: 800,
                    color: "#1a237e",
                    mb: 3,
                  }}
                >
                  Who Can Become a Credit Dost Partner?
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#666",
                    fontSize: "1.2rem",
                    maxWidth: "800px",
                    mx: "auto",
                    lineHeight: 1.7,
                  }}
                >
                  This opportunity is open to individuals from all backgrounds
                  who want to build a meaningful and income-generating career in
                  finance.
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {[
                  "A financial consultant, banker, or loan agent",
                  "A call centre or outsourcing company looking to add a new vertical",
                  "A self-motivated individual wanting to start an ethical home-based business",
                  "A trainer, coach, or educator interested in financial empowerment",
                ].map((item, index) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    key={index}
                    style={{ width: "49%" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                        p: 3,
                        background: "rgba(76, 175, 80, 0.05)",
                        borderRadius: "12px",
                        border: "1px solid rgba(76, 175, 80, 0.1)",
                      }}
                    >
                      <CheckCircle sx={{ color: "#4caf50", mt: 0.5 }} />
                      <Typography sx={{ color: "#333", fontWeight: 500 }}>
                        {item}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1a237e",
                    fontStyle: "italic",
                  }}
                >
                  No prior credit or banking experience is required — we'll
                  train and guide you every step of the way.
                </Typography>
              </Box>
            </CardContent>
          </SectionCard>

          {/* What You Get Section */}
          <SectionCard>
            <CardContent sx={{ p: 5 }}>
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <Box
                  sx={{ display: "inline-block", position: "relative", mb: 2 }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "#4caf50",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                    }}
                  >
                    PARTNER SUPPORT
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      width: "100%",
                      height: "3px",
                      background: "linear-gradient(90deg, #4caf50, #2196f3)",
                      borderRadius: "2px",
                    }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    fontWeight: 800,
                    color: "#1a237e",
                    mb: 3,
                  }}
                >
                  What You Get as a Partner
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#666",
                    fontSize: "1.2rem",
                    maxWidth: "800px",
                    mx: "auto",
                    lineHeight: 1.7,
                  }}
                >
                  Comprehensive support across all aspects of your business
                  journey
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {[
                  {
                    area: "Training & Certification",
                    description:
                      "Professional training to become a certified Credit Score Repair Consultant.",
                  },
                  {
                    area: "Tools & Resources",
                    description:
                      "CRM access, report templates, dispute formats, and digital tools to manage your clients.",
                  },
                  {
                    area: "Marketing Support",
                    description:
                      "Digital creatives, growth strategies, and co-branding assistance to promote your business.",
                  },
                  {
                    area: "Technology Access",
                    description:
                      "AI-based backend systems for client progress tracking and performance management.",
                  },
                  {
                    area: "Dedicated Mentorship",
                    description:
                      "Continuous learning, business development calls, and support from the Credit Dost team.",
                  },
                ].map((item, index) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    key={index}
                    style={{ width: "49%" }}
                  >
                    <Box
                      sx={{
                        p: 3,
                        background: "white",
                        borderRadius: "12px",
                        border: "1px solid #e0e0e0",
                        height: "100%",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "#1a237e", mb: 1 }}
                      >
                        {item.area}
                      </Typography>
                      <Typography sx={{ color: "#666" }}>
                        {item.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </SectionCard>

          {/* How It Works Section */}
          <SectionCard>
            <CardContent sx={{ p: 5 }}>
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <Box
                  sx={{ display: "inline-block", position: "relative", mb: 2 }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "#4caf50",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                    }}
                  >
                    GETTING STARTED
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      width: "100%",
                      height: "3px",
                      background: "linear-gradient(90deg, #4caf50, #2196f3)",
                      borderRadius: "2px",
                    }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    fontWeight: 800,
                    color: "#1a237e",
                    mb: 3,
                  }}
                >
                  How It Works – Step by Step
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#666",
                    fontSize: "1.2rem",
                    maxWidth: "800px",
                    mx: "auto",
                    lineHeight: 1.7,
                  }}
                >
                  A clear path to building your successful credit repair
                  business
                </Typography>
              </Box>

              <Grid container spacing={4} style={{ flexWrap: "nowrap" }}>
                {steps.map((step, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={index}
                    style={{ flex: "1" }}
                  >
                    <StepCard elevation={0}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #4caf50, #2196f3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: 700,
                          fontSize: "1.5rem",
                          mb: 2,
                        }}
                      >
                        {step.number}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 1, color: "#1a237e" }}
                      >
                        {step.title}
                      </Typography>
                      <Typography sx={{ color: "#666" }}>
                        {step.description}
                      </Typography>
                    </StepCard>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </SectionCard>

          {/* Support Section */}
          <SectionCard>
            <CardContent sx={{ p: 5 }}>
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <Box
                  sx={{ display: "inline-block", position: "relative", mb: 2 }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "#4caf50",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                    }}
                  >
                    ONGOING SUPPORT
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      width: "100%",
                      height: "3px",
                      background: "linear-gradient(90deg, #4caf50, #2196f3)",
                      borderRadius: "2px",
                    }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    fontWeight: 800,
                    color: "#1a237e",
                    mb: 3,
                  }}
                >
                  Support You Can Count On
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#666",
                    fontSize: "1.2rem",
                    maxWidth: "800px",
                    mx: "auto",
                    lineHeight: 1.7,
                  }}
                >
                  Our partners receive continuous support across every business
                  stage
                </Typography>
              </Box>

              <Grid container spacing={2} justifyContent="center">
                {supportFeatures.map((feature, index) => (
                  <Grid
                    item
                    xs={12}
                    md={10}
                    key={index}
                    style={{ width: "49%" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        background: "rgba(33, 150, 243, 0.05)",
                        borderRadius: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #2196f3, #4caf50)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CheckCircle sx={{ color: "white", fontSize: 16 }} />
                      </Box>
                      <Typography sx={{ color: "#333" }}>{feature}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </SectionCard>

          {/* Testimonials Section */}
          <SectionCard>
            <CardContent sx={{ p: 5 }}>
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <Box
                  sx={{ display: "inline-block", position: "relative", mb: 2 }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "#4caf50",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                    }}
                  >
                    PARTNER STORIES
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      width: "100%",
                      height: "3px",
                      background: "linear-gradient(90deg, #4caf50, #2196f3)",
                      borderRadius: "2px",
                    }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    fontWeight: 800,
                    color: "#1a237e",
                    mb: 3,
                  }}
                >
                  Success Stories
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#666",
                    fontSize: "1.2rem",
                    maxWidth: "800px",
                    mx: "auto",
                    lineHeight: 1.7,
                  }}
                >
                  Hear from our successful partners across India
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6} style={{ flex: "1" }}>
                  <TestimonialCard>
                    <Typography
                      sx={{
                        color: "#333",
                        fontStyle: "italic",
                        lineHeight: 1.7,
                        mb: 3,
                      }}
                    >
                      "Joining Credit Dost completely changed my career. I now
                      help clients fix their credit issues and have built a
                      steady income stream. The training and backend support are
                      world-class."
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #4caf50, #2196f3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: 700,
                        }}
                      >
                        SS
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: "#1a237e" }}>
                          Saurabh Sharma
                        </Typography>
                        <Typography sx={{ color: "#666" }}>
                          Partner – Delhi NCR
                        </Typography>
                      </Box>
                    </Box>
                  </TestimonialCard>
                </Grid>
                <Grid item xs={12} md={6} style={{ flex: "1" }}>
                  <TestimonialCard>
                    <Typography
                      sx={{
                        color: "#333",
                        fontStyle: "italic",
                        lineHeight: 1.7,
                        mb: 3,
                      }}
                    >
                      "The best part about Credit Dost is their integrity and
                      process transparency. Every step is structured,
                      professional, and supportive."
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #4caf50, #2196f3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: 700,
                        }}
                      >
                        PM
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: "#1a237e" }}>
                          Pooja Mehta
                        </Typography>
                        <Typography sx={{ color: "#666" }}>
                          Consultant – Ahmedabad
                        </Typography>
                      </Box>
                    </Box>
                  </TestimonialCard>
                </Grid>
              </Grid>
            </CardContent>
          </SectionCard>

          {/* Contact Section */}
          <SectionCard>
            <CardContent sx={{ p: 5 }}>
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <Box
                  sx={{ display: "inline-block", position: "relative", mb: 2 }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "#4caf50",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                    }}
                  >
                    GET IN TOUCH
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      width: "100%",
                      height: "3px",
                      background: "linear-gradient(90deg, #4caf50, #2196f3)",
                      borderRadius: "2px",
                    }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    fontWeight: 800,
                    color: "#1a237e",
                    mb: 3,
                  }}
                >
                  Join the Credit Dost Network
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#666",
                    fontSize: "1.2rem",
                    maxWidth: "800px",
                    mx: "auto",
                    lineHeight: 1.7,
                  }}
                >
                  Become part of a growing network of Credit Score Repair
                  Professionals across India. Together, we can empower
                  individuals, educate customers, and build a financially
                  stronger nation.
                </Typography>
              </Box>

              <Grid container spacing={6} style={{ flexWrap: "nowrap" }}>
                <Grid item xs={12} md={5} style={{ flex: "1" }}>
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, #1a237e, #283593)",
                      borderRadius: "16px",
                      p: 4,
                      color: "white",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, mb: 3, textAlign: "center" }}
                    >
                      Contact for Partnership Enquiries
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 3,
                      }}
                    >
                      <Phone sx={{ color: "#4caf50" }} />
                      <Typography>Partnership Desk: +91 XXXXXXXXXX</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 3,
                      }}
                    >
                      <Email sx={{ color: "#4caf50" }} />
                      <Typography>Email: franchise@creditdost.co.in</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <LocationOn sx={{ color: "#4caf50" }} />
                      <Typography>India-wide Operations</Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={7} style={{ flex: "1" }}>
                  <FormCard>
                    <CardContent sx={{ p: 4 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          mb: 3,
                          textAlign: "center",
                          color: "#1a237e",
                        }}
                      >
                        📩 Ready to Start? Fill the Partner Enquiry Form
                      </Typography>

                      {submitted ? (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                          <CheckCircle
                            sx={{ fontSize: 80, color: "#4caf50", mb: 2 }}
                          />
                          <Typography
                            variant="h5"
                            sx={{ fontWeight: 700, mb: 2 }}
                          >
                            Thank You for Your Interest!
                          </Typography>
                          <Typography sx={{ color: "#666", mb: 3 }}>
                            Our partnership team will contact you within 24
                            hours.
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => setSubmitted(false)}
                            sx={{
                              background:
                                "linear-gradient(135deg, #4caf50, #2196f3)",
                            }}
                          >
                            Submit Another Response
                          </Button>
                        </Box>
                      ) : (
                        <Box component="form" onSubmit={handleSubmit}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} style={{ width: "47%" }}>
                              <TextField
                                fullWidth
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ width: "47%" }}>
                              <TextField
                                fullWidth
                                label="Mobile Number"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                type="tel"
                                inputProps={{ maxLength: 10 }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    "&:hover fieldset": {
                                      borderColor: "#4caf50",
                                    },
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ width: "47%" }}>
                              <TextField
                                fullWidth
                                label="Email ID"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                type="email"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ width: "47%" }}>
                              <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ width: "47%" }}>
                              <TextField
                                fullWidth
                                select
                                label="State"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                SelectProps={{
                                  native: true,
                                }}
                              >
                                <option value=""></option>
                                {indianStates.map((state) => (
                                  <option key={state} value={state}>
                                    {state}
                                  </option>
                                ))}
                              </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ width: "47%" }}>
                              <TextField
                                fullWidth
                                label="Current Profession / Business"
                                name="profession"
                                value={formData.profession}
                                onChange={handleChange}
                                required
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item xs={12} style={{ width: "100%" }}>
                              <TextField
                                fullWidth
                                label="Message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                variant="outlined"
                                multiline
                                rows={4}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={handleChange}
                                    required
                                    sx={{
                                      color: "#4caf50",
                                      "&.Mui-checked": {
                                        color: "#4caf50",
                                      },
                                    }}
                                  />
                                }
                                label={
                                  <Typography sx={{ color: "#666" }}>
                                    I agree to receive communication from Credit
                                    Dost.
                                  </Typography>
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <StyledButton
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                              >
                                Submit Enquiry
                              </StyledButton>
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                    </CardContent>
                  </FormCard>
                </Grid>
              </Grid>
            </CardContent>
          </SectionCard>
        </Container>
      </PageWrapper>
      <HomePageFooter />
    </>
  );
};

export default FranchiseOpportunityPage;
