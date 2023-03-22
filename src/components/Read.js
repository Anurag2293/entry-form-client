import React, { useState, useContext } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import EntryContext from '../context/entries/entryContext';

export default function Read(props) {
    const { updateEntry, deleteEntry } = useContext(EntryContext)

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [id, setId] = useState("")

    const openUpdateModal = (entry) => {
        setOpen(true);

        setName(entry.name)
        setPhoneNumber(entry.phoneNumber)
        setEmail(entry.email)
        setHobbies(entry.hobbies)
        setId(entry._id)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const editEntry = {
            name,
            phoneNumber,
            email,
            hobbies
        };

        try {
            updateEntry(id, editEntry)
        } catch (error) {
            // @TODO Add an alert
            console.log(error.message)
        }

        handleClose()        
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Entry</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit your entry here
                    </DialogContentText>
                    <form onSubmit={handleSubmit} className="form-container">
                        <Box className="form-item">
                            <TextField
                                className="form-item"
                                label="Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </Box>

                        <Box className="form-item">
                            <TextField
                                className="form-item"
                                label="Phone Number"
                                value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                                required
                            />
                        </Box>

                        <Box className="form-item">
                            <TextField
                                className="form-item"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </Box>

                        <Box className="form-item">
                            <TextField
                                className="form-item"
                                label="Hobbies"
                                value={hobbies}
                                onChange={(event) => setHobbies(event.target.value)}
                            />
                        </Box>
                        <Box className="form-item">
                            <Button className="form-button" type="submit" variant="contained" color="primary">
                                UPDATE
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
            <TableContainer component={Paper} sx={{width: '50%'}}>
                <Table sx={{ width: '100%'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Hobbies</TableCell>
                            <TableCell align="right">Update</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(props.entries.length !== 0) && props.entries.map((entry, index) => (
                            <TableRow
                                key={index+1}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{index+1}</TableCell>
                                <TableCell align="right">{entry.name}</TableCell>
                                <TableCell align="right">{entry.phoneNumber}</TableCell>
                                <TableCell align="right">{entry.email}</TableCell>
                                <TableCell align="right">{entry.hobbies}</TableCell>
                                <TableCell align="right"><EditIcon onClick={() => {openUpdateModal(entry)}}/></TableCell>
                                <TableCell align="right"><DeleteIcon onClick={() => {deleteEntry(entry._id)}}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
