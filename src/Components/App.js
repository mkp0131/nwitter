import React, { useState } from 'react';
import Router from "Components/Router";
import { authService } from "fbase";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <>
      <Router isLoggedIn={isLoggedIn}/>
			<footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App;
