import React, { useEffect, useState } from 'react';
import './Vegetables.css'
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';


function Vegetables() {
    const [vegetablesData, setVegetablesData] = useState([])
    const [error, setError] = useState(null)
    const {addItem} = useCart();
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchVegetablesList = async () => {
          try {
          const token = localStorage.getItem("token")
          if (!token) {
            navigate("/", { replace: true }); // Redirect to login
            return;
          }
          const response = await fetch("http://localhost:5000/getVegetables", {
            method: "GET",
            headers: {
                Authorization: token
            }
          })
          const fetchedData = await response.json();
          
          
          if (fetchedData) {
            setVegetablesData(fetchedData.vegetables);
            setError("")
          }
        } catch(error){
          console.log(error);
          setError("Data not fetched")
        }
        }
        fetchVegetablesList();
    },[navigate]);
    
  const handleAddtocart = (product) => {
    addItem(product)
    alert(product.name+" added to cart")
  }
    

  return (
    <>
    <Navbar />
    <div style={{color:"white"}}>
      {error ? (
        <div>{error}</div>
      ) : (
        <div style={{ textAlign: "center"}}>
        
          <div>
          <ul className="ul-list">
              {vegetablesData.map(
                (item) => (
                  <li key = {item._id} className='list-css'>
                    <img src={item.imageUrl} alt={item.vegetableName} width="100" className='image-css'/>
                    <p className='veg-name'>{item.vegetableName}</p>
                    <p className='veg-price'>Price: {item.price}</p>
                    <button className='add-to-cart' onClick={() =>  handleAddtocart({
          id: item._id, // Ensure an 'id' property is present
          name: item.vegetableName,
          price: item.price,
          imageUrl: item.imageUrl,
          
        })}>Add to Cart</button>
                  </li>
                )
              )}
            </ul>
          </div>
       </div>
      )}
    </div>
    </>
  )
}

export default Vegetables