import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function AccountSection() {
    const [username, setUsername] = useState(''); //login form username
    const [password, setPassword] = useState(''); //login form password
    const [error, setError] = useState(null); //login form error
    const [jWTToken, setJWTToken] = useState(null);
    const [user, setUser] = useState(null); //username of currently logged in user
    const [roles, setRoles] = useState(null);
    const navigate = useNavigate(); // Make sure this line is present

    // Read JWT and username from local storage on first render.
    // Define this useEffect before the useEffect that performs read for correct run order on first render. 
    useEffect(() => {
        const token = localStorage.getItem('token');
        ("null" !== token && token && setJWTToken(token));
        const user = localStorage.getItem('user');
        ("null" !== user && user && setUser(user));
    }, [])

    //Write JWT and user to local storage
    useEffect(() => {
        if (jWTToken && user) {
            localStorage.setItem('token', jWTToken); // Store the token in local storage
            localStorage.setItem('user', user); // Store the username in local storage  
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }, [jWTToken, user])

    const handleLogout = () => {
        setJWTToken(null);
        setUser(null);
        setRoles(null);
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

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/public/user/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'X-XSRF-TOKEN': getCsrfToken() // Include the CSRF token in the header
                    },
                    credentials: 'include',
                    body: JSON.stringify({ username, password })
                });

            let json = await response.json();
            // Extract the JWT token from the Authorization header
            const authHeader = response.headers.get('Authorization');
            //console.log('authHeader: ' + response.headers.json);
            if (response.ok && authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.split(' ')[1]; // Get the token part after 'Bearer '
                setJWTToken(token);
                setUser(json.user);
                setRoles(json.roles);
                // Clear the input fields after login
                setUsername('');
                setPassword('');
            }
            else {
                throw new Error(json);
            }
        } catch (errorResponse) {
            setError(errorResponse);
            setJWTToken(null);
            setUser(null);
            setRoles(null);
        };
    }


    return <div>
        {jWTToken ? <div>Logged in as {user} with roles: {roles}<button onClick={handleLogout}>Log Out</button></div>
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