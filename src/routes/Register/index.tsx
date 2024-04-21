import {Dispatch, SetStateAction, useState, useCallback} from "react";
import {Navigate, useAsyncValue} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
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


    const sendInfo = () => {
        const data = {
            user: username,
            pass: password,
            email: email,
            first_name: first_name
        }
        axios.post("./register.php", data)
        .then(function (response) {
            if (response.data['register'] == false) {
                setError(response.data['error'] + " Already In Use. Please Use a Different " + response.data['error'])
                setEColor(styles.errorC)
            } else {
                sessionStorage.setItem("user", response.data['user'])
                sessionStorage.setItem("token", "")
                setAuth(true)
            }
          })
          .catch(function (error) {
            console.log(error);
          });

    }
    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("")

        let usernameT = /^[a-zA-Z0-9._!]+$/.test(username) && username != ""
        let passwordT = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$/.test(password) && password != "" && password == confirmp
        let first_nameT = /^[a-zA-Z]+$/.test(first_name) && first_name != ""
        let emailT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) && email != ""

        if (username == "") {
            setError('Please Enter a Username')
            setEColor(styles.errorC)
        }
        if (/^[a-zA-Z0-9._!]+$/.test(username)) {
            setError('Invalid Character in Username')
            setEColor(styles.errorC)
        }
        if (password.length < 6) {
            setError('Password Must Have Minimum 6 Characters')
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
        if (!/[0-9]/.test(password)) {
            setError('Name Must Contain Only Letters')
            setEColor(styles.errorC)
        }


        if (usernameT && passwordT && emailT && first_nameT) {
            setError("")
            sendInfo()
        }


    }, [username, password, confirmp, email, first_name]);


    if (sessionStorage.getItem("token") == "t") {
        return <Navigate to="/"/>
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.formHolder}>
                <div className={styles.header}>Make An Account!</div>
                <input type="text" placeholder="Username" className={styles.username} onChange={event => setUsername(event.target.value)}/>
                <input type="password" placeholder="Password" className={styles.password} onChange={event => setPassword(event.target.value)}/>
                <input type="password" placeholder="Confirm Password" className={styles.password} onChange={event => setConfirm(event.target.value)}/>
                
                <input type="text" placeholder="Email" className={styles.username} onChange={event => setEmail(event.target.value)}/>
                <input type="text" placeholder="First Name" className={styles.username} onChange={event => setFirst(event.target.value)}/>
                <div className={eColor}>{error_message}</div>
                
                <input type="submit" className={styles.submit} value="Register!"/>
                <div className={styles.account}>Already Have an Account?</div>
                <Link to={"/login"}className={styles.login}>Login Here!</Link>
            </form>
            
        </div>
    )
}