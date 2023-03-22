import { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {
    const [alertState, setAlertState] = useState({
        openAlert: false,
        severity: "success",
        alertText: "This is the default Alert!"
    })
    // const [openAlert, setAlertOpen] = useState(false);
    // const [severity, setSeverity] = useState("success")
    // const [alertText, setAlertText] = useState("This is the default Alert!")

    return (
        <AlertContext.Provider value={{ alertState, setAlertState }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState