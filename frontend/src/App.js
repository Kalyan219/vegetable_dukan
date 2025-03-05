import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUpPage from './SignUpPage/SignUpPage';
import SignInPage from './SignInPage/SignInPage';
import Welcome from './Welcome/Welcome';
import Vegetables from './VegetablesList/Vegetables';

import './App.css';

import { CartProvider } from './CartContext/CartContext';
import { UserCart } from './UserCart/UserCart';


function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUpPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage/>} />
          <Route path='/welcome' element={<Welcome/>} />
          <Route path='/vegetables' element={<Vegetables/>} />
          <Route path='/checkout' element={<UserCart/>} />
          </Routes>
      </BrowserRouter>
    
  )
}
export default App;
