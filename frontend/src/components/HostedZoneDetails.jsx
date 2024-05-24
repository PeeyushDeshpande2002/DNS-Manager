import React from 'react';
import { Box, Button, Typography, Paper, Grid, Divider } from '@mui/material';

export const HostedZoneDetails = ({ hostedZone }) => {
    console.log(hostedZone);
  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop : '80px' }}>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          {hostedZone.Name}
        </Typography>
      </Box>
      <Box mb={3}>
        <Typography variant="h6">Hosted zone details</Typography>
        <Divider />
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Hosted zone name: </strong> {hostedZone.Name}
            </Typography>
            <Typography variant="body1">
              <strong>Hosted zone ID:</strong> {hostedZone.Id}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {hostedZone.Config.Comment}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Record count: </strong> {hostedZone.ResourceRecordSetCount}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="outlined" sx={{ mr: 2 }}>
          Delete zone
        </Button>
        <Button variant="contained" color="primary">
          Edit hosted zone
        </Button>
      </Box>
    </Paper>
  );
};

