import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Check as CheckIcon,
  CreditScore as CreditScoreIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/packages");
      setPackages(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load packages. Please try again later.");
      console.error("Error fetching packages:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = (pkg) => {
    // Navigate to payment page with package details
    navigate("/franchise/payment", { state: { package: pkg } });
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Choose Your Package
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
          Select the perfect package for your business needs and start verifying credits today
        </Typography>
      </Box>

      {packages.length === 0 ? (
        <Alert severity="info">No packages available at the moment. Please check back later.</Alert>
      ) : (
        <Grid container spacing={4}>
          {packages.map((pkg) => (
            <Grid item xs={12} sm={6} md={4} key={pkg._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h5" component="h2" fontWeight="bold">
                      {pkg.name}
                    </Typography>
                    {pkg.mostPopular && (
                      <Chip label="Most Popular" color="primary" size="small" />
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 60 }}>
                    {pkg.description}
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h3" component="div" color="primary.main" fontWeight="bold">
                      ₹{pkg.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      for {pkg.creditsIncluded} credits
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${pkg.creditsIncluded} Credit Checks`} 
                        secondary="Valid for business use" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ScheduleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${pkg.validityDays} Days Validity`} 
                        secondary="From purchase date" 
                      />
                    </ListItem>
                    {pkg.features && pkg.features.map((feature, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                
                <CardActions sx={{ justifyContent: "center", p: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => handlePurchase(pkg)}
                    sx={{ 
                      py: 1.5,
                      fontWeight: 600,
                      borderRadius: 2,
                    }}
                  >
                    Purchase Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Packages;