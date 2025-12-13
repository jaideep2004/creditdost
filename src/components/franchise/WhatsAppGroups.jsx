import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  WhatsApp,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
  Link as LinkIcon,
} from '@mui/icons-material';

const WhatsAppGroups = () => {
  // Social media and group links
  const socialLinks = [
    {
      name: 'Main WhatsApp Group',
      url: import.meta.env.VITE_WHATSAPP_GROUP_LINK || 'https://wa.me/YOUR_WHATSAPP_NUMBER_OR_GROUP_LINK',
      icon: <WhatsApp sx={{ color: '#25D366' }} />,
      description: 'Join our main WhatsApp group for general discussions and announcements'
    },
    {
      name: 'Technical Support Group',
      url: import.meta.env.VITE_TECHNICAL_SUPPORT_WHATSAPP_LINK || 'https://wa.me/YOUR_TECHNICAL_SUPPORT_WHATSAPP_LINK',
      icon: <WhatsApp sx={{ color: '#25D366' }} />,
      description: 'Get technical support and assistance with platform issues'
    },
    {
      name: 'Sales & Marketing Group',
      url: import.meta.env.VITE_SALES_MARKETING_WHATSAPP_LINK || 'https://wa.me/YOUR_SALES_MARKETING_WHATSAPP_LINK',
      icon: <WhatsApp sx={{ color: '#25D366' }} />,
      description: 'Connect with other franchise partners for sales and marketing tips'
    }
  ];

  const socialMediaLinks = [
    {
      name: 'Facebook',
      url: import.meta.env.VITE_FACEBOOK_LINK || 'https://www.facebook.com/yourcompany',
      icon: <Facebook sx={{ color: '#1877F2' }} />,
      description: 'Follow us on Facebook for updates and news'
    },
    {
      name: 'Instagram',
      url: import.meta.env.VITE_INSTAGRAM_LINK || 'https://www.instagram.com/yourcompany',
      icon: <Instagram sx={{ color: '#E4405F' }} />,
      description: 'Follow us on Instagram for visual updates and stories'
    },
    {
      name: 'LinkedIn',
      url: import.meta.env.VITE_LINKEDIN_LINK || 'https://www.linkedin.com/company/yourcompany',
      icon: <LinkedIn sx={{ color: '#0A66C2' }} />,
      description: 'Connect with us on LinkedIn for professional networking'
    },
    {
      name: 'Twitter',
      url: import.meta.env.VITE_TWITTER_LINK || 'https://twitter.com/yourcompany',
      icon: <Twitter sx={{ color: '#1DA1F2' }} />,
      description: 'Follow us on Twitter for quick updates and news'
    },
    {
      name: 'YouTube',
      url: import.meta.env.VITE_YOUTUBE_LINK || 'https://www.youtube.com/yourchannel',
      icon: <YouTube sx={{ color: '#FF0000' }} />,
      description: 'Subscribe to our YouTube channel for tutorials and videos'
    }
  ];

  const handleJoinGroup = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        WhatsApp Groups & Social Media
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mb: 3 }}>
        Connect with our community through various WhatsApp groups and social media platforms. 
        Join relevant groups to stay updated, get support, and network with other franchise partners.
      </Typography>

      {/* WhatsApp Groups Section */}
      <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            WhatsApp Groups
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph sx={{ mb: 3 }}>
            Join our WhatsApp groups to connect with other franchise partners and get real-time support.
          </Typography>
          
          <Grid container spacing={3}>
            {socialLinks.map((group, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderColor: '#25D366',
                    borderWidth: '2px'
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        {group.icon}
                      </ListItemIcon>
                      <Typography variant="h6" component="div">
                        {group.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {group.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button 
                      variant="contained" 
                      startIcon={<WhatsApp />}
                      onClick={() => handleJoinGroup(group.url)}
                      sx={{ 
                        backgroundColor: '#25D366',
                        '&:hover': {
                          backgroundColor: '#128C7E'
                        }
                      }}
                    >
                      Join Group
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Social Media Section */}
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Social Media
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph sx={{ mb: 3 }}>
            Follow us on social media for updates, news, and community engagement.
          </Typography>
          
          <Grid container spacing={3}>
            {socialMediaLinks.map((platform, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column'
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        {platform.icon}
                      </ListItemIcon>
                      <Typography variant="h6" component="div">
                        {platform.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {platform.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<LinkIcon />}
                      onClick={() => handleJoinGroup(platform.url)}
                    >
                      Follow
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Information Section */}
      <Card sx={{ mt: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'info.light' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Need Help?
          </Typography>
          <Typography variant="body2" paragraph>
            If you're having trouble joining any of our groups or accessing our social media accounts, 
            please contact our support team at{' '}
            <Chip 
              label={import.meta.env.VITE_SUPPORT_EMAIL || 'support@yourcompany.com'} 
              size="small" 
              sx={{ ml: 1, fontWeight: 'bold' }} 
            />
          </Typography>
          <Typography variant="body2">
            For immediate assistance, you can also reach us via WhatsApp at{' '}
            <Chip 
              label={import.meta.env.VITE_SUPPORT_PHONE || '+91 9876543210'} 
              size="small" 
              sx={{ ml: 1, fontWeight: 'bold' }} 
            />
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WhatsAppGroups;