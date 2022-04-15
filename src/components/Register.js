
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react';
import { auth } from '../db'



const Register = () => {
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const registerUser = async (email, password) => {
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        setInputEmail('')
        setInputPassword('')
    };
    const handleRegisterClick = (e) => {
        e.preventDefault();
        registerUser(inputEmail, inputPassword)
    }
    return (
        <div>
            <p>Lub utwórz konto </p>
            <form onSubmit={handleRegisterClick}>
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
                <button type='submit'>Rejestruj</button>
            </form>
        </div>
    )
    };

    export default Register;