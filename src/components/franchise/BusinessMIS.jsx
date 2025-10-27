import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const BusinessMIS = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Business MIS
      </Typography>
      
      <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Management Information System
          </Typography>
          <Typography variant="body1" paragraph>
            This section will display business analytics and reports for franchise partners.
          </Typography>
          <Typography variant="body1" paragraph>
            Features to implement:
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">
                Sales performance reports
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Credit check analytics
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Lead conversion metrics
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Revenue tracking
              </Typography>
            </li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BusinessMIS;