import React, { useState } from 'react';
import { Box, Container, Grid, Typography, TextField, Button, Paper, IconButton } from '@mui/material';
import { Phone, Email, LocationOn, Facebook, Twitter, LinkedIn, YouTube } from '@mui/icons-material';
import Header from './homepage/Header';
import HomePageFooter from './homepage/HomePageFooter';
import api from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to backend API
      await api.post('/forms/contact', formData);
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      // Show success message
      alert('Thank you for your message. We will get back to you soon!');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to submit your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    // {
    //   icon: <LocationOn sx={{ fontSize: 40, color: '#0891b2' }} />,
    //   title: 'Address',
    //   content: '6391 Elgin St. Celina, 10299'
    // },
    {
      icon: <Email sx={{ fontSize: 40, color: '#0891b2' }} />,
      title: 'Mail Us',
      content: [' info@creditdost.co.in']
    },
    {
      icon: <Phone sx={{ fontSize: 40, color: '#0891b2' }} />,
      title: 'Telephone',
      content: ['98213-89400']
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header />
      
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0L50 50L0 100\' fill=\'none\' stroke=\'rgba(255,255,255,0.05)\' stroke-width=\'2\'/%3E%3Cpath d=\'M50 0L100 50L50 100\' fill=\'none\' stroke=\'rgba(255,255,255,0.05)\' stroke-width=\'2\'/%3E%3C/svg%3E")',
            opacity: 0.3
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={12}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  mb: 2,
                  textAlign: 'center'
                }}
              >
                Contact Us
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" sx={{ display: 'inline', mr: 1 }}>
                  Home
                </Typography>
                <span style={{ margin: '0 10px' }}>→</span>
                <Typography variant="body1" sx={{ display: 'inline', fontWeight: 600 }}>
                  Contact
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container sx={{ py: 8 }} style={{ maxWidth: '1300px' }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7} style={{flex:"1"}}>
            <Paper 
              sx={{ 
                p: 4, 
                borderRadius: 2, 
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                height: '100%'
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3, 
                  color: '#1e3a5f',
                  position: 'relative',
                  pb: 2,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '60px',
                    height: '4px',
                    background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                    borderRadius: '2px'
                  }
                }}
              >
                Get in touch
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#64748b', 
                  mb: 4,
                  fontSize: '1.1rem'
                }}
              >
                We are here for you! How can we help?
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3} style={{flexDirection:"column"}}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#e2e8f0'
                          },
                          '&:hover fieldset': {
                            borderColor: '#cbd5e1'
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#0891b2'
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#e2e8f0'
                          },
                          '&:hover fieldset': {
                            borderColor: '#cbd5e1'
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#0891b2'
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#e2e8f0'
                          },
                          '&:hover fieldset': {
                            borderColor: '#cbd5e1'
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#0891b2'
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={6}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#e2e8f0'
                          },
                          '&:hover fieldset': {
                            borderColor: '#cbd5e1'
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#0891b2'
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      sx={{
                        background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                        color: 'white',
                        fontWeight: 700,
                        textTransform: 'none',
                        padding: '12px 32px',
                        borderRadius: '50px',
                        fontSize: '1rem',
                        boxShadow: '0 4px 20px rgba(8, 145, 178, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 25px rgba(8, 145, 178, 0.4)',
                          background: 'linear-gradient(135deg, #0e7490 0%, #0891b2 100%)'
                        },
                        '&.Mui-disabled': {
                          background: 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)',
                          color: 'white'
                        }
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={5} style={{flex:"1", flexDirection:"column"}}>
            <Paper 
              sx={{ 
                p: 4, 
                borderRadius: 2, 
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                height: '100%'
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 4, 
                  color: '#1e3a5f',
                  position: 'relative',
                  pb: 2,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '60px',
                    height: '4px',
                    background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                    borderRadius: '2px'
                  }
                }}
              >
                Contact Information
              </Typography>
              
              <Grid container spacing={4}>
                {contactInfo.map((info, index) => (
                  <Grid item xs={12} key={index} style={{width: '100%'}}>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Box sx={{ 
                        width: 70, 
                        height: 70, 
                        borderRadius: '50%', 
                        background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600, 
                            mb: 1, 
                            color: '#1e3a5f' 
                          }}
                        >
                          {info.title}
                        </Typography>
                        {Array.isArray(info.content) ? (
                          info.content.map((item, i) => (
                            <Typography 
                              key={i}
                              variant="body1" 
                              sx={{ 
                                color: '#64748b', 
                                mb: 0.5,
                                textDecoration: 'none',
                                display: 'block',
                                '&:hover': { color: '#0891b2' }
                              }}
                              component="a"
                              href={info.title === 'Mail Us' ? `mailto:${item}` : info.title === 'Telephone' ? `tel:${item}` : undefined}
                            >
                              {item}
                            </Typography>
                          ))
                        ) : (
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: '#64748b' 
                            }}
                          >
                            {info.content}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid> 
                ))}
              </Grid>
              
              {/* Social Media */}
              <Box sx={{ mt: 6 }}>
                <Typography 
                  variant="h6"   
                  sx={{ 
                    fontWeight: 600, 
                    mb: 3, 
                    color: '#1e3a5f' 
                  }}
                >
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                      color: 'white',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 4px 15px rgba(8, 145, 178, 0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                      color: 'white',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 4px 15px rgba(8, 145, 178, 0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Twitter />
                  </IconButton>
                  <IconButton 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                      color: 'white',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 4px 15px rgba(8, 145, 178, 0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <LinkedIn />
                  </IconButton>
                  <IconButton 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                      color: 'white',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 4px 15px rgba(8, 145, 178, 0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <YouTube />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Newsletter Section */}
        <Paper 
          sx={{ 
            p: 5, 
            borderRadius: 2, 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            mt: 6,
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              mb: 2
            }}
          >
            Get notified about the event! Subscribe today
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4,
              opacity: 0.9
            }}
          >
            Stay updated with our latest news and offers
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, maxWidth: 500, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Enter your email"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.3)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.5)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white'
                  },
                  '& input': {
                    color: 'white'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)'
                }
              }}
            />
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                color: 'white',
                fontWeight: 700,
                textTransform: 'none',
                padding: '12px 24px',
                borderRadius: '50px',
                fontSize: '1rem',
                boxShadow: '0 4px 20px rgba(8, 145, 178, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(8, 145, 178, 0.4)',
                  background: 'linear-gradient(135deg, #0e7490 0%, #0891b2 100%)'
                }
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Paper>
      </Container>
      
      <HomePageFooter />
    </Box>
  );
};

export default ContactPage;