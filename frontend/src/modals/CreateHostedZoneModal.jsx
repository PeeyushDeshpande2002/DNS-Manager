import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const DomainModal = ({ open, handleClose, handleSubmit }) => {
  const [domainName, setDomainName] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ domainName, description });
    setDomain('');
    setDescription('');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Create Hosted Zone
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            label="Domain Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default DomainModal;
