import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const ManageReferrals = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Referrals
      </Typography>
      
      <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Referral Program Management
          </Typography>
          <Typography variant="body1" paragraph>
            This section will allow administrators to manage the referral program.
          </Typography>
          <Typography variant="body1" paragraph>
            Features to implement:
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">
                View all referrals across franchises
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Track referral status and rewards
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Manage referral program settings
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Generate referral reports
              </Typography>
            </li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ManageReferrals;