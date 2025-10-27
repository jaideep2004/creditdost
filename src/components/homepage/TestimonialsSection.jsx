import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Avatar, Box, styled } from '@mui/material';

const SectionBackground = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.default,
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 25px rgba(0,0,0,0.1)',
  },
}));

const TestimonialAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  margin: '0 auto 20px',
  border: `3px solid ${theme.palette.primary.main}`,
}));

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Franchise Owner',
    company: 'Delhi Branch',
    content: 'CreditDost has transformed how we manage our credit verification process. The platform is intuitive and the support team is exceptional.',
    avatar: '/images/cred.png'
  },
  {
    name: 'Priya Sharma',
    role: 'Business Manager',
    company: 'Mumbai Operations',
    content: 'The dashboard provides all the insights we need to grow our business. The reporting features are particularly impressive.',
    avatar: '/images/cred.png'
  },
  {
    name: 'Amit Patel',
    role: 'Regional Head',
    company: 'Gujarat Zone',
    content: 'Since implementing CreditDost, our efficiency has increased by 60%. The franchise management tools are game-changing.',
    avatar: '/images/cred.png'
  },
];

const TestimonialsSection = () => {
  return (
    <SectionBackground>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          textAlign="center" 
          fontWeight="800"
          mb={2}
          sx={{ 
            background: `linear-gradient(45deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          What Our Clients Say
        </Typography>
        <Typography 
          variant="h6" 
          textAlign="center" 
          color="text.secondary" 
          mb={8}
          sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400 }}
        >
          Don't just take our word for it. Here's what our franchise partners have to say about their experience
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <TestimonialCard>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <TestimonialAvatar 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                  />
                  <Typography variant="body1" color="text.secondary" fontStyle="italic" mb={2}>
                    "{testimonial.content}"
                  </Typography>
                  <Typography variant="h6" fontWeight="700">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.role}, {testimonial.company}
                  </Typography>
                </CardContent>
              </TestimonialCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionBackground>
  );
};

export default TestimonialsSection;