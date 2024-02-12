import React, { useEffect, useState } from 'react'


import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/login.slice';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  function handlePassword(event) {
    let new_pass = event.target.value;
    setPassword(new_pass);
}
  const logged = useSelector(state => state.auth.logged);
 const token = useSelector(state=>state.auth.token)
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
  try{
    dispatch(loginUser({ email, password }));

  }
  catch(err){
    alert(err);
  }
  
    
  };
  console.log("logged value" , logged)
  
  console.log("token value" , token)
  
  useEffect(()=>{
    if(logged){
      navigate('/Home')
    }
  },[logged ,navigate])

  return (
    <div className='container'>
    <form className='formdiv' onSubmit={handleSubmit} >
      
      
         <div className='heading'>
            <h1>Login here </h1>
               <p>Welcome User!! login for better experience</p>
         </div>



           




            <Input
                type='email'
                name='email'
                value={email}
                placeholder='Email Address'
                onChange={(e) => setEmail(e.target.value)}
            />





            <Input
                type='password'
                name='password'
                placeholder='Enter your password'
                value={password}
                onChange={handlePassword}
            />





            <Button name='Sign Up' />

      
    </form>

</div>
  );
}

export default Login;