import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  styled,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Phone, Add } from "@mui/icons-material";

const HeroBackground = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #0a1929 0%, #1a2744 50%, #0d2847 100%)",
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(8, 0),
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: "10%",
    left: "-10%",
    width: "600px",
    height: "600px",
    background:
      "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: "pulse 8s ease-in-out infinite",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "20%",
    right: "-5%",
    width: "400px",
    height: "400px",
    background:
      "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: "float 6s ease-in-out infinite",
  },
  "@keyframes pulse": {
    "0%, 100%": { transform: "scale(1)", opacity: 1 },
    "50%": { transform: "scale(1.1)", opacity: 0.8 },
  },
  "@keyframes float": {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-30px)" },
  },
}));

const FloatingShape = styled(Box)(({ delay = 0 }) => ({
  position: "absolute",
  borderRadius: "50%",
  background: "rgba(14, 165, 233, 0.1)",
  animation: `float 6s ease-in-out ${delay}s infinite`,
}));

const ContentWrapper = styled(Box)(({ isVisible }) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? "translateY(0)" : "translateY(30px)",
  transition: "all 0.8s ease-out",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3.5),
  borderRadius: "8px",
  fontWeight: 600,
  fontSize: "1rem",
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(14, 165, 233, 0.4)",
  },
}));

const ImageWrapper = styled(Box)(({ isVisible }) => ({
  position: "relative",
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? "translateX(0)" : "translateX(50px)",
  transition: "all 1s ease-out 0.3s",
  "& img": {
    width: "100%",
    height: "auto",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  },
}));

const AccentCircle = styled(Box)(({ top, right, size }) => ({
  position: "absolute",
  top: top || "auto",
  right: right || "auto",
  width: size || "150px",
  height: size || "150px",
  borderRadius: "50%",
  border: "2px solid rgba(14, 165, 233, 0.3)",
  zIndex: 0,
}));

const HeroSection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <HeroBackground>
      <FloatingShape
        sx={{ width: 80, height: 80, top: "15%", left: "10%" }}
        delay={0}
      />
      <FloatingShape
        sx={{ width: 120, height: 120, bottom: "25%", left: "5%" }}
        delay={2}
      />
      <FloatingShape
        sx={{ width: 60, height: 60, top: "60%", right: "15%" }}
        delay={4}
      />

      <Container
        sx={{ position: "relative", zIndex: 1 }}
        style={{ maxWidth: "1400px" }}
      >
        <Grid
          container
          spacing={6}
          alignItems="center"
          style={{ flexWrap: "nowrap" }}
        >
          <Grid item xs={12} md={6} style={{ flex: "1" }}>
            <ContentWrapper isVisible={isVisible}>
              <Typography
                sx={{
                  color: "#0ea5e9",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                BE INVEST
              </Typography>

              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem", lg: "3.7rem" },
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.2,
                  mb: 3,
                  "& span": {
                    display: "block",
                  },
                }}
              >
                Invest With Confidence
                <br />
                Harvest The Rewards
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  mb: 1.5,
                  maxWidth: "600px",
                }}
              >
                And In Order To Make A Business, Brand Advertising And Marketing
                Plays An Important Role.
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  mb: 5,
                  maxWidth: "600px",
                }}
              >
                Similarly, In Making Cultivation Business A Brand, Good Slogans
                Are Necessary.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  flexWrap: "wrap",
                }}
              >
                <StyledButton
                  variant="contained"
                  endIcon={<Add />}
                  onClick={() => navigate("/register")}
                  sx={{
                    backgroundColor: "#0ea5e9",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#0284c7",
                    },
                  }}
                >
                  Get Started
                </StyledButton>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: "rgba(14, 165, 233, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(14, 165, 233, 0.3)",
                    }}
                  >
                    <Phone sx={{ color: "#0ea5e9", fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "rgba(255, 255, 255, 0.6)",
                        fontSize: "0.875rem",
                      }}
                    >
                      Need help?
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "1.125rem",
                        fontWeight: 600,
                      }}
                    >
                      +91 9876543210
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ContentWrapper>
          </Grid>

          <Grid item xs={12} md={6} style={{ flex: "1" }}>
            <ImageWrapper isVisible={isVisible}>
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "20px",
                }}
              >
                {/* Top right cyan quarter circle */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "-40px",
                    right: "-40px",
                    width: "280px",
                    height: "280px",
                    background: "#06b6d4",
                    borderRadius: "0 0 0 100%",
                    zIndex: 2,
                  }}
                />

                {/* Bottom left cyan triangle/quarter circle */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-40px",
                    left: "-40px",
                    width: "180px",
                    height: "180px",
                    background: "#06b6d4",
                    clipPath: "polygon(0 0, 0 100%, 100% 100%)",
                    zIndex: 2,
                  }}
                />

                {/* Large circle outline - top right area */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "-60px",
                    right: "40%",
                    width: "220px",
                    height: "220px",
                    border: "2px solid rgba(6, 182, 212, 0.4)",
                    borderRadius: "50%",
                    zIndex: 0,
                  }}
                />

                {/* Large circle outline - bottom right */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "10%",
                    right: "-80px",
                    width: "280px",
                    height: "280px",
                    border: "2px solid rgba(6, 182, 212, 0.4)",
                    borderRadius: "50%",
                    zIndex: 0,
                  }}
                />

                {/* Main image with custom mask */}
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    borderRadius: "200px 200px 20px",
                    overflow: "hidden",
                    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "-30px",
                      right: "-30px",
                      width: "250px",
                      height: "250px",
                      background: "rgba(6, 182, 212, 0.3)",
                      borderRadius: "50%",
                      filter: "blur(60px)",
                      zIndex: -1,
                    },
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                    alt="Business team collaboration"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </Box>

                {/* Small cyan dots */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "30%",
                    left: "15%",
                    width: "12px",
                    height: "12px",
                    background: "#06b6d4",
                    borderRadius: "50%",
                    zIndex: 3,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "15%",
                    right: "35%",
                    width: "8px",
                    height: "8px",
                    background: "#06b6d4",
                    borderRadius: "50%",
                    zIndex: 3,
                  }}
                />
              </Box>
            </ImageWrapper>
          </Grid>
        </Grid>
      </Container>
    </HeroBackground>
  );
};

export default HeroSection;
