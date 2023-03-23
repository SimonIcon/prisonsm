import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp'



const UserSignIn = ({ setActive, setUser }) => {
  const [currentform, setCurrentform] = useState("login");
  const toggleForm = (formName) => {
    setCurrentform(formName);
  }
  return (
    <div>
      {currentform === "login" ? <Login onFormSwitch={toggleForm} setActive={setActive} setUser={setUser} /> :
        <SignUp onFormSwitch={toggleForm} setUser={setUser} setActive={setActive} />}
    </div>
  )
}

export default UserSignIn