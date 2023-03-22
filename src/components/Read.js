import React, { useContext } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 
import Checkbox from '@mui/material/Checkbox';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import EntryContext from '../context/entries/entryContext';

const Read = (props) => {
    const { entries, deleteEntry } = useContext(EntryContext)

    return (
        <>
            <TableContainer component={Paper} sx={{width: '100%'}}>
                <Table sx={{ width: '100%'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Select</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Phone Number</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Hobbies</TableCell>
                            <TableCell align="center">Update</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(entries.length !== 0) && entries.map((entry, index) => (
                            <TableRow
                                key={index+1}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <Checkbox 
                                        value={entry._id} 
                                        name={entry.name}
                                        inputProps={{ 
                                            'aria-label': 'controlled',
                                            email: entry.email,
                                            phonenumber: entry.phoneNumber,
                                            hobbies: entry.hobbies
                                        }}
                                        onChange={props.handleSelectCheck}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">{index+1}</TableCell>
                                <TableCell align="center">{entry.name}</TableCell>
                                <TableCell align="center">{entry.phoneNumber}</TableCell>
                                <TableCell align="center">{entry.email}</TableCell>
                                <TableCell align="center">{entry.hobbies}</TableCell>
                                <TableCell align="center"><EditIcon onClick={() => {props.openUpdateModal(entry)}}/></TableCell>
                                <TableCell align="center"><DeleteIcon onClick={() => {deleteEntry(entry._id)}}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Read