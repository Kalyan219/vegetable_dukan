import React from 'react'
import { Link } from 'react-router-dom'
import { CartProvider, useCart } from "react-use-cart";
import './Navbar.css'
import Logout from '../Logout/Logout';

const Navbar = () => {
  const {totalUniqueItems} = useCart()
  return (
    <>
      <ul className="nav-section">
        <Link to="/vegetables" className="custom-link"><li>Vegetables</li></Link>
        
        <Link to="/checkout" className="custom-link"><li>Cart <span className='cart-count'> {totalUniqueItems}</span></li></Link>
        <Logout />
      </ul>
    </>
  )
}

export default Navbar