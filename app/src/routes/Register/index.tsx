import {Dispatch, SetStateAction, useState, useCallback} from "react";
import {Navigate, useAsyncValue} from "react-router-dom";
import {Link} from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import PasswordStrengthBar from "react-password-strength-bar";
import styles from "./styles.module.css"

type parsedAuth = {
    userID: string,
    token: string,
}
export default function Register({setAuth}: { setAuth: Dispatch<SetStateAction<boolean>> }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmp, setConfirm] = useState("")
    const [email, setEmail] = useState("")
    const [first_name, setFirst] = useState("")
    const [error_message, setError] = useState("")
    const [eColor, setEColor] = useState(styles['errorC'])
    const [allow, setAllow] = useState(false)


    const sendInfo = async () => {

        console.log("WOOP")

    }
    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("")

        let usernameT = /^[a-zA-Z0-9._!]+$/.test(username) && username != ""
        let passwordT = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$/.test(password) && password != "" && password == confirmp
        let first_nameT = /^[a-zA-Z]+$/.test(first_name) && first_name != ""
        let emailT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) && email != ""

        if (!usernameT) {
            setError('Invalid Username')
            setEColor(styles.errorC)
        }
        if (password.length < 6) {
            setError('Password must have minimum 6 characters')
            setEColor(styles.errorC)
        }
        if (!/[A-Z]/.test(password)) {
            setError('Password must include at least 1 uppercase character')
            setEColor(styles.errorC)
        }
        if (!/[a-z]/.test(password)) {
            setError('Password must include at least 1 lowercase character')
            setEColor(styles.errorC)
        }
        if (!/[0-9]/.test(password)) {
            setError('Password must include at least 1 number')
            setEColor(styles.errorC)
        }
        if (!/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/.test(password)) {
            setError('Password must contain 1 special character')
            setEColor(styles.errorC)
        }
        if (password != confirmp) {
            setError('Passwords do not match')
            setEColor(styles.errorC)
        }
        if (!emailT) {
            setError('Invalid Email')
            setEColor(styles.errorC)
        }
        if (!first_name) {
            setError('Please Enter your Name')
            setEColor(styles.errorC)
        }

        if (usernameT && passwordT && emailT && first_nameT) {
            setError("")
            sendInfo()
        }

        console.log(username, password, confirmp, email, first_name)

    }, [username, password, confirmp, email, first_name]);

    return (
        <div>
            REGISTER
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)}/>
                <input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                <input type="password" placeholder="Confirm Password" onChange={event => setConfirm(event.target.value)}/>
                
                <input type="text" placeholder="Email" onChange={event => setEmail(event.target.value)}/>
                <input type="text" placeholder="First Name" onChange={event => setFirst(event.target.value)}/>
                <div className={eColor}>{error_message}</div>
                
                <input type="submit" value="Register!"/> 
            </form>
            
        </div>
    )
}