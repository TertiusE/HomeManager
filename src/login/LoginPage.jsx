import React from 'react'
import './login.css'
import { useState } from 'react';
import { AiFillEye } from "react-icons/ai";

export const LoginPage = () => {
    let [visible, setVisibility] = useState(false);
    return (
        <div className="triangle-image center-inner">
            <div className="loginContainer">
                <form action="" method="post">
                    <div className="loginTitle">
                        <h1 className="loginText">Login</h1>
                        <p className="textLight textMedium">Please sign in to continue</p>
                    </div>
                    <div className="loginEmail">
                        <label htmlFor="emailInput">Email</label><br />
                        <input type="email" name="emailInput" id="emailInput" placeholder='example@gmail.com' />
                    </div>
                    <div className="loginPassword">
                        <label htmlFor="passwordInput">Password</label><br />
                        <input type={visible ? "text":"password"} name="passwordInput" id="passwordInput" /><br />
                        <AiFillEye className='passwordVisibility' onClick={() => {setVisibility(!visible)}} color='black' size={25}/>
                    
                        <a className='textLight' href="http://">Forgot Password?</a>
                    </div>
                    <div className="loginSignUp">
                        <button className='accentColor' type="submit">Login</button>
                        <div className="textCenter">
                            <p className="textSmall textLight">Don't have an account yet? <a className='accentTextColor' href="/register">Sign Up</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
