import { useState } from "react";
import EntryContext from "./entryContext";

const EntryState = (props) => {
    const host = 'http://localhost:5000'

    const initialEntries = []
    const [entries, setEntries] = useState(initialEntries)
    const [gridEntries, setGridEntries] = useState()

    const getEntries = async () => {
        const response = await fetch(`${host}/api/getallentries`, {
            method: "GET",
            headers: {
                'mode': 'no-cors',
                'Content-Type': 'application/json'
            }
        })

        const entriesObject = await response.json()

        setEntries(entriesObject.results)
    }

    const createEntry = async (entry) => {
        try {
            const response = await fetch(`${host}/api/createentry`, {
                method: "POST",
                headers: {
                    'mode': 'no-cors',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entry)
            })

            const { success, message, createdEntry } = await response.json()

            if (!success) {
                throw new Error(message)
            }

            if (entries.length === 0) {
                setEntries(createEntry)
            } else {
                setEntries(entries.concat(createdEntry))        
            }
            
        } catch (error) {
            throw new Error(error.message)
        }
    }

    return (
        <EntryContext.Provider value={{ entries, getEntries, createEntry }}>
            {props.children}
        </EntryContext.Provider>
    )
}

export default EntryState