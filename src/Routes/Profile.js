import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "fbase";


function Profile() {
	let history = useHistory();

	const onLogOutClick = () => {
		authService.signOut();
		history.push('/');
	}

  return (
    <>
			<button onClick={onLogOutClick}>logout</button>
		</>
  );


}

export default Profile;
