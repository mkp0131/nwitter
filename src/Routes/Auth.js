import { useEffect, useState } from "react";
import { firebaseInstance, authService } from "fbase";


const useInput = () => {
	const [email, setEmail] = useState(''); 
	const [password, setPassword] = useState(''); 

	const setValue = (e) => {
		const {
			target: {
				name, value
			}
		} = e;
		if(name === 'email') {
			setEmail(value);
		}
		else if (name === 'password') {
			setPassword(value);
		}
	}

	return [email, password, setValue];
}



const Auth = ()  => {

	const [email, password, setValue] = useInput();
	const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			if(newAccount) {
				await authService.createUserWithEmailAndPassword(email, password);
			}
			else {
				await authService.signInWithEmailAndPassword(email, password);
			}
		} catch (error) {
			console.log('Auth error: ', error);
      setError(error.message);
		}
	}
	
	const toggleAccount = () => {
		setNewAccount(prev => !prev);
	}

	const socialLogin = async (e) => {
		const {target: {name}} = e;
		let provider;
		try {
			if(name === 'google') {
				provider = new firebaseInstance.auth.GoogleAuthProvider();
				firebaseInstance.auth().languageCode = 'ko';
			}
			else if (name === 'gh') {
				provider = new firebaseInstance.auth.GithubAuthProvider();
			}
		} catch (error) {
			console.log(error);
		}
		const data = await firebaseInstance.auth().signInWithPopup(provider);
	}

  return (
		<>
			<form onSubmit={onSubmit}>
				<input onChange={setValue} value={email} type="text" name="email" required placeholder="Email" />
				<input onChange={setValue} value={password} type="password" name="password" required placeholder="Password" />
				<input type="submit" value={newAccount ? 'Create Account' : 'Login'} />
				{error}
			</form>
			<div>
				<button onClick={toggleAccount}>{newAccount ? 'Login' : 'Join'}</button>
			</div>
			<div>
				<button onClick={socialLogin} name="google">Google</button>
				<button onClick={socialLogin} name="gh">Github</button>
			</div>
		</>
  );
}

export default Auth;
