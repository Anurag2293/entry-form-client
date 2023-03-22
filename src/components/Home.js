import React, { useState, useContext, useEffect } from 'react';

import Button from '@mui/material/Button';

import EntryContext from '../context/entries/entryContext';

import Create from './Create'
import Read from './Read';
import Update from './Update';

export default function Main() {
    const { getEntries, updateEntry, sendMail } = useContext(EntryContext)

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
            // @TODO Alert
            console.log(error.message)
        }
    }, [])

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

    return (
        <>
            <Create />
            
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

            <Button variant='contained' sx={{marginY: '1rem'}} onClick={() => sendMail(selectedIds)}>
                Send Selected row to info@redpositive.in
            </Button>
            <Read openUpdateModal={openUpdateModal} handleSelectCheck={handleSelectCheck} />
        </>
    );
}
