import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

function AccountSection({logInCallback, logOffCallback, userProp, rolesProp}) {
    const [username, setUsername] = useState(''); //login form username
    const [password, setPassword] = useState(''); //login form password
    const [error, setError] = useState(null); //login form error
    const [user, setUser] = useState(userProp); //username of currently logged in user
    const [roles, setRoles] = useState(rolesProp); // array of strings representing user roles
    const navigate = useNavigate(); 

    //Write JWT and user to local storage
    useEffect(() => {
        if (user && roles) {
            setUser(user);
            setRoles(roles);
        } else {
        }
    }, [userProp, rolesProp])

    const handleLogout = () => {
        //setJWTToken(null);
        setUser(null);
        setRoles(null);
        logOffCallback();
        navigate('/'); //redirect to home page
    }

    const onLoginSubmit = (e) => {
        e.preventDefault();

        // Here, add your authentication logic
        try {
            postLogin();
        } catch (error) {

        }

    }

    // Utility function to get CSRF token from cookie
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
            // Extract the JWT token from the Authorization header
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
            setUser(null);
            setRoles(null);
        };
    }


    return <div>
        {user ? <div>Logged in as {user} with roles: {roles}<button onClick={handleLogout}>Log Out</button></div>
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