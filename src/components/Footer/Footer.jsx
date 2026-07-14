import React from 'react'
import logo from '../../Assets/logo.png'
import './Footer.css'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="container">
            <div className="row">
                <Link to='/'>
                <div className="footer__logo--wrapper">
                    <img className="logo" src={logo} alt=""/>
                </div>
                </Link>
                <div className="footer__links">
                    <a href="/" className="footer__link">Home</a>
                    <a href=" " className="footer__link">Contact</a>
                    <a href=" " className="footer__link">Terms</a>
                </div>
                <div className="footer__copyright">
                    Copyright © 2026
                </div>
            </div>
        </div>

    </div>
  )
}

export default Footer