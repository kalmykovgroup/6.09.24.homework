import {useEffect, useState} from "react";
import s from "./Profile.module.css";
import * as propsType from "prop-types";
import {deleteUser, getUser} from "../configure/Cookie.js";
import {Get} from "../request/Request.js";


function update(){

}
function Profile ({setIsAuth}){

    const [profiles, setProfiles] = useState([]);
    const [user, setUser] = useState(getUser())

    useEffect(() => {
        Get('api/users', "", (data) => {
            console.log(data);
        })
    }, [ ]);


    return(
        <>
            <div className={s.app}>

                <div className={s.myProfile}>
                    <h2>My profile: </h2>
                    <button onClick={() => {
                        deleteUser();
                        setIsAuth(false)
                    }}>Выйти
                    </button>

                    <div className={s.balance}>
                        <span>My balance: {user.balance}</span>
                        <button onClick={() => {
                            update()
                        }}>update
                        </button>
                    </div>

                    <div>Сделать перевод</div>

                    <form action="/">
                        <label htmlFor={s["recipient"]}>Кому: </label>
                        <select name="recipient" id={s["recipient"]}>
                            <option value="1">1</option>
                            <option value="2">3</option>
                        </select>
                        <label htmlFor={s["sum"]}>Сумма: </label>
                        <input type="number" id={s["sum"]} name="sum"/>

                        <button type="submit">Отправить</button>
                    </form>
                </div>
                <div className={s.profiles}>
                <h2>Profiles: </h2>
                    <div className={s.content}>
                        {profiles.map(profile =>
                            <>
                                <div className={s.profile}>

                                    <span>Id:</span>
                                    <span>{profile.id}</span>
                                    <span>Name:</span>
                                    <span>{profile.name}</span>
                                    <span>Balance:</span>
                                    <span>{profile.balance}</span>

                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

Profile.PropsType = {
    user: propsType.object,
    setIsAuth: propsType.func
}

export default Profile;