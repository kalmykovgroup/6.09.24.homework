import {useEffect, useState} from 'react'

import s from './App.module.css'
import Profile from "./profile/Profile.jsx";
import {getUser} from "./configure/Cookie.js";
import Login from "./login/Login.jsx";






function App() {

   const [isAuth, setIsAuth] = useState(getUser() !== undefined)


  return (

      <>
          <h2>CSRF</h2>

          {isAuth && <Profile setIsAuth={setIsAuth}/>}

          {!isAuth && <Login setIsAuth={setIsAuth}/>}

      </>

  )
}

export default App
