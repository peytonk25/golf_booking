import {Dispatch, SetStateAction, useState, useCallback} from "react";
import {Link} from "react-router-dom";
import {Navigate} from "react-router-dom";
import styles from "./styles.module.css";

type parsedAuth = {
    userID: string,
    token: string,
}

export default function Landing({setAuth}: { setAuth: Dispatch<SetStateAction<boolean>> }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error_message, setError] = useState("")
    const [errorC, setColor] = useState(styles['errorC'])


    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("")
        if (username.trim() == "" || password.trim() == "") {
            setError("Invalid Username or Password")
        }

    }, [username, password]);

    return (
        <div>
            Landing
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)}/>
                <input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                <div className={errorC}>{error_message}</div>
                <input type="submit" value="Login!" />
            </form>
            
        </div>
    )
}