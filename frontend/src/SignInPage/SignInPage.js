import React from 'react'
import {useNavigate, Outlet, Link} from 'react-router-dom'
import {useState} from 'react'
import './SignInPage.css'

function SignInPage() {
  const navigate = useNavigate();
  const [signinData, setsigninData]=useState({
      
      email: '',
      password: ''
    })
  const [error, setError] = useState('')
  
  const handleChange = (e) => {
    const {name,value} = e.target;

    setsigninData({...signinData, [name]:value})
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signinData)
    if (!signinData.email || !signinData.password){
      setError("All Fields Are Required");
      return;
    }

    if (!signinData.email.includes("@")){
      setError("Valid Email Required");
      return;
    }

    if(signinData.password.length <= 4){
      setError("Password should be greater than 4 letters");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signinDetails", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(signinData),
    });
    
    const data = await response.json();
    console.log("2323",data.token);
    if (data.token) {
      localStorage.setItem("token", data.token)
    }
    if (data.message === "User in the database"){
      navigate("/welcome")
    } else {
      setError(data.message);
    }

   } catch (error) {
    console.log(error);
   }
    
  }
    
  return (
    <div className='signin-main-container'>
      <form onSubmit={handleSubmit} className='signin-form-container'>
        <div>
            <h1 style={{color: "black", fontFamily: "Rockwell"}}>Sign In :)</h1>
        </div>
        <div className='signin-input-container'>
            <lable className='label-signin-email'>Email</lable>
            <input onChange={handleChange} className='signin-input' type="text" placeholder='Email' name='email' />
        </div>
        <div className='signin-input-container'> 
            <lable className='label-signin-password'>Password</lable>
            <input onChange={handleChange} className='signin-input' type="password" placeholder='Password' name='password' />
        </div>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <div className='button-container'>
            <Link to = '/signup'>
            <button className='signin-button'>Sign Up</button>
            </Link>
            <button className='signin-button'>Sign In</button>
        </div>
      </form>
      <Outlet />

    </div>
  )
}

export default SignInPage