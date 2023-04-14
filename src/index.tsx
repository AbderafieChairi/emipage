import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import About from './components/About/About';
import Achievements from './components/Achievements/Achievements';
import Members from './components/Members/Members';
import Projects from './components/Project/Project';
import Sponsors from './components/Sponsors/Sponsors';
import ContactForm from './components/Contactus/ContactForm';
import Footer from './components/Footer/Footer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div>
    <App />
    <About />
    <Achievements/>
    <Members/>
    <Projects/>
    <Sponsors/>
    <ContactForm/>
    <Footer/>
  </div>
);

