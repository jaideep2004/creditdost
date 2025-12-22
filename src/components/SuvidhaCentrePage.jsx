import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Check,
  TrendingUp,
  Home,
  School,
  AttachMoney,
  People,
  EmojiEvents,
  AutoAwesome,
  ArrowForward,
  Download,
  Chat,
  Star,
  TrackChanges,
  FlashOn,
} from "@mui/icons-material";
import Header from "./homepage/Header";
import HomePageFooter from "./homepage/HomePageFooter";

const SuvidhaCentrePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <>
    <Header/>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f8fafc",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .pulse-bg-1 { animation: pulse 3s ease-in-out infinite; }
        .pulse-bg-2 { animation: pulse 3s ease-in-out infinite 2s; }
        .pulse-bg-3 { animation: pulse 3s ease-in-out infinite 4s; }
        .bounce-chip { animation: bounce 2s ease-in-out infinite; }
      `}</style>

        {/* Floating Background Elements */}
        {/* <Box
        sx={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Box
          className="pulse-bg-1"
          sx={{
            position: "absolute",
            top: 80,
            left: 40,
            width: 288,
            height: 288,
            bgcolor: "#22d3ee",
            borderRadius: "50%",
            filter: "blur(64px)",
          }}
        />
        <Box
          className="pulse-bg-2"
          sx={{
            position: "absolute",
            top: 160,
            right: 40,
            width: 288,
            height: 288,
            bgcolor: "#c084fc",
            borderRadius: "50%",
            filter: "blur(64px)",
          }}
        />
        <Box
          className="pulse-bg-3"
          sx={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            width: 288,
            height: 288,
            bgcolor: "#3b82f6",
            borderRadius: "50%",
            filter: "blur(64px)",
          }}
        />
      </Box> */}

        {/* Hero Section */}
        <Box sx={{ position: "relative", pt: 10, pb: 16, overflow: "hidden" }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, #0891b2, #2563eb, #7c3aed)",
              opacity: 0.95,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            }}
          />

          <Container
            maxWidth="lg"
            sx={{ position: "relative", textAlign: "center", zIndex: 1 }}
          >
            <Chip
              className="bounce-chip"
              icon={<AutoAwesome sx={{ color: "#fde047 !important" }} />}
              label="Launch Your Business Today"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                color: "white",
                fontWeight: 600,
                py: 3,
                px: 2,
                mb: 4,
                fontSize: "1rem",
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", md: "4rem" },
                fontWeight: 700,
                color: "white",
               
                lineHeight: 1.2,
              }}
            >
              Credit Dost
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", md: "4rem" },
                fontWeight: 700,
                background: "linear-gradient(to right, #67e8f9, #fde047)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
              }}
            >
              Suvidha Centre
            </Typography>

            <Typography
              variant="h4"
              sx={{
                color: "#a5f3fc",
                mb: 2,
                fontWeight: 300,
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Start Your Own Credit Repair Business
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.9)",
                mb: 4,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              Endless Opportunities • Exciting Income • Start Your Journey Today
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: "white",
                  color: "#2563eb",
                  px: 4,
                  py: 2,
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
                  "&:hover": {
                    bgcolor: "white",
                    transform: "scale(1.05)",
                    boxShadow: "0 20px 25px -5px rgba(6,182,212,0.5)",
                  },
                  transition: "all 0.3s",
                }}
              >
                Apply Now
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  borderWidth: 2,
                  color: "white",
                  px: 4,
                  py: 2,
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  "&:hover": {
                    bgcolor: "white",
                    color: "#2563eb",
                    borderWidth: 2,
                  },
                  transition: "all 0.3s",
                }}
              >
                Download Brochure
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Trust Badge */}
        <Container
          maxWidth="lg"
          sx={{ position: "relative", mt: -8, mb: 10, zIndex: 2 }}
        >
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              border: "1px solid #a5f3fc",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Grid
                container
                spacing={4}
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid item xs={6} md={3} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, color: "#2563eb", mb: 1 }}
                  >
                    10,000+
                  </Typography>
                  <Typography sx={{ color: "#64748b" }}>
                    Happy Customers
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, color: "#9333ea", mb: 1 }}
                  >
                    500+
                  </Typography>
                  <Typography sx={{ color: "#64748b" }}>
                    Active Partners
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, color: "#0891b2", mb: 1 }}
                  >
                    95%
                  </Typography>
                  <Typography sx={{ color: "#64748b" }}>
                    Success Rate
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, color: "#16a34a", mb: 1 }}
                  >
                    ₹2.5L
                  </Typography>
                  <Typography sx={{ color: "#64748b" }}>
                    Avg. Monthly Earnings
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>

        {/* Welcome Section */}
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.5rem", md: "3rem" },
                fontWeight: 700,
                color: "#111827",
                mb: 3,
              }}
            >
              Welcome to Your
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(to right, #0891b2, #2563eb)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  ml: 1,
                }}
              >
                Financial Freedom
              </Box>
            </Typography>
            <Box
              sx={{
                width: 96,
                height: 4,
                background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                mx: "auto",
                mb: 4,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#4b5563",
                maxWidth: "900px",
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              The Credit Dost Suvidha Centre program empowers individuals, shop
              owners, freelancers, and small agencies to start their own Credit
              Repair & Credit Score Improvement business with full training,
              tools, and support.
            </Typography>
          </Box>

          <Grid container spacing={4} style={{ flexWrap: "nowrap" }}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #ecfeff 0%, #dbeafe 100%)",
                  border: "2px solid #a5f3fc",
                  borderRadius: 4,
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: "#22d3ee",
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <TrackChanges
                    sx={{ fontSize: 48, color: "#0891b2", mb: 2 }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#111827", mb: 2 }}
                  >
                    Massive Market
                  </Typography>
                  <Typography sx={{ color: "#4b5563" }}>
                    India has 40+ crore credit-active customers, with millions
                    needing help to improve their CIBIL score and become
                    loan-ready.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #faf5ff 0%, #dbeafe 100%)",
                  border: "2px solid #d8b4fe",
                  borderRadius: 4,
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: "#c084fc",
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <FlashOn sx={{ fontSize: 48, color: "#9333ea", mb: 2 }} />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#111827", mb: 2 }}
                  >
                    Fast Growing
                  </Typography>
                  <Typography sx={{ color: "#4b5563" }}>
                    Credit repair is one of India's fastest-growing financial
                    service sectors with high demand and minimal competition.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #f0fdf4 0%, #ecfeff 100%)",
                  border: "2px solid #86efac",
                  borderRadius: 4,
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: "#4ade80",
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <AttachMoney sx={{ fontSize: 48, color: "#16a34a", mb: 2 }} />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#111827", mb: 2 }}
                  >
                    Long-Term Income
                  </Typography>
                  <Typography sx={{ color: "#4b5563" }}>
                    Join a profitable industry with minimal investment and build
                    a sustainable business with recurring revenue streams.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Why Become Section */}
        <Box sx={{ bgcolor: "white", py: 10 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  fontWeight: 700,
                  color: "#111827",
                  mb: 3,
                }}
              >
                Why Become a
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(to right, #2563eb, #9333ea)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    ml: 1,
                  }}
                >
                  Suvidha Centre?
                </Box>
              </Typography>
              <Box
                sx={{
                  width: 96,
                  height: 4,
                  background: "linear-gradient(to right, #3b82f6, #9333ea)",
                  mx: "auto",
                }}
              />
            </Box>

            <Grid container spacing={4}>
              {[
                {
                  icon: <AttachMoney sx={{ fontSize: 48 }} />,
                  title: "Earn High Monthly Income",
                  gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  items: [
                    "Credit score repair services",
                    "Report correction services",
                    "Loan readiness consulting",
                    "Add-on financial services",
                  ],
                },
                {
                  icon: <TrendingUp sx={{ fontSize: 48 }} />,
                  title: "Rapidly Growing Market",
                  gradient: "linear-gradient(135deg, #3b82f6 0%, #0891b2 100%)",
                  items: [
                    "Loan rejection cases",
                    "Low credit score issues",
                    "Wrong CIBIL entries",
                    "DPD / settled status",
                  ],
                },
                {
                  icon: <Home sx={{ fontSize: 48 }} />,
                  title: "Work From Anywhere",
                  gradient: "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)",
                  items: [
                    "No special setup required",
                    "Mobile or laptop is enough",
                    "Complete training provided",
                    "24/7 support available",
                  ],
                },
              ].map((item, idx) => (
                <Grid item xs={12} md={4} key={idx}>
                  <Card
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                      border: "1px solid #f3f4f6",
                      transition: "all 0.5s",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: item.gradient,
                        opacity: hoveredCard === idx ? 0.1 : 0,
                        transition: "opacity 0.5s",
                      }}
                    />
                    <CardContent sx={{ p: 4, position: "relative" }}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          p: 2,
                          borderRadius: 4,
                          background: item.gradient,
                          color: "white",
                          mb: 3,
                          transform:
                            hoveredCard === idx
                              ? "scale(1.1) rotate(6deg)"
                              : "scale(1) rotate(0deg)",
                          transition: "all 0.5s",
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "#111827", mb: 3 }}
                      >
                        {item.title}
                      </Typography>
                      <List sx={{ p: 0 }}>
                        {item.items.map((listItem, i) => (
                          <ListItem key={i} sx={{ px: 0, py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <Check sx={{ color: "#22c55e", fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={listItem}
                              sx={{ color: "#4b5563", m: 0 }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* What You Get */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #dbeafe 0%, #ecfeff 100%)",
            py: 10,
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  fontWeight: 700,
                  color: "#111827",
                  mb: 3,
                }}
              >
                What You Get as a
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(to right, #0891b2, #2563eb)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    ml: 1,
                  }}
                >
                  Partner
                </Box>
              </Typography>
              <Box
                sx={{
                  width: 96,
                  height: 4,
                  background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                  mx: "auto",
                }}
              />
            </Box>

            <Grid container spacing={3}>
              {[
                {
                  icon: <School sx={{ fontSize: 40 }} />,
                  title: "Complete Training",
                  color: "#2563eb",
                },
                {
                  icon: <TrendingUp sx={{ fontSize: 40 }} />,
                  title: "Business Dashboard",
                  color: "#9333ea",
                },
                {
                  icon: <People sx={{ fontSize: 40 }} />,
                  title: "Marketing Support",
                  color: "#0891b2",
                },
                {
                  icon: <Star sx={{ fontSize: 40 }} />,
                  title: "Live Mentorship",
                  color: "#ec4899",
                },
                {
                  icon: <EmojiEvents sx={{ fontSize: 40 }} />,
                  title: "High Earnings",
                  color: "#16a34a",
                },
              ].map((item, idx) => (
                <Grid item xs={6} sm={6} lg={2.4} key={idx}>
                  <Card
                    sx={{
                      textAlign: "center",
                      borderRadius: 3,
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                      transition: "all 0.3s",
                      "&:hover": {
                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                        transform: "translateY(-8px)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          p: 2,
                          borderRadius: "50%",
                          bgcolor: `${item.color}15`,
                          color: item.color,
                          mb: 2,
                          transition: "transform 0.3s",
                          "&:hover": { transform: "scale(1.1)" },
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 700, color: "#111827" }}
                      >
                        {item.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Who Can Join */}
        <Box sx={{ bgcolor: "white", py: 10 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  fontWeight: 700,
                  color: "#111827",
                  mb: 3,
                }}
              >
                Who Can Become a
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(to right, #9333ea, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    ml: 1,
                  }}
                >
                  Partner?
                </Box>
              </Typography>
              <Box
                sx={{
                  width: 96,
                  height: 4,
                  background: "linear-gradient(to right, #9333ea, #ec4899)",
                  mx: "auto",
                  mb: 4,
                }}
              />
              <Typography variant="h6" sx={{ color: "#4b5563", mb: 6 }}>
                This opportunity is ideal for:
              </Typography>
            </Box>

            <Grid
              container
              spacing={2}
              sx={{ mb: 6 }}
              style={{ justifyContent: "center" }}
            >
              {[
                "Students",
                "Working professionals",
                "Shop owners",
                "Loan agents",
                "Insurance agents",
                "Freelancers",
                "Finance consultants",
                "Homemakers",
              ].map((item, idx) => (
                <Grid item xs={6} md={3} key={idx}>
                  <Card
                    sx={{
                      background:
                        "linear-gradient(135deg, #faf5ff 0%, #fce7f3 100%)",
                      border: "2px solid #d8b4fe",
                      borderRadius: 3,
                      textAlign: "center",
                      transition: "all 0.3s",
                      "&:hover": {
                        borderColor: "#c084fc",
                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Typography sx={{ fontWeight: 600, color: "#1f2937" }}>
                        {item}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Card
              sx={{
                background: "linear-gradient(to right, #f3e8ff, #fce7f3)",
                border: "2px solid #d8b4fe",
                borderRadius: 4,
                textAlign: "center",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: "#1f2937",
                    fontStyle: "italic",
                  }}
                >
                  "If you can talk to people and guide them, you can build a
                  successful income with Credit Dost."
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </Box>

        {/* Income Potential */}
        <Box
          sx={{
            background:
              "linear-gradient(135deg, #f0fdf4 0%, #ecfeff 50%, #dbeafe 100%)",
            py: 10,
          }}
        >
          <Container maxWidth="md" sx={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.5rem", md: "3rem" },
                fontWeight: 700,
                color: "#111827",
                mb: 3,
              }}
            >
              Your
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(to right, #16a34a, #0891b2)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  ml: 1,
                }}
              >
                Income Potential
              </Box>
            </Typography>
            <Box
              sx={{
                width: 96,
                height: 4,
                background: "linear-gradient(to right, #22c55e, #06b6d4)",
                mx: "auto",
                mb: 6,
              }}
            />

            <Grid
              container
              spacing={4}
              sx={{ mb: 4 }}
              style={{ flexWrap: "nowrap" }}
            >
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    border: "4px solid #93c5fd",
                    borderRadius: 4,
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                    transition: "all 0.3s",
                    "&:hover": {
                      borderColor: "#60a5fa",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 5 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        color: "#2563eb",
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        mb: 1.5,
                      }}
                    >
                      Part-Time
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        color: "#111827",
                        mb: 1,
                        fontSize: "3rem",
                      }}
                    >
                      ₹30K - ₹90K
                    </Typography>
                    <Typography sx={{ color: "#4b5563" }}>per month</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    background:
                      "linear-gradient(135deg, #22c55e 0%, #0891b2 100%)",
                    borderRadius: 4,
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                    position: "relative",
                    overflow: "visible",
                    transition: "all 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <Chip
                    label="POPULAR"
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      bgcolor: "#fbbf24",
                      color: "#78350f",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      transform: "rotate(12deg)",
                    }}
                  />
                  <CardContent sx={{ p: 5, color: "white" }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        mb: 1.5,
                      }}
                    >
                      Full-Time
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{ fontWeight: 700, mb: 1, fontSize: "3rem" }}
                    >
                      ₹1L - ₹2.5L
                    </Typography>
                    <Typography sx={{ color: "#d1fae5" }}>per month</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Card
              sx={{
                bgcolor: "white",
                borderRadius: 3,
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body1" sx={{ color: "#4b5563" }}>
                  Your earnings depend on effort, customer volume, and
                  marketing. Credit repair is a high-demand service, so growth
                  can be rapid.
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </Box>

        {/* How to Start */}
        <Box sx={{ bgcolor: "white", py: 10 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  fontWeight: 700,
                  color: "#111827",
                  mb: 3,
                }}
              >
                Start Your Journey in
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(to right, #2563eb, #0891b2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    ml: 1,
                  }}
                >
                  4 Simple Steps
                </Box>
              </Typography>
              <Box
                sx={{
                  width: 96,
                  height: 4,
                  background: "linear-gradient(to right, #3b82f6, #06b6d4)",
                  mx: "auto",
                }}
              />
            </Box>

            <Grid container spacing={4}>
              {[
                {
                  step: "01",
                  title: "Apply Online",
                  desc: "Fill the partner form and our team connects within 24 hours",
                },
                {
                  step: "02",
                  title: "Attend Orientation",
                  desc: "Understand business model, earnings, and tools",
                },
                {
                  step: "03",
                  title: "Get Training Access",
                  desc: "Start learning and set up your Suvidha Centre",
                },
                {
                  step: "04",
                  title: "Start Earning",
                  desc: "Begin serving customers and grow your income",
                },
              ].map((item, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={idx}
                  style={{ flex: "1" }}
                >
                  <Box sx={{ position: "relative" }}>
                    <Card
                      sx={{
                        borderRadius: 4,
                        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)",
                        border: "2px solid #a5f3fc",
                        pt: 5,

                        transition: "all 0.3s",
                        "&:hover": {
                          borderColor: "#22d3ee",
                          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                          transform: "translateY(-8px)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: -24,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 64,
                          height: 64,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                        }}
                      >
                        {item.step}
                      </Box>
                      <CardContent
                        sx={{
                          p: 4,
                          pt: 2,
                          textAlign: "center",
                          minHeight: "168px",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, color: "#111827", mb: 2 }}
                        >
                          {item.title}
                        </Typography>
                        <Typography sx={{ color: "#4b5563" }}>
                          {item.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Final CTA */}
        <Box sx={{ position: "relative", py: 10, overflow: "hidden" }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, #2563eb, #0891b2, #7c3aed)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              opacity: 0.2,
              background:
                "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            }}
          />

          <Container
            maxWidth="md"
            sx={{ position: "relative", textAlign: "center" }}
          >
            <AutoAwesome
              sx={{
                fontSize: 64,
                color: "#fde047",
                mx: "auto",
                mb: 3,
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 700,
                color: "white",
                mb: 3,
              }}
            >
              Ready to Transform Lives?
            </Typography>
            <Typography variant="h5" sx={{ color: "#a5f3fc", mb: 6 }}>
              Join hundreds of successful partners building financial freedom
              today
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: "white",
                  color: "#2563eb",
                  px: 5,
                  py: 2.5,
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
                  "&:hover": {
                    bgcolor: "white",
                    transform: "scale(1.05)",
                    boxShadow: "0 20px 25px -5px rgba(6,182,212,0.5)",
                  },
                  transition: "all 0.3s",
                }}
              >
                Apply Now
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                sx={{
                  borderColor: "white",
                  borderWidth: 2,
                  color: "white",
                  px: 5,
                  py: 2.5,
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderWidth: 2,
                  },
                  transition: "all 0.3s",
                }}
              >
                Download Brochure
              </Button>
              <Button
                variant="outlined"
                startIcon={<Chat />}
                sx={{
                  borderColor: "white",
                  borderWidth: 2,
                  color: "white",
                  px: 5,
                  py: 2.5,
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderWidth: 2,
                  },
                  transition: "all 0.3s",
                }}
              >
                Chat with Team
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
      <HomePageFooter/>
    </>
  );
};

export default SuvidhaCentrePage;
