import React, { useState } from 'react'
import HostedZoneTable from '../pages/HostedZoneTable.jsx'
import { Button } from '@mui/material';
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
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
       Create Hosted Zone
      </Button>
      <DomainModal open={openModal} handleClose={handleCloseModal} handleSubmit={handleAddDomain} />
      <HostedZoneTable/>
    </div>
  )
}

export default Dashboard
