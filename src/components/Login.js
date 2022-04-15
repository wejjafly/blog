import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import {auth} from "../db"


const Login = () => {
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const loginUser = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                setInputEmail('')
                setInputPassword('')
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(inputEmail, inputPassword)
    }
    return (
        <div>
            <p>Zaloguj się do swojego konta</p>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name="name"
                    placeholder='podaj email'
                    value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                <input
                    type='password'
                    placeholder='podaj hasło'
                    name="password"
                    autoComplete="on"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)} />
                <button type='submit'>Zaloguj</button>
            </form>
        </div>
    )
}

export default Login;