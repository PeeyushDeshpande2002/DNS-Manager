import React, { useEffect, useState } from 'react'
import DNSRecordTable from '../components/DNSRecordTable.jsx'
import { Box, Button } from '@mui/material'
import CreateRecordModal from '../modals/CreateRecordModal.jsx'
import { useLocation, useParams } from 'react-router-dom'
import { HostedZoneDetails } from '../components/HostedZoneDetails.jsx'

const DnsRecordDashboard = () => {
  const location = useLocation();
  const { hostedZone } = location.state;
  // console.log(location.state);
  const [modalOpen, setModalOpen] = useState(false);
  const {hostedZoneId} = useParams();
  console.log(hostedZoneId);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getDomains = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/domains/allDomains', {
            method : 'GET'
        })
        if(response.ok){
            const data = await response.json();
        }
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
    getDomains();
  }, [])
  const handleCreateRecord = async(recordData) => {
   try {
    const response = await fetch(`http://localhost:5000/api/dns/hostedzone/${hostedZoneId}/createDns`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(recordData)
    })
    if(response.ok){
      const data = response.json();
      console.log(data);
    }
   } catch (error) {
    console.log(error);
   }
    // console.log('Record Data:', recordData);
  };
  return (
    <div>
      <Box>
      <HostedZoneDetails hostedZone={hostedZone}/>
      <DNSRecordTable/>
        <Button sx={{marginTop : '25px', marginBottom : '25px'}} variant="contained" color="primary" onClick={handleOpenModal}>
        Create Record
      </Button>
      <CreateRecordModal
        open={modalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleCreateRecord}
      />
     
      </Box>
    </div>
  )
}

export default DnsRecordDashboard