import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { 
  People, 
  CreditScore, 
  AccountBalance, 
  TrendingUp,
  Assessment,
  GroupAdd,
  ShoppingCart,
  PersonSearch,
  CheckCircle,
  Star,
} from '@mui/icons-material';
import { franchiseAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    credits: 0,
    totalLeads: 0,
    newLeads: 0,
    totalCreditReports: 0,
    totalReferrals: 0,
  });
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [purchasedPackage, setPurchasedPackage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard stats
        const dashboardResponse = await franchiseAPI.getDashboardStats();
        
        // Fetch recent credit reports
        const reportsResponse = await franchiseAPI.getCreditReports();
        const recentReports = reportsResponse.data.slice(0, 5); // Get last 5 reports
        
        // Fetch transactions to get purchased package
        const transactionsResponse = await franchiseAPI.getTransactions();
        const paidTransactions = transactionsResponse.data.filter(tx => tx.status === 'paid');
        const latestTransaction = paidTransactions.length > 0 ? paidTransactions[0] : null;
        
        setStats({
          credits: dashboardResponse.data.stats.credits,
          totalLeads: dashboardResponse.data.stats.totalLeads,
          newLeads: dashboardResponse.data.stats.newLeads,
          totalCreditReports: dashboardResponse.data.stats.totalCreditReports,
          totalReferrals: dashboardResponse.data.stats.totalReferrals,
        });
        
        setRecentReports(recentReports);
        
        // Set purchased package from latest transaction
        if (latestTransaction && latestTransaction.packageId) {
          setPurchasedPackage({
            name: latestTransaction.packageId.name,
            credits: latestTransaction.packageId.creditsIncluded || 0,
            purchaseDate: latestTransaction.createdAt
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };
    
    fetchData();
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

  const quickActions = [
    {
      title: 'Generate Credit Report',
      icon: <Assessment sx={{ fontSize: 30 }} />,
      color: '#6200ea',
      path: '/franchise/credit-check',
      description: 'Check customer credit scores'
    },
    {
      title: 'Manage Leads',
      icon: <PersonSearch sx={{ fontSize: 30 }} />,
      color: '#03dac6',
      path: '/franchise/leads',
      description: 'View and manage customer leads'
    },
    {
      title: 'View Reports',
      icon: <CreditScore sx={{ fontSize: 30 }} />,
      color: '#ff4081',
      path: '/franchise/reports',
      description: 'View generated credit reports'
    },
    {
      title: 'Refer Franchise',
      icon: <GroupAdd sx={{ fontSize: 30 }} />,
      color: '#00c853',
      path: '/franchise/referrals',
      description: 'Refer new franchise partners'
    },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      {/* Purchased Package Section */}
      {purchasedPackage && (
        <Card sx={{ 
          mb: 3, 
          boxShadow: 3, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, #6200ea 0%, #03dac6 100%)',
          color: 'white'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
                  Your Current Package
                </Typography>
                <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                  {purchasedPackage.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>{purchasedPackage.credits} Credits</strong> included
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Purchased on {new Date(purchasedPackage.purchaseDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Box>
                <Chip 
                  icon={<Star />} 
                  label="Active" 
                  color="success" 
                  sx={{ 
                    fontWeight: 'bold',
                    height: 32,
                    '& .MuiChip-icon': {
                      color: 'white !important'
                    }
                  }} 
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
      
      <Grid container spacing={3} mt={2}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} style={{flex: "1"}}>
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
        <Grid item xs={12} md={8} style={{flex: "1"}}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Credit Reports
              </Typography>
              {recentReports.length === 0 ? (
                <Box sx={{ minHeight: 200 }}>
                  <Typography color="text.secondary" align="center" sx={{ mt: 8 }}>
                    No credit reports generated yet
                  </Typography>
                </Box>
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 400 }} aria-label="recent reports table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Bureau</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentReports.map((report) => (
                        <TableRow
                          key={report._id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {report.name}
                          </TableCell>
                          <TableCell>
                            {report.bureau ? report.bureau.toUpperCase() : 'N/A'}
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{
                                color: report.score >= 700 ? 'success.main' : 
                                       report.score >= 600 ? 'warning.main' : 'error.main',
                                fontWeight: 'bold',
                              }}
                            >
                              {report.score || 'N/A'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {new Date(report.createdAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} style={{flex: "1"}}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: 2,
                mt: 2
              }}>
                {quickActions.map((action, index) => (
                  <Tooltip key={index} title={action.description} placement="top">
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 3,
                          bgcolor: 'background.default'
                        }
                      }}
                      onClick={() => navigate(action.path)}
                    >
                      <Box sx={{ 
                        color: action.color, 
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        bgcolor: `${action.color}15`,
                      }}>
                        {action.icon}
                      </Box>
                      <Typography 
                        variant="body2" 
                        align="center"
                        sx={{ 
                          fontWeight: 'medium',
                          fontSize: '0.8rem'
                        }}
                      >
                        {action.title}
                      </Typography>
                    </Card>
                  </Tooltip>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;