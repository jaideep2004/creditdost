import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const ViewReports = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        View Reports
      </Typography>
      
      <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            System Reports
          </Typography>
          <Typography variant="body1" paragraph>
            This section will display various system reports for administrators.
          </Typography>
          <Typography variant="body1" paragraph>
            Reports to implement:
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">
                Franchise performance reports
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Financial reports and revenue tracking
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                User activity and engagement reports
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                System audit logs
              </Typography>
            </li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewReports;