import {Dispatch, SetStateAction, useState, useCallback} from "react";
import {Link} from "react-router-dom";
import {Navigate} from "react-router-dom";

type parsedAuth = {
    userID: string,
    token: string,
}

export default function Landing({setAuth}: { setAuth: Dispatch<SetStateAction<boolean>> }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    }, [username, password]);

    return (
        <div>
            Landing
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)}/>
                <input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                <div>ERROR MESSAGE</div>
                <input type="submit" value="Login!" />
            </form>
            
        </div>
    )
}