import {authService} from "fbase";
import {useHistory} from "react-router-dom";

function Profile() {
  const history = useHistory();

  const onLogOutClick = async () => {
    try {
      await authService.signOut();
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button onClick={onLogOutClick}>logout</button>
    </>
  );


}

export default Profile;
