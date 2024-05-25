import React, { useState } from 'react'
import HostedZoneTable from '../components/HostedZoneTable.jsx'
import { Box, Button } from '@mui/material';
import DomainModal from '../modals/CreateHostedZoneModal.jsx';
import { useAuth } from '../store/auth.jsx';
import { toast } from 'react-toastify';

const Dashboard = ({}) => {
  const [openModal, setOpenModal] = useState();
  const {AuthorizationToken} = useAuth();
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddDomain = async(domainData) => {
    try {
      const response = await fetch('https://dns-manager-g5md.onrender.com/api/domains/create', {
        method : 'POST',
        headers : {
          Authorization : AuthorizationToken,
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(domainData)
      });
      if(response.ok){
        console.log('Adding domain:', domainData);
        handleCloseModal();
        toast.success('Added the domain successfully')
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while adding domain ")
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
