import { authService, firebaseInstance } from 'fbase';
import { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');
    

    const onChange = (event) => {
        const {
            target : {name, value},
        } = event;

        if(name === "email") {
            setEmail(value);
        }else if(name === 'password') {
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                // create newAccount
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else{
                // Log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }catch(error){
            setError(error.message);
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick =  async (event) => {
        console.log(event.target.name);
        const {
            target : {name},
        } = event;
        let provider;
        if(name === 'google'){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === 'github'){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="email" 
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">Continue With google</button>
                <button onClick={onSocialClick} name="github">Continue With Github</button>
            </div>
        </div>
    )
}

export default Auth;