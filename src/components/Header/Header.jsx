import React from 'react'
import logo from '../../Assets/logo.png'
import "./Header.css"
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className="header">
        <div className="header__container">
            <div className="logo__wrapper">
                <Link to="/">
                <img className="logo" src={logo} alt=""/>
                </Link>
            </div>
            <div className="header__title--wrapper">
                <h1 className="header__title">Flickbase</h1>
                <h3 className="header__sub-title">America's favorite movie database</h3>
            </div>
            <div className="contact__wrapper">
                <button className="contact__btn">Contact Us</button>
            </div>
        </div>
    </div>
  )
}

export default Header