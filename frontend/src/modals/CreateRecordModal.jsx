import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material';

const CreateRecordModal = ({ open, handleClose, handleSubmit }) => {
  const [recordName, setRecordName] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [value, setValue] = useState('');
  const [ttl, setTtl] = useState(300);
  const [alias, setAlias] = useState(false);

  const recordTypes = [
    'A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT'
  ];

  const handleFormSubmit = () => {
    const recordData = {
      recordName,
      recordType,
      value,
      ttl,
      alias
    };
    handleSubmit(recordData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Record</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Record Name"
          type="text"
          fullWidth
          value={recordName}
          onChange={(e) => setRecordName(e.target.value)}
        />
        <TextField
          select
          label="Record Type"
          value={recordType}
          onChange={(e) => setRecordType(e.target.value)}
          fullWidth
          margin="dense"
        >
          {recordTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          control={<Switch checked={alias} onChange={(e) => setAlias(e.target.checked)} />}
          label="Alias"
        />
        <TextField
          margin="dense"
          label="Value"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <TextField
          margin="dense"
          label="TTL (seconds)"
          type="number"
          fullWidth
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          Create Record
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRecordModal;