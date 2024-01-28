import React from 'react';
import ReactDOM from 'react-dom'
import { SocialIcon } from 'react-social-icons'

const Footer = () => {
  return (
    <footer style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'lightgray', textAlign: 'center', padding: '10px' }}>
        <div className="footer-element">
        <SocialIcon url="https://react-social-icons.com" network="discord" />
        <SocialIcon url="https://react-social-icons.com" network="github" />
        <SocialIcon url="https://react-social-icons.com" network="email" />
        </div>
    </footer>
  );
};

export default Footer;