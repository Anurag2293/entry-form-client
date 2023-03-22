import { useState } from "react";
import EntryContext from "./entryContext";

const EntryState = (props) => {
    const host = 'http://localhost:5000'

    let initialEntries = []
    const [entries, setEntries] = useState(initialEntries)

    const getEntries = async () => {
        try {
            const response = await fetch(`${host}/api/getallentries`, {
                method: "GET",
                headers: {
                    'mode': 'no-cors',
                    'Content-Type': 'application/json'
                }
            })
    
            const entriesObject = await response.json()

            setEntries(entriesObject.entries)
        } catch (error) {
            throw new Error(error.message)
        }
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
                setEntries(createdEntry)
            } else {
                setEntries(entries.concat(createdEntry))
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    const updateEntry = async (id, editEntry) => {
        try {
            const response = await fetch(`${host}/api/updateentry`, {
                method: "PUT",
                headers: {
                    'mode': 'no-cors',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, ...editEntry})
            })

            const { success, message, updatedEntry} = await response.json()

            if (!success) {
                throw new Error(message)
            }

            getEntries()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const deleteEntry = async (id) => {
        try {
            const response = await fetch(`${host}/api/deleteentry`, {
                method: "DELETE",
                headers: {
                    'mode': 'no-cors',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            })

            const { success, message, deletedEntry} = await response.json()

            if (!success) {
                throw new Error(message)
            }

            getEntries()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    return (
        <EntryContext.Provider value={{ entries, getEntries, createEntry, updateEntry, deleteEntry }}>
            {props.children}
        </EntryContext.Provider>
    )
}

export default EntryState