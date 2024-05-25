import React from 'react';
import { Box, Button, Typography, Paper, Grid, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';

export const HostedZoneDetails = ({ hostedZone }) => {
  const { hostedZoneId } =  useParams();
  const navigate = useNavigate();
  const {AuthorizationToken} = useAuth();
  const handleDeleteHostedZone = async() => {
    try {
      const response = await fetch(`https://dns-manager-g5md.onrender.com/api/domains/delete/${hostedZoneId}`, {
        method : 'DELETE',
        headers : {
          Authorization : AuthorizationToken,
        }
      })
      if(response.ok){
        const data = await response.json();
        console.log(data);
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }
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
        <Button onClick={handleDeleteHostedZone} variant="outlined" sx={{ mr: 2 }}>
          Delete zone
        </Button>
      </Box>
    </Paper>
  );
};

