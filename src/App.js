import React, { useState } from "react";
// import './App.css';
import Authentication from './components/Authentication';
import Mainpage from "./components/Mainpage"

function App() {
  const [active, setActive] = useState(0)
  const [user, setUser] = useState(1)
  return (
    <div className="App">
      {
        active === 0 ? (<Authentication setActive={setActive} setUser={setUser} />) : (<Mainpage user={user} />)
      }


    </div>
  );
}

export default App;
