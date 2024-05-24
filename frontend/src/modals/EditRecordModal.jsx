import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Switch, FormControlLabel } from '@mui/material';

const EditRecordModal = ({ open, handleClose, handleSubmit, record }) => {
  const [recordName, setRecordName] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [values, setValues] = useState('');
  const [ttl, setTtl] = useState(300);
  const [alias, setAlias] = useState(false);

  useEffect(() => {
    if (record) {
      setRecordName(record.recordName);
      setRecordType(record.recordType);
      setValues(record.values);
      setTtl(record.ttl);
      setAlias(record.alias || false);
    }
  }, [record]);

  const handleFormSubmit = () => {
    const recordData = {
      recordName,
      recordType,
    values,
      ttl,
      alias,
    };
    handleSubmit(recordData);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Record</DialogTitle>
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
          margin="dense"
          label="Record Type"
          fullWidth
          value={recordType}
          onChange={(e) => setRecordType(e.target.value)}
        >
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="CNAME">CNAME</MenuItem>
          <MenuItem value="TXT">TXT</MenuItem>
          <MenuItem value="MX">MX</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          label="Value"
          type="text"
          fullWidth
          value={values}
          onChange={(e) => setValues(e.target.value)}
        />
        <TextField
          margin="dense"
          label="TTL (seconds)"
          type="number"
          fullWidth
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
        />
        <FormControlLabel
          control={
            <Switch
              checked={alias}
              onChange={(e) => setAlias(e.target.checked)}
            />
          }
          label="Alias"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRecordModal;
