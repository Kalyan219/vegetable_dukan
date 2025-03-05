import React from 'react'
import {useNavigate,Outlet, Link} from 'react-router-dom'
import {useState} from 'react'
import './SignUpPage.css'

function SignUpPage() {
  const navigate = useNavigate();
  const [signupData, setsignupData]=useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const {name,value} = e.target;

    setsignupData({...signupData, [name]:value})
    setError('')
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signupData)
    if (!signupData.name || !signupData.phoneNumber || !signupData.email || !signupData.password){
      setError("All Fields Are Required");
      return;
    }

    if (!signupData.email.includes("@")){
      setError("Valid Email Required");
      return;
    }

    if(signupData.password.length <= 4){
      setError("Password should be greater than 4 letters");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signupDetails", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(signupData),
    });
    
    const data = await response.json();
    console.log(data.message);
    if (data.message === "User Successfully inserted into the db"){
      navigate('/signin');
    } else {
      setError("Failed to communicate with server.");
    }

   } catch (error) {
    console.log(error);
   }
  }

  return (
    <div className='signup-main-container'>
      <form className='signup-form-container' onSubmit={handleSubmit}>
        <div>
            <h1 style={{color: "black", fontFamily: "Rockwell"}}>Sign Up :)</h1>
        </div>
        <div className='signup-input-container'>
            <lable className='label-signup-name'>Name</lable>
            <input className='signup-input' onChange={handleChange} type="text" placeholder='name' name='name' />
        </div>
        <div className='signup-input-container'> 
            <lable className='label-signup-phone'>Phone Number</lable>
            <input className='signup-input' onChange={handleChange} type="text" placeholder='Phone Number' name='phoneNumber' />
        </div>
        <div className='signup-input-container'>
            <lable className='label-signup-email'>Email</lable>
            <input className='signup-input' onChange={handleChange} type="text" placeholder='Email' name='email' />
        </div>
        <div className='signup-input-container'> 
            <lable className='label-signup-password'>Password</lable>
            <input className='signup-input' onChange={handleChange} type="password" placeholder='Password' name='password' />
        </div>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <div className='button-container'>
            <Link to ='/signin'>
               <button className='signup-button'>Sign In</button>
            </Link>
            <button type='submit' className='signup-button'>Sign Up</button>
        </div>
      </form>
      <Outlet />

    </div>
  )
}

export default SignUpPage