import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

function createData(name, type, records, HostZoneID, Comment) {
  return { name, type, records, HostZoneID, Comment };
}


export default function HostedZoneTable({ data }) {
    const extractZoneId = (id) => {
      const parts = id.split('/');
      return parts[2];
    };
    const navigate = useNavigate()
    const handleClick = (row) =>{
      //console.log(row);
      const hostedZoneId = extractZoneId(row.Id);
      navigate( `/dashboard/${hostedZoneId}`, { state: { hostedZone: row }} )
    }
  return ( 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {/* <TableCell align="right">Type</TableCell> */}
            <TableCell align="right">Records</TableCell>
            <TableCell align="right">Comment</TableCell>
            <TableCell align="right">Hosted Zone Id</TableCell>
            <TableCell align="right">Click to Open</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              
              <TableCell align="right">{row.ResourceRecordSetCount}</TableCell>
              <TableCell align="right">{row.Config.Comment}</TableCell>
              <TableCell align="right">{row.Id}</TableCell>
              <TableCell align="right"><Button onClick={()=>handleClick(row)}>Open</Button></TableCell>   
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
