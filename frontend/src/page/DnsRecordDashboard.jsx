import React, { useEffect, useState } from 'react'
import DNSRecordTable from '../components/DNSRecordTable.jsx'
import { Box, Button } from '@mui/material'
import CreateRecordModal from '../modals/CreateRecordModal.jsx'
import { useLocation, useParams } from 'react-router-dom'
import { HostedZoneDetails } from '../components/HostedZoneDetails.jsx'
import { useAuth } from '../store/auth.jsx'
import { toast } from 'react-toastify'

const DnsRecordDashboard = () => {
  const location = useLocation();
  const { hostedZone } = location.state;
  const {AuthorizationToken} = useAuth();
  // console.log(location.state);
  const [modalOpen, setModalOpen] = useState(false);
  const {hostedZoneId} = useParams();
  //console.log(hostedZoneId);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getDomains = async () => {
    try {
        const response = await fetch('https://dns-manager-g5md.onrender.com/api/domains/allDomains', {
            method : 'GET',
            headers : {
              Authorization : AuthorizationToken,
            }
        })
        if(response.ok){
            const data = await response.json();
        }
    } catch (error) {
        //console.log(error);
        toast.error(error)
    }
  }
  useEffect(()=>{
    getDomains();
  }, [])
  const handleCreateRecord = async(recordData) => {
   try {
    const response = await fetch(`https://dns-manager-g5md.onrender.com/api/dns/hostedzone/${hostedZoneId}/createDns`, {
      method : 'POST',
      headers : {
        Authorization : AuthorizationToken,
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(recordData)
    })
    if(response.ok){
      const data = response.json();
      //console.log(data);
      toast.success('Created record successfully')
    }
   } catch (error) {
    //console.log(error);
    toast.error('Error while creating record')
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
