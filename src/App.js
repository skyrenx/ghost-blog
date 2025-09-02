import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import WritePage from './components/WritePage';
import SearchPage from './components/SearchPage';
import NavigationBar from './components/NavigationBar';
import AccountSection from './components/AccountPage';


function App() {
  const [navLinks, setNavLinks] = useState(
    new Map([
      ['/', new NavLink("home", true)],
      ['/search', new NavLink("search", true)],
      ['/about', new NavLink("about", true)],
      ['/write', new NavLink("write", false)],
      ['/account', new NavLink("account", true)],
    ])
  );
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();

    /*const storedRoles = localStorage.getItem('roles');
    if (storedRoles && storedRoles !== "null") {
      setRoles(roles);
    }*/
  }, [])

  useEffect(() => {
    let isEnabled;
    if (roles && roles.includes('ROLE_ADMIN')) {
      isEnabled = true;
    } else {
      isEnabled = false;
    }
    let newNavLinks = new Map(navLinks);
    let newWriteNavLink = navLinks.get('/write');
    newWriteNavLink.enabled = isEnabled;
    newNavLinks.set('/write', newWriteNavLink);
    setNavLinks(newNavLinks);
  }, [roles])

  const checkAuth = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
            method: 'GET',
            credentials: 'include', // important to send cookies
        });

        if (!response.ok) {
            // Cookie invalid or expired
            setUser(null);
            setRoles(null);
            return;
        }

        const json = await response.json();
        setUser(json.username);
        setRoles(json.roles);
    } catch (error) {
        console.error("Error checking auth:", error);
        setUser(null);
        setRoles(null);
    }
};

  const logInCallback = (roles, user) => {
    setRoles(roles);
    setUser(user);
  }
  const logOffCallback = () => {
    setRoles([]);
    setUser(null);
  }
  return (
    <div className="App">

      <Router>
        <NavigationBar navLinks={navLinks} />
        <div className='app-content'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog/:id" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/write" element={<WritePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/account" element={<AccountSection logInCallback={logInCallback} logOffCallback={logOffCallback} userProp={user} rolesProp={roles} />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}


class NavLink {
  constructor(linkText, enabled) {
    this.linkText = linkText;
    this.enabled = enabled;
  }
}

export default App;
