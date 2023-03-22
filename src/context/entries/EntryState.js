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

            setEntries(entries.concat(createdEntry))
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    const updateEntry = async (id, editEntry) => {
        try {
            const { name, phoneNumber, email, hobbies } = editEntry
            const response = await fetch(`${host}/api/updateentry`, {
                method: "PUT",
                headers: {
                    'mode': 'no-cors',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, ...editEntry})
            })

            const { success, message } = await response.json()

            if (!success) {
                throw new Error(message)
            }

            const newEntries = entries.map((entry) => {
                if (entry._id === id) {
                    return {...entry, name, phoneNumber, email, hobbies }
                }
                return entry
            })

            setEntries(newEntries)
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

            const { success, message } = await response.json()

            if (!success) {
                throw new Error(message)
            }

            const newEntries = entries.filter((entry) => { return entry._id !== id });
            setEntries(newEntries);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const sendMail = async (selectedIds) => {
        try {
            const response = await fetch(`${host}/api/sendmail`, {
                method: 'POST',
                headers: {
                    'mode': 'no-cors',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedIds)
            })

            const { success, message } = await response.json()

            if (!success) {
                throw new Error(message)
            }

            // @TODO Success Alert
            console.log(message)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    return (
        <EntryContext.Provider value={{ entries, getEntries, createEntry, updateEntry, deleteEntry, sendMail }}>
            {props.children}
        </EntryContext.Provider>
    )
}

export default EntryState