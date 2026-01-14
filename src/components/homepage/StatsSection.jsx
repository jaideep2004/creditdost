import React from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  styled,
  Button,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import AddIcon from "@mui/icons-material/Add";

const AboutSection = styled(Box)(({ theme }) => ({
  position: "relative",

  overflow: "hidden",
  backgroundColor: "#fff",
}));

const FloatingDots = styled(Box)({
  position: "absolute",
  left: "8%",
  top: "53%",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  animation: "float 3s ease-in-out infinite",
  "@keyframes float": {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-20px)" },
  },
});

const WaveLines = styled(Box)({
  position: "absolute",
  left: "46%",
  top: "15%",
  opacity: 0.5,
  animation: "wave 4s ease-in-out infinite",
  "@keyframes wave": {
    "0%, 100%": { transform: "translateX(0px)" },
    "50%": { transform: "translateX(10px)" },
  },
});

const FloatingCircles = styled(Box)({
  position: "absolute",
  right: "8%",
  bottom: "25%",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "8px",
  animation: "pulse 2s ease-in-out infinite",
  "@keyframes pulse": {
    "0%, 100%": { opacity: 0.4, transform: "scale(1)" },
    "50%": { opacity: 0.7, transform: "scale(1.05)" },
  },
});

const ImageContainer = styled(Box)({
  position: "relative",
  height: "600px",
  maxWidth: "550px",
});

const Badge = styled(Box)({
  position: "absolute",
  top: "40px",
  right: "-10px",
  backgroundColor: "#0077B6",
  color: "white",
  padding: "16px 24px",
  borderRadius: "12px",
  fontWeight: "bold",
  zIndex: 3,
  boxShadow: "0 4px 16px rgba(0,119,182,0.4)",
});

const TopImage = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "90%",
  height: "320px",
  objectFit: "cover",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  transition: "transform 0.3s ease",
  zIndex: 2,
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const BottomImage = styled("img")({
  position: "absolute",
  bottom: "88px",
  right: "-25px",
  width: "70%",
  height: "280px",
  objectFit: "cover",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  transition: "transform 0.3s ease",
  zIndex: 3,
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const ListItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "12px",
  color: "#555",
  fontSize: "0.95rem",
});

const AboutButton = styled(Button)({
  backgroundColor: "#0077B6",
  color: "white",
  padding: "14px 32px",
  borderRadius: "50px",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 600,
  marginTop: "20px",
  "&:hover": {
    backgroundColor: "#005F8E",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0,119,182,0.4)",
  },
  transition: "all 0.3s ease",
});

const StatsSection = () => {
  return (
    <AboutSection style={{ paddingTop: "56px" }}>
      <FloatingDots>
        {[...Array(12)].map((_, i) => (
          <CircleIcon
            key={i}
            sx={{ fontSize: 8, color: "#0077B6", opacity: 0.6 }}
          />
        ))}
      </FloatingDots>

      <WaveLines>
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: "60px",
              height: "60px",
              border: "2px solid #ddd",
              borderRadius: "50% 0",
              marginBottom: "10px",
              transform: `rotate(${i * 20}deg)`,
            }}
          />
        ))}
      </WaveLines>

      <FloatingCircles>
        {[...Array(16)].map((_, i) => (
          <CircleIcon
            key={i}
            sx={{ fontSize: 6, color: "#0077B6", opacity: 0.4 }}
          />
        ))}
      </FloatingCircles>

      <Container style={{ maxWidth: "1400px" }}>
        <Grid
          container
          spacing={6}
          alignItems="center"
          style={{ flexWrap: "nowrap" }}
        >
          <Grid item xs={12} md={6} style={{ flex: "1" }}>
            <ImageContainer>
              <Badge>
                <Typography
                  sx={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1 }}
                >
                  11
                </Typography>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 500 }}>
                  Years Of
                </Typography>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 500 }}>
                  experience
                </Typography>
              </Badge>
              <TopImage
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop"
                alt="Business professional"
              />
              <BottomImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=400&fit=crop"
                alt="Team collaboration"
              />
            </ImageContainer>
          </Grid>

          <Grid item xs={12} md={6} style={{ flex: "1" }}>
            <Typography
              variant="overline"
              sx={{
                color: "#0077B6",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: 2,
              }}
            >
              ABOUT US
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: "#1a1a1a",
                marginTop: 2,
                marginBottom: 3,
                lineHeight: 1.2,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Solutions That Make a Difference
            </Typography>
            <Typography
              sx={{
                color: "#666",
                marginBottom: 3,
                lineHeight: 1.8,
                fontSize: "0.95rem",
              }}
            >
              At <b>Credit Dost</b>, we believe everyone deserves a second chance to
              rebuild their credit and financial confidence. We are India's
              dedicated Credit Score Improvement and Dispute Resolution Company,
              helping individuals repair, rebuild, and manage their credit
              health with transparency, accuracy, and trust.
            </Typography>

            {/* <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <CircleIcon sx={{ fontSize: 10, color: "#0077B6" }} />
                  <Typography>Mistakes To Avoid 10 dum Auam.</Typography>
                </ListItem>
                <ListItem>
                  <CircleIcon sx={{ fontSize: 10, color: "#0077B6" }} />
                  <Typography>Your Startup industry stan</Typography>
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <CircleIcon sx={{ fontSize: 10, color: "#0077B6" }} />
                  <Typography>Avoid 10 the dumy mistakes</Typography>
                </ListItem>
                <ListItem>
                  <CircleIcon sx={{ fontSize: 10, color: "#0077B6" }} />
                  <Typography>Our Startup industry Here</Typography>
                </ListItem>
              </Grid>
            </Grid> */}

            <AboutButton endIcon={<AddIcon />} href="/about">About Us</AboutButton>
          </Grid>
        </Grid>
      </Container>
    </AboutSection>
  );
};

export default StatsSection;
