import React from 'react'
import './register.css'
import { useState } from 'react'

export const RegisterPage = () => {
    return (
        <div className="triangle-image center-inner">
            <div className="registerContainer">
                <form action="" method="post">
                    <div className="registerTitle">
                        <h1 className="registerText">Register</h1>
                        <p className="textLight textMedium">Please register to continue</p>
                    </div>
                    <div className="registerEmail">
                        <label htmlFor="fNameInput">First Name</label><br />
                        <input type='text' name="fNameInput" id="fNameInput" placeholder='John' />
                    </div>
                    <div className="registerEmail">
                        <label htmlFor="lNameInput">Last Name</label><br />
                        <input type='text' name="lNameInput" id="lNameInput" placeholder='Doe' />
                    </div>
                    <div className="registerEmail">
                        <label htmlFor="emailInput">Email</label><br />
                        <input type="email" name="emailInput" id="emailInput" placeholder='example@gmail.com' />
                    </div>
                    <div className="registerPassword">
                        <label htmlFor="passwordInput">Password</label><br />
                        <input type="password" name="passwordInput" id="passwordInput" /><br />
                    </div>
                    <div className="registerPassword">
                        <label htmlFor="passwordInput">Confirm Password</label><br />
                        <input type="password"  name="passwordInput" id="passwordInput"  /><br />
                    </div>
                    <div className="registerSignUp">
                        <button type="submit">Register</button>
                        <div className="textCenter">
                            <p className="textSmall textLight">Already have an account? <a className='accentTextColor' href="/login">Login</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
