import { useState } from "react";

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

	const [email, password, setValue] = useInput()

  return (
		<>
			<form>
				<input onChange={setValue} value={email} type="text" name="email" required placeholder="Email" />
				<input onChange={setValue} value={password} type="password" name="password" required placeholder="Password" />
				<input type="submit" value="Login" />
			</form>
			<div>
				<button>Google</button>
				<button>Github</button>
			</div>
		</>
  );
}

export default Auth;
