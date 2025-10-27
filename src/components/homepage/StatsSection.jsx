import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, styled } from '@mui/material';

const StatsBackground = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`,
  padding: theme.spacing(8, 0),
  margin: theme.spacing(8, 0),
  borderRadius: theme.shape.borderRadius * 3,
}));

const StatCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  boxShadow: 'none',
  backgroundColor: 'transparent',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '3rem',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
}));

const stats = [
  { number: '500+', label: 'Active Franchises' },
  { number: '10K+', label: 'Credit Reports Generated' },
  { number: '99.9%', label: 'Uptime Guarantee' },
  { number: '24/7', label: 'Support Available' },
];

const StatsSection = () => {
  return (
    <StatsBackground>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <StatCard>
                <CardContent>
                  <StatNumber>
                    {stat.number}
                  </StatNumber>
                  <Typography variant="h6" color="text.secondary" fontWeight={600}>
                    {stat.label}
                  </Typography>
                </CardContent>
              </StatCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StatsBackground>
  );
};

export default StatsSection;