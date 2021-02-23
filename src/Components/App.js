import React, { useEffect, useState } from 'react';
import Router from "Components/Router";
import { authService } from "fbase";

const App = () => {
  const [init, setInit]  = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObj, setUserObj] = useState(null);

  useEffect(() => {
      authService.onAuthStateChanged((user) => {
        if(user) {
          setIsLoggedIn(true);
					setUserObj(user);
        } else {
          setIsLoggedIn(false);
        }
        setInit(true);
      })
    }, [])

  return (
    <>
      {init ? <Router isLoggedIn={isLoggedIn} userObj={userObj}/> : 'loading....'}
			<footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App;
