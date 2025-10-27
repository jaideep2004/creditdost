import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, styled } from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  LinkedIn as LinkedInIcon, 
  Instagram as InstagramIcon 
} from '@mui/icons-material';

const FooterBackground = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[900],
  color: theme.palette.common.white,
  padding: theme.spacing(8, 0, 4),
  marginTop: theme.spacing(8),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.grey[400],
  textDecoration: 'none',
  display: 'block',
  marginBottom: theme.spacing(1),
  '&:hover': {
    color: theme.palette.common.white,
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.grey[800],
  margin: theme.spacing(0, 0.5),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const HomePageFooter = () => {
  return (
    <FooterBackground component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="700">
              CreditDost
            </Typography>
            <Typography variant="body2" color="grey.400" mb={2}>
              Empowering franchise partners with cutting-edge credit verification and business management tools.
            </Typography>
            <Box>
              <SocialIcon size="small">
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon size="small">
                <TwitterIcon />
              </SocialIcon>
              <SocialIcon size="small">
                <LinkedInIcon />
              </SocialIcon>
              <SocialIcon size="small">
                <InstagramIcon />
              </SocialIcon>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="700">
              Products
            </Typography>
            <FooterLink href="#">Features</FooterLink>
            <FooterLink href="#">Solutions</FooterLink>
            <FooterLink href="#">Pricing</FooterLink>
            <FooterLink href="#">Demo</FooterLink>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="700">
              Resources
            </Typography>
            <FooterLink href="#">Blog</FooterLink>
            <FooterLink href="#">Documentation</FooterLink>
            <FooterLink href="#">Guides</FooterLink>
            <FooterLink href="#">Support</FooterLink>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="700">
              Company
            </Typography>
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
            <FooterLink href="#">Partners</FooterLink>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="700">
              Legal
            </Typography>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
            <FooterLink href="#">Compliance</FooterLink>
          </Grid>
        </Grid>
        
        <Box mt={8} pt={4} borderTop={`1px solid ${theme => theme.palette.grey[800]}`} textAlign="center">
          <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} CreditDost. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterBackground>
  );
};

export default HomePageFooter;