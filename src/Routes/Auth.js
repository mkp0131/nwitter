import { useState } from "react";
import { authService } from "fbase";
console.log('authService', authService);

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
	const [newAccount, setNewAccount] = useState('');

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
		}

	}
	
  return (
		<>
			<form onSubmit={onSubmit}>
				<input onChange={setValue} value={email} type="text" name="email" required placeholder="Email" />
				<input onChange={setValue} value={password} type="password" name="password" required placeholder="Password" />
				<input type="submit" value={newAccount ? 'Create Account' : 'Login'} />
			</form>
			<div>
				<button>Google</button>
				<button>Github</button>
			</div>
		</>
  );
}

export default Auth;
