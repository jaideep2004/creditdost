import React from 'react';
import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import HistorySection from './HistorySection';
import MissionSection from './MissionSection';
import TeamSection from './TeamSection';
import StatsSection from './StatsSection';
import Header from '../homepage/Header';
import HomePageFooter from '../homepage/HomePageFooter';
import FAQSection from '../homepage/FAQSection';
import TestimonialSection from '../homepage/TestimonialsSection';

const AboutPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <HeroSection />
      <HistorySection />
      <FAQSection/>
      <MissionSection />
      <TestimonialSection/>
      <TeamSection />
     
      <HomePageFooter/>
    </Box>
  );
};

export default AboutPage;