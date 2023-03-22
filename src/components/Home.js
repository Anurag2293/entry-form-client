import { useEffect, useContext } from 'react'

import Box from '@mui/material/Box'

import Create from './Create'
import Read from './Read'
import EntryContext from '../context/entries/entryContext'

const Home = () => {
    const { entries, getEntries } = useContext(EntryContext)

    useEffect(() => {
        const fillEntries = async () => {
            await getEntries()
        }

        fillEntries()
        console.log('Use Effect is called')
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