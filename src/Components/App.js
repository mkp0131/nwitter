import React, { useState, useEffect } from 'react';
import Router from "Components/Router";
import { authService } from "fbase";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [init, setInit] = useState(false);

	useEffect(() => {
		authService.onAuthStateChanged(user => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		}
		)
	})
  return (
    <>
			{init ? (
				<>
					<Router isLoggedIn={isLoggedIn}/>
					<footer>&copy; {new Date().getFullYear()} Nwitter</footer>
				</>
			) : (
				"Loading...."
			)}
    </>
  )
}

export default App;
