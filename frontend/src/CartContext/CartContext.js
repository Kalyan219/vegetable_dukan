import React, {createContext,useContext, useState} from 'react'


const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart,setCart] = useState([])
    const addToCart = (product) => {
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item._id === product._id);
    
          if (existingItem) {
            return prevCart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prevCart, { ...product, quantity: 1 }];
          }
        });
      };

    const removeFromCart = (_id) => {
        setCart((prevItems) => prevItems.filter((item) => item._id !== _id));
      };

      

    return (
        <CartContext.Provider  value = {{cart, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext);
};
