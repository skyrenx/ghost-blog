import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { defaultProps } from "react-quill";

function AccountSection({logInCallback, logOffCallback, userProp, rolesProp}) {
    const [username, setUsername] = useState(''); //login form username
    const [password, setPassword] = useState(''); //login form password
    const [error, setError] = useState(null); //login form error
    const navigate = useNavigate(); 


    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

            let json = await response.json();
            if (response.ok) {
                logOffCallback();
                navigate('/'); //redirect to home page
            }
            else {
                throw new Error(json);
            }
        } catch (errorResponse) {
            setError(errorResponse);
        };        
       
        
        
    }

    const onLoginSubmit = (e) => {
        e.preventDefault();
        try {
            postLogin();
        } catch (error) {
            console.log("Login error:", error);
        }
    }

    // Utility function to get CSRF token from cookie if needed in the future
    // const getCsrfToken = () => {
    //     const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
    //     return match ? decodeURIComponent(match[2]) : null;
    // };

    const postLogin = async () => {
        setError(null);
        const sanitizedUsername = DOMPurify.sanitize(username);
        const sanitizedPassword = DOMPurify.sanitize(password);
        if(password != sanitizedPassword){
            setError(new Error('That password is illegal'));
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/public/user/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ username, password })
                });

            let json = await response.json();
            if (response.ok) {
                logInCallback(json.roles, json.username);
                setUsername('');
                setPassword('');
            }
            else {
                throw new Error(json);
            }
        } catch (errorResponse) {
            setError(errorResponse);
        };
    }


    return <div>
        {userProp ? <div>Logged in as {userProp} with roles: {rolesProp}<button onClick={handleLogout}>Log Out</button></div>
            :
            <form onSubmit={onLoginSubmit}>
                <div>
                    <label htmlFor="username">username</label>
                    <input id='username' type='text' value={username} onChange={(e) => { setUsername(e.target.value) }}></input>
                    <label htmlFor="password">password</label>
                    <input id='password' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                </div>
                <div className="errorMessage">
                    {error ? error.message : ""}
                </div>
                <button type="Submit">login</button>
            </form>}
    </div>

}

export default AccountSection;