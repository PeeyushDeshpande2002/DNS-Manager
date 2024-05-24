import React, { useState } from 'react'
import HostedZoneTable from '../components/HostedZoneTable.jsx'
import { Box, Button } from '@mui/material';
import DomainModal from '../modals/CreateHostedZoneModal.jsx';

const Dashboard = ({}) => {
  const [openModal, setOpenModal] = useState();
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddDomain = async(domainData) => {
    try {
      const response = await fetch('http://localhost:5000/api/domains/create', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(domainData)
      });
      if(response.ok){
        console.log('Adding domain:', domainData);
        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <h1>Hosted Zones</h1>
       <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center"  
      sx={{ backgroundColor: '#f5f5f5' }}
    >
      <Box display={'flex'}  flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <HostedZoneTable/>
      <Button sx={{marginTop : '25px', marginBottom : '25px'}} variant="contained" color="primary" onClick={handleOpenModal}>
       Create Hosted Zone
      </Button>
      <DomainModal open={openModal} handleClose={handleCloseModal} handleSubmit={handleAddDomain} />
      </Box>
      </Box></Box>
  )
}

export default Dashboard
