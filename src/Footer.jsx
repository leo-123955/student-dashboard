import React from 'react';
import {
  BsFacebook,
  BsTwitterX,
  BsInstagram,
  BsLinkedin,
  BsGithub
} from 'react-icons/bs';

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Student Dashboard. All rights reserved.</p>

      <div className="social-icons">
        <a href="#" aria-label="Facebook"><BsFacebook /></a>
        <a href="#" aria-label="Twitter"><BsTwitterX /></a>
        <a href="#" aria-label="Instagram"><BsInstagram /></a>
        <a href="#" aria-label="LinkedIn"><BsLinkedin /></a>
        <a href="#" aria-label="GitHub"><BsGithub /></a>
      </div>
    </footer>
  );
}

export default Footer;
