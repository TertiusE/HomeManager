import React from 'react'
import './login.css'
import { useState, useEffect } from 'react';
import { AiFillEye } from "react-icons/ai";
import { app } from '../config/firebase-config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginPage = () => {
    let [visible, setVisibility] = useState(false);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }
    }, [])

    const handleLogin = () => {
        const authentication = getAuth(app);
        if (email == "" && password == "") {
            toast.error('Email and password cannot be empty');
        } else if (email == "" && password !== "") {
            toast.error('Email cannot be empty');
        } else if (email !== "" && password == "") {
            toast.error('Password cannot be empty');
        } else {
            signInWithEmailAndPassword(authentication, email, password)
                .then((response) => {
                    navigate('/home', {state:{uid:response.user.uid}})
                    console.log(response.user)
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                    sessionStorage.setItem('User ID', response.user.uid)

                })
                .catch((error) => {
                    if (error.code === 'auth/wrong-password') {
                        toast.error('Please check the Password');
                    }
                    if (error.code === 'auth/user-not-found') {
                        toast.error('Please check the Email');
                    }
                });
        }
    }

    return (
        <div className="triangle-image center-inner">
            <div className="loginContainer">
                <form action="" method="post">
                    <ToastContainer />
                    <div className="loginTitle">
                        <h1 className="loginText">Login</h1>
                        <p className="textLight textMedium">Please sign in to continue</p>
                    </div>
                    <div className="loginEmail">
                        <label htmlFor="emailInput">Email</label><br />
                        <input type="email" name="emailInput" id="emailInput" placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="loginPassword">
                        <label htmlFor="passwordInput">Password</label><br />
                        <input type={visible ? "text" : "password"} name="passwordInput" id="passwordInput" onChange={(e) => setPassword(e.target.value)} /><br />
                        <AiFillEye className='passwordVisibility' onClick={() => { setVisibility(!visible) }} color='black' size={25} />
                        <a className='textLight' href="http://">Forgot Password?</a>
                    </div>
                    <div className="loginSignUp">
                        <button type='button' className='loginButton' onClick={handleLogin}>Login</button>
                        <div className="textCenter">
                            <p className="textSmall textLight">Don't have an account yet? <a className='accentTextColor' href="/register">Sign Up</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
