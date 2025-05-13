import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Topics from './pages/Topics';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Test from './pages/Test';
import TestResult from './pages/TestResult';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false,    
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<Landing />}></Route>
        <Route path={'/o-nama'} element={<About />}></Route>
        <Route path={'/kontakt'} element={<Contact />}></Route>
        <Route path={'/prijava'} element={<Login />}></Route>
        <Route path={'/podrucja'} element={<Topics />}></Route>
        <Route path={'/test'} element={<Test />}></Route>
        <Route path={'/testResult'} element={<TestResult />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
