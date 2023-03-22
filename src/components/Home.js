import { useEffect, useContext } from 'react'

import Box from '@mui/material/Box'

import Create from './Create'
import Read from './Read'
import EntryContext from '../context/entries/entryContext'

const Home = () => {
    const { entries, getEntries } = useContext(EntryContext)

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

    return (
        <Box>
            <Create />
            <Box>
                <Read entries={entries} />
            </Box>
        </Box>
    )
}

export default Home