import {Dispatch, SetStateAction, useState, useCallback} from "react";
import {Navigate} from "react-router-dom";
import {Link} from "react-router-dom";

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


    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let usernameT = /^[a-zA-Z0-9._!]+$/.test(username) && username != ""
        let passwordT = /^[a-zA-Z0-9!@#$%^&*]{6,25}$/.test(password) && password != "" && password == confirmp
        let first_nameT = /^[a-zA-Z]+$/.test(first_name) && first_name != ""
        let emailT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) && email != ""

        console.log(usernameT, passwordT, first_nameT, emailT)




        

    }, [username, password, confirmp, email]);

    return (
        <div>
            REGISTER
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)}/>
                <input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                <input type="password" placeholder="Confirm Password" onChange={event => setConfirm(event.target.value)}/>
                <input type="text" placeholder="Email" onChange={event => setEmail(event.target.value)}/>
                <input type="text" placeholder="First Name" onChange={event => setFirst(event.target.value)}/>
                <div>ERROR MESSAGE</div>
                <input type="submit" value="Register!" />
            </form>
            
        </div>
    )
}