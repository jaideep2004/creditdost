import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { People, CreditScore, AccountBalance, TrendingUp } from '@mui/icons-material';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    credits: 0,
    totalLeads: 0,
    newLeads: 0,
    totalCreditReports: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch data from the API
    // For now, we'll use mock data
    setTimeout(() => {
      setStats({
        credits: 42,
        totalLeads: 128,
        newLeads: 5,
        totalCreditReports: 96,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: 'Available Credits',
      value: stats.credits,
      icon: <CreditScore sx={{ fontSize: 40 }} />,
      color: '#6200ea',
    },
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#03dac6',
    },
    {
      title: 'New Leads',
      value: stats.newLeads,
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#ff4081',
    },
    {
      title: 'Credit Reports',
      value: stats.totalCreditReports,
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      color: '#00c853',
    },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3} mt={2}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} style={{flex:" 1"}}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: 3,
              borderRadius: 2,
            }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: card.color, mb: 2 }}>
                  {card.icon}
                </Box>
                <Typography variant="h5" component="div" gutterBottom>
                  {card.value}
                </Typography>
                <Typography color="text.secondary">
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={8} style={{flex:" 1"}}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Box sx={{ minHeight: 200 }}>
                <Typography color="text.secondary" align="center" sx={{ mt: 8 }}>
                  No recent activity to display
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} style={{flex:" 1"}}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ minHeight: 200 }}>
                <Typography color="text.secondary" align="center" sx={{ mt: 8 }}>
                  No quick actions available
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;