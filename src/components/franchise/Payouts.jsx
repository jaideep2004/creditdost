import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Payouts = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payouts
      </Typography>
      
      <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Payout Information
          </Typography>
          <Typography variant="body1" paragraph>
            This section will display payout details and history for franchise partners.
          </Typography>
          <Typography variant="body1" paragraph>
            Features to implement:
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">
                Payout schedule information
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Payout history and status tracking
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Commission calculations
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Tax documentation
              </Typography>
            </li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Payouts;