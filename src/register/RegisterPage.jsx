import React from 'react'
import './register.css'
import { useState, useEffect } from 'react'
import { app } from '../config/firebase-config';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDatabase, ref, set } from "firebase/database";

export const RegisterPage = () => {
    let [fName, setFName] = useState("");
    let [lName, setLName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirm, setConfirm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }
    }, [])

    const handleRegister = () => {
        const authentication = getAuth(app);
        if (password != confirm) {
            toast.error('Passwords do not match');
        } else {
            createUserWithEmailAndPassword(authentication, email, password)
                .then((response) => {
                    navigate('/home', {state:{uid:response.user.uid}})
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                    sessionStorage.setItem('User ID', response.user.uid)
                    const db = getDatabase();
                    set(ref(db, 'users/' + response.user.uid), {
                        devices: ""
                    });
                }).catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        toast.error('Email Already in Use');
                    }
                    console.log(error)
                });
        }
    }

    return (
        <div className="triangle-image center-inner">
            <div className="registerContainer">
                <form action="" method="post">
                    <ToastContainer />
                    <div className="registerTitle">
                        <h1 className="registerText">Register</h1>
                        <p className="textLight textMedium">Please register to continue</p>
                    </div>
                    <div className="registerEmail">
                        <label htmlFor="fNameInput">First Name</label><br />
                        <input type='text' name="fNameInput" id="fNameInput" placeholder='John' onChange={(e) => setFName(e.target.value)} />
                    </div>
                    <div className="registerEmail">
                        <label htmlFor="lNameInput">Last Name</label><br />
                        <input type='text' name="lNameInput" id="lNameInput" placeholder='Doe' onChange={(e) => setLName(e.target.value)} />
                    </div>
                    <div className="registerEmail">
                        <label htmlFor="emailInput">Email</label><br />
                        <input type="email" name="emailInput" id="emailInput" placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="registerPassword">
                        <label htmlFor="passwordInput">Password</label><br />
                        <input type="password" name="passwordInput" id="passwordInput" onChange={(e) => setPassword(e.target.value)} /><br />
                    </div>
                    <div className="registerPassword">
                        <label htmlFor="passwordInput">Confirm Password</label><br />
                        <input type="password" name="confirmInput" id="confirmInput" onChange={(e) => setConfirm(e.target.value)} /><br />
                    </div>
                    <div className="registerSignUp">
                        <button className='registerButton' type='button' onClick={handleRegister}>Register</button>
                        <div className="textCenter">
                            <p className="textSmall textLight">Already have an account? <a className='accentTextColor' href="/login">Login</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
