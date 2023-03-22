import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

import AlertContext from '../context/alerts/alertContext';

export default function Alerts() {
    const { alertState, setAlertState } = useContext(AlertContext)

    return (
        <Box sx={{ width: '50%', marginY: '1rem', marginX: 'auto' }}>
            <Collapse in={alertState.openAlert}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlertState((prev) => ({...prev, openAlert: false }))
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    severity={alertState.severity}
                >
                    {alertState.alertText}
                </Alert>
            </Collapse>
        </Box>
    );
}