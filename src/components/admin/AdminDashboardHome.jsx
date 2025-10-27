import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorIcon from '@mui/icons-material/Error';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { styled } from '@mui/material/styles';
import { adminAPI } from '../../services/api'; // Import the admin API

// Styled components for enhanced UI
const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
  },
}));

const StatIconWrapper = styled(Box)(({ theme, color }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: `${color}20`,
  color: color,
  marginBottom: theme.spacing(2),
}));

const TrendChip = styled(Chip)(({ theme }) => ({
  height: 24,
  borderRadius: theme.shape.borderRadius,
  fontWeight: 600,
}));

const ActivityItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius * 1.5,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const QuickActionCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  border: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
    borderColor: theme.palette.primary.main,
  },
}));

const AdminDashboardHome = () => {
  const [stats, setStats] = useState({
    totalFranchises: 0,
    activeFranchises: 0,
    pendingKycFranchises: 0,
    totalPackages: 0,
    totalLeads: 0,
    totalTransactions: 0,
    totalRevenue: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch dashboard stats
        const statsResponse = await adminAPI.getDashboardStats();
        setStats(statsResponse.data);
        
        // Fetch recent activities
        const activitiesResponse = await adminAPI.getRecentActivities();
        setRecentActivities(activitiesResponse.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Total Franchises',
      value: stats.totalFranchises,
      icon: <PeopleIcon sx={{ fontSize: 30 }} />,
      color: '#6200ea',
      trend: '+12%',
      trendDirection: 'up',
    },
    {
      title: 'Active Franchises',
      value: stats.activeFranchises,
      icon: <BusinessIcon sx={{ fontSize: 30 }} />,
      color: '#03dac6',
      trend: '+8%',
      trendDirection: 'up',
    },
    {
      title: 'Pending KYC',
      value: stats.pendingKycFranchises,
      icon: <PendingIcon sx={{ fontSize: 30 }} />,
      color: '#ff9800',
      trend: '-2%',
      trendDirection: 'down',
    },
    {
      title: 'Total Packages',
      value: stats.totalPackages,
      icon: <CreditScoreIcon sx={{ fontSize: 30 }} />,
      color: '#4caf50',
      trend: '0%',
      trendDirection: 'neutral',
    },
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: <GroupIcon sx={{ fontSize: 30 }} />,
      color: '#ff4081',
      trend: '+24%',
      trendDirection: 'up',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: <AccountBalanceIcon sx={{ fontSize: 30 }} />,
      color: '#6200ea',
      trend: '+15%',
      trendDirection: 'up',
    },
  ];

  const quickActions = [
    { title: 'Add Franchise', icon: <PeopleIcon />, color: '#6200ea' },
    { title: 'Create Package', icon: <BusinessIcon />, color: '#03dac6' },
    { title: 'View Reports', icon: <AssessmentIcon />, color: '#ff4081' },
    { title: 'Manage Payouts', icon: <AccountBalanceIcon />, color: '#ff9800' },
  ];

  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="600px">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back, Administrator. Here's what's happening today.
          </Typography>
        </Box>
        <Chip
          label={`Last updated: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
          variant="outlined"
          size="small"
        />
      </Box>

      <Grid container spacing={3} mb={4}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} style={{flex:" 1"}}>
            <StatCard>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <StatIconWrapper color={card.color}>
                    {card.icon}
                  </StatIconWrapper>
                  {card.trendDirection !== 'neutral' && (
                    <TrendChip
                      icon={card.trendDirection === 'up' ? <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : <ArrowUpwardIcon sx={{ fontSize: 16, transform: 'rotate(180deg)' }} />}
                      label={card.trend}
                      size="small"
                      variant="outlined"
                      color={card.trendDirection === 'up' ? 'success' : 'warning'}
                      sx={{
                        '.MuiChip-icon': {
                          color: card.trendDirection === 'up' ? '#4caf50' : '#ff9800',
                        },
                      }}
                    />
                  )}
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.title}
                </Typography>
              </CardContent>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8} style={{flex:" 1"}}>
          <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Activity
                </Typography>
                <Chip label="Live" color="success" size="small" icon={<CheckCircleIcon sx={{ fontSize: 16 }} />} />
              </Box>
              <List sx={{ py: 0 }}>
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity, index) => (
                    <Box key={activity.id}>
                      <ListItem sx={{ px: 0, py: 1.5 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ 
                            bgcolor: activity.status === 'completed' ? '#4caf50' : 
                                    activity.status === 'pending' ? '#ff9800' : 
                                    activity.status === 'rejected' ? '#f44336' : '#2196f3'
                          }}>
                            {activity.status === 'completed' ? <CheckCircleIcon /> : 
                             activity.status === 'pending' ? <AccessTimeIcon /> : 
                             activity.status === 'rejected' ? <ErrorIcon /> : <AccessTimeIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={activity.user}
                          secondary={activity.action}
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {formatTime(activity.time)}
                        </Typography>
                      </ListItem>
                      {index < recentActivities.length - 1 && <Divider variant="middle" component="li" />}
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No recent activities
                  </Typography>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} style={{flex:" 1"}}>
          <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {quickActions.map((action, index) => (
                  <Grid item xs={6} key={index}>
                    <QuickActionCard>
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Avatar sx={{ bgcolor: `${action.color}20`, color: action.color, mx: 'auto', mb: 1 }}>
                            {action.icon}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {action.title}
                          </Typography>
                        </Box>
                      </CardContent>
                    </QuickActionCard>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1 }}>
                  System Status
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 20, mr: 1 }} />
                  <Typography variant="body2">All systems operational</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Performance Overview
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label="Weekly" variant="outlined" size="small" />
                  <Chip label="Monthly" variant="outlined" size="small" />
                  <Chip label="Yearly" variant="filled" size="small" color="primary" />
                </Box>
              </Box>
              <Box sx={{ 
                height: 300, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: 'grey.50',
                borderRadius: 2,
                border: '1px dashed rgba(0,0,0,0.12)'
              }}>
                <Typography variant="body1" color="text.secondary">
                  Chart visualization would appear here
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboardHome;