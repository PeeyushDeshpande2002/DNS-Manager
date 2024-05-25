import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import EditRecordModal from '../modals/EditRecordModal';
import {useAuth} from '../store/auth.jsx'
import { toast } from 'react-toastify';

export default function DNSRecordTable(props) {
    
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const { hostedZoneId } = useParams();
    const {AuthorizationToken} = useAuth()
    const handleOpenEditModal = (record) => {
      setCurrentRecord(record);
      setEditModalOpen(true);
    };
  
    const handleCloseEditModal = () => {
      setEditModalOpen(false);
      setCurrentRecord(null);
    };
    const handleEditRecord = async (recordData) => {
      try {
       const response =  await fetch(`https://dns-manager-g5md.onrender.com/api/dns/hostedzone/${hostedZoneId}/update`, {
          method: 'PUT',
          headers: {
            Authorization : AuthorizationToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            oldRecord: currentRecord,
            newRecord: recordData,
          }),
        });
        if(response.ok){
            props.getDNSRecords()
          toast.success('Updated the record successfully')
        }
      } catch (error) {
       // console.error('Error editing record:', error);
        toast.error(error.message)
      }
      handleCloseEditModal();
    };
    const handleDeleteRecord = async(record) => {
      try {
        const response = await fetch(`https://dns-manager-g5md.onrender.com/api/dns/hostedzone/${hostedZoneId}/delete`,{
          method : 'DELETE',
          headers : {
            Authorization : AuthorizationToken,
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify(record)
        });
        props.getDNSRecords();
        toast.success("Deleted record successfully")
      } catch (error) {
        //console.log(error);
        toast.error(error.message)
      }
    }
  return ( 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {/* <TableCell align="right">Type</TableCell> */}
            <TableCell align="right">Type</TableCell>
            <TableCell align="center">Value</TableCell>
            <TableCell align="center">TTL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data && props.data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              
              <TableCell align="right">{row.Type}</TableCell>
              <TableCell align='center'>
                  {row.ResourceRecords.map((res, idx) => (
                    <div key={idx}>{res.Value}</div>
                  ))}
                </TableCell>
                <TableCell align="right">{row.TTL}</TableCell>
              <TableCell align="right"><Button onClick={() => handleOpenEditModal(row)}>Update</Button></TableCell>
              <TableCell align="right"><Button onClick={()=>handleDeleteRecord(row)}>Delete</Button></TableCell>    
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditRecordModal open={editModalOpen} handleClose={handleCloseEditModal} handleSubmit={handleEditRecord} record={currentRecord} />
    </TableContainer>

  );
}

