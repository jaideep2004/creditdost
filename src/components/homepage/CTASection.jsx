import React from 'react';
import { Container, Typography, Button, Box, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';

const CTASectionBackground = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  padding: theme.spacing(12, 0),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius * 3,
  margin: theme.spacing(8, 0),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: `radial-gradient(circle, ${theme.palette.common.white}10 0%, transparent 70%)`,
    transform: 'rotate(30deg)',
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 1),
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius * 2,
  fontWeight: 600,
  fontSize: '1.1rem',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
  },
}));

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <CTASectionBackground>
      <Container maxWidth="md">
        <Typography 
          variant="h2" 
          component="h2" 
          gutterBottom 
          fontWeight="800"
          sx={{ 
            color: 'common.white',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            mb: 3,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Ready to Transform Your Business?
        </Typography>
        <Typography 
          variant="h5" 
          color="common.white"
          sx={{ 
            mb: 5,
            maxWidth: 700,
            mx: 'auto',
            textShadow: '0 1px 3px rgba(0,0,0,0.2)',
            opacity: 0.9,
            fontSize: { xs: '1.1rem', md: '1.3rem' }
          }}
        >
          Join hundreds of franchise partners who are already using CreditDost to grow their business
        </Typography>
        <Box mt={4}>
          <CTAButton 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/register')}
            endIcon={<ArrowForward />}
            sx={{ 
              backgroundColor: 'common.white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'grey.100',
              }
            }}
          >
            Get Started Today
          </CTAButton>
        </Box>
      </Container>
    </CTASectionBackground>
  );
};

export default CTASection;