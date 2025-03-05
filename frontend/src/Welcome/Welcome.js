import React, { useEffect } from 'react'
import './Welcome.css'
import { useNavigate} from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  useEffect (() => {
    const timer = setTimeout(() => {
      navigate("/vegetables");
    }, 5000);
    return ()=> clearInterval(timer)
  }, [navigate]);
  return (
    <div className='welcome-main-container'>
        <div className='second-container'>
            <p className='welcome-text'>Welcome to </p>
            <h1 className='welcome-heading'>Vegetable Dhukan :) </h1>
            <img src='https://res.cloudinary.com/do6gfsc8z/image/upload/v1735451958/sheik-cartoon_fp8z7g.png' alt="kalyan" className='logo-image'/>
            <p>
                Linked In: <span>www.linkedin.com/in/kalyan-surla</span>
            </p>
            <p>
                Gmail: <span>kalyansurla219@gmail.com</span>
            </p>
        </div>
        <button className='veg-button' onClick = {() => navigate("/vegetables")}>Vegetables</button>
    </div>
  )
}

export default Welcome