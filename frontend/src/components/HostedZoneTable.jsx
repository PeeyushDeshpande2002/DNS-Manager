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

function createData(name, type, records, HostZoneID, Comment) {
  return { name, type, records, HostZoneID, Comment };
}


export default function HostedZoneTable() {

    const [rows, setRows] = React.useState();
    const {AuthorizationToken} = useAuth();
    const extractZoneId = (id) => {
      const parts = id.split('/');
      return parts[2];
    };
    const navigate = useNavigate()
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
                setRows(data)
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
      }
      React.useEffect(()=>{
        getDomains();
    }, []);
    const handleClick = (row) =>{
      console.log(row);
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
          {rows && rows.map((row) => (
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
