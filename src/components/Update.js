import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';

const Update = (props) => {
    const { open, handleClose, handleSubmit, name, phoneNumber, email, hobbies, setName, setPhoneNumber, setEmail, setHobbies } = props

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Entry</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit your entry here
                    </DialogContentText>
                    <form onSubmit={handleSubmit} className="form-container">
                        <Stack>

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
                            <Button className="form-button" type="submit" variant="contained" color="primary" sx={{ paddingX: '5rem', paddingY: '0.5rem', fontSize:'1rem'}}>
                                UPDATE
                            </Button>
                        </Box>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Update