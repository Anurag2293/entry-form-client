import React, { useState, useContext, useEffect } from 'react';

import Button from '@mui/material/Button';

import EntryContext from '../context/entries/entryContext';
import AlertContext from '../context/alerts/alertContext';

import Create from './Create'
import Read from './Read';
import Update from './Update';
import { Box, Stack, Typography } from '@mui/material';

export default function Home() {
    const { getEntries, updateEntry, sendMail } = useContext(EntryContext)
    const { setAlertState } = useContext(AlertContext)

    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [id, setId] = useState("")

    const [selectedIds, setSelectedIds] = useState([])

    useEffect(() => {
        try {
            const fillEntries = async () => {
                await getEntries()
            }
            fillEntries()
        } catch (error) {
            
        }
    }, [getEntries])

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
            setAlertState({
                openAlert: true,
                severity: "success",
                alertText: "Updated Successfully"
            })
        } catch (error) {
            setAlertState({
                openAlert: true,
                severity: "error",
                alertText: error.message
            })
        }

        handleClose()        
    };

    const handleSelectCheck = (event) => {
        const _id = event.target.value

        const newSelectedIds = selectedIds.filter((id) => { return id !== _id})
        setSelectedIds(newSelectedIds)

        if (event.target.checked) {
            let newIds = selectedIds
            newIds.push(_id)
            setSelectedIds(newIds)
        }
    }

    const handleSendMail = () => {
        try {
            sendMail(selectedIds)
            setAlertState({
                openAlert: true,
                severity: "success",
                alertText: "Email sent successfully!"
            })
        } catch (error) {
            setAlertState({
                openAlert: true,
                severity: "error",
                alertText: error.message
            })
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5rem'
            }}
        >
            <Stack spacing={2}>
                <Box>
                    <Create />
                </Box>

                <hr />
                
                <Update 
                    open={open}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                    name={name}
                    phoneNumber={phoneNumber}
                    email={email}
                    hobbies={hobbies}

                    setName={setName}
                    setEmail={setEmail}
                    setPhoneNumber={setPhoneNumber}
                    setHobbies={setHobbies}
                />

                <Box>
                    <Typography sx={{ fontSize: '1rem'}}>
                        Check to send the selected row/rows to  
                        <a href="mailto:info@redpositive.in" style={{ marginLeft: '6px'}}>info@redpositive.in</a>
                        <Button 
                            variant='contained' 
                            sx={{marginY: '1rem', marginLeft: '15rem'}} 
                            onClick={handleSendMail}
                            disabled={selectedIds.length === 0}
                        >
                        Send
                        </Button>
                    </Typography>
                </Box>
                
                <Box>
                    <Read openUpdateModal={openUpdateModal} handleSelectCheck={handleSelectCheck} />
                </Box>
            </Stack>
        </Box>
    );
}
