import {Dispatch, SetStateAction, useState, useCallback} from "react";
import {Link} from "react-router-dom";
import {Navigate} from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";

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
        } else {
            const data = {
                user: username,
                pass: password
            }
            axios.post("./login.php", data)
            .then(function (response) {
                if (response.data['login'] == false) {
                    setError("Invalid Username or Password")
                    setColor(styles.errorC)
                } else {
                    sessionStorage.setItem("user", response.data['user'])
                    sessionStorage.setItem("token", "t")
                    setAuth(true)
                }
              })
              .catch(function (error) {
                console.log(error);
              });

        }


    }, [username, password, setAuth]);


    if (sessionStorage.getItem("token") == "t") {
        return <Navigate to="/"/>
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.formHolder}>
                <div className={styles.header}>Login to Fairway Finder!</div>
                <input type="text" className={styles.username} placeholder="Username" onChange={event => setUsername(event.target.value)}/>
                <input type="password" className={styles.password} placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                <div className={errorC}>{error_message}</div>
                <input className={styles.submit} type="submit" value="Login!" />
                <div className={styles.account}>Don't Have An Account?</div>
                <Link to={"/register"}className={styles.register}>Register Here!</Link>
            </form>
            
        </div>
    )
}