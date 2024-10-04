import s from "./Login.module.css";
import {Post} from "../request/Request.js";
import {useState} from "react";
import * as Cookie from "../configure/Cookie.js";
import * as propsType from "prop-types";


function AuthRequest(name, password, setIsAuth){
    Post("api/login", {name: name, password : password}, (user) => {
        Cookie.setUser(JSON.stringify(user));
        setIsAuth(true);
        console.log("success auth")
    });
}

function Login({setIsAuth}){

    const [name, setName] = useState("Tester 1");
    const [password, setPassword] = useState("tester");

    return (

        <>
            <span>Вход</span>
            <form id={s["form"]} >
                <input type="text" name={"name"} value={name}  onChange={e => setName(e.target.value)}/>
                <input type="password" name={"password"} value={password}  onChange={e => setPassword(e.target.value)}/>
                <button type={"button"} onClick={() => AuthRequest(name, password, setIsAuth)}>Submit</button>
            </form>
        </>


    )
}

Login.propTypes = {
    setIsAuth : propsType.func
}

export default Login
