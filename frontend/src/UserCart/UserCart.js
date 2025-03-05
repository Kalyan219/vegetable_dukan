import React from 'react'
import { CartProvider, useCart } from "react-use-cart";
import "./Checkout.css"
import { useNavigate } from 'react-router-dom'

import Navbar from '../Navbar/Navbar.js'
export const UserCart = () => {
   
    const {
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        cartTotal,
      } = useCart();

     const navigate=useNavigate();
     
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/", { replace: true }); // Redirect to login
      return;
    }
    
  return (
    <>
    <Navbar />
    <div>
       {isEmpty ? (
        <div className='empty'>
            <h1>Checkout</h1>
            <p>Your Cart is Empty</p>
            <button style={{textAlign:"center"}} onClick={() => navigate("/vegetables")}>Shop Now</button>
        </div>
       ):(
        
            <div className='user-cart-main'>
                 <div className='checkout-cart'>
                  <h1 style={{textAlign:"center"}}>Cart ({totalUniqueItems})</h1>
                  <p>Total Price: ${cartTotal.toFixed(2)}</p>
                 </div>
                <ul className='list-items'>
                    {items.map(
                        (item) => (
                            <li key={item._id} className='checkout-list-css'>
                                <div><img src={item.imageUrl} alt={item.vegetableName}  className='image-check'/>
                                <p>{item.name}</p></div>
                                <p>Price: {item.price}</p>
                                <div className='quantity-css'>
                                <button className='bt-css' onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) - 1)}>-</button>
                                <p className='qt-css'>{item.quantity}</p>
                                <button className='bt-css' onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) + 1)}>+</button>
                                </div>
                                <p>Total Price : {item.price*item.quantity}</p>
                                <button className='removeBtn' onClick={() => removeItem(item.id)}>Remove</button>
                            </li>
                        )
                    )}
                </ul>
                
            </div>
            
        
       )}
    
                
    </div>
    </>
  )
}
