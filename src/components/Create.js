import React, { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import EntryContext from '../context/entries/entryContext';

export default function Create() {
    const { createEntry } = useContext(EntryContext)

    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [hobbies, setHobbies] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newEntry = {
            name,
            phoneNumber,
            email,
            hobbies
        };

        try {
            createEntry(newEntry)

            setName("")
            setPhoneNumber("")
            setEmail("")
            setHobbies("")
        } catch (error) {
            // @TODO Add an alert
            console.log(error.message)
        }

        handleClose()        
    };

    return (
        <Box>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Entry
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Entry</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill in the details and click Add to create an entry
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
                                Create Entry
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
