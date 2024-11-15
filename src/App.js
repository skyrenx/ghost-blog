import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import WritePage from './components/WritePage';
import SearchPage from './components/SearchPage';
import NavigationBar from './components/NavigationBar';
import AccountSection from './components/AccountSection';


function App() {

  return (
    <div className="App">
      
      <Router>
      <NavigationBar />
      <div className='app-content'>
      <AccountSection />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
