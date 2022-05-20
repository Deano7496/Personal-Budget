import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { InputLabel, TextField, InputAdornment, OutlinedInput } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function BasicModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState('')
    const [budget, setBudget] = useState('')
    const [tableData, setTableData] = useState([]);
  
    const createNewEnvelope = async (e) => {
        e.preventDefault();
        try {
            const body = {title, budget}
            const response = await fetch('http://localhost:5000/api', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            console.log(response)
            alert('New envelope created, refresh table')
            setTableData(response)
        } catch (error) {
            console.log(error)
        }
    }


    return (
      <div>
        <Button onClick={handleOpen}> 
        <AddIcon />
        Create New Envelope
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
              <form type='submit'>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                      Create New Envelope
                  </Typography>
            
            <hr/>
              <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={e => setTitle(e.target.value)} required/>
            <hr/>
              <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
              <OutlinedInput
              id="outlined-adornment-amount"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
              required
              />
            <hr/>
              <Button variant="contained" onClick={e => createNewEnvelope(e)} >Submit</Button>
            </form>
          </Box>
        </Modal>
      </div>
    );
  }