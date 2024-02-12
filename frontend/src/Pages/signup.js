import React, { useState,useEffect } from 'react'
import Input from '../components/Input'
import Button from '../components/Button';
import '../styles/signup.css'
import { registerUser } from '../Redux/signup.slice';
import { useDispatch ,  useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom'
function Signup() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    function handlePassword(event) {
        let new_pass = event.target.value;
        setPassword(new_pass);
    }
const dispatch =useDispatch()
const navigate = useNavigate()
    const success= useSelector((state)=>state.register.success)


    const handleSubmit = (e) => {
      e.preventDefault();
    
  
  try{
      dispatch(registerUser({ name, email, password }));
     
  }
    catch(err){
      alert(err);
    } 
      
      };

     
    useEffect(()=>{
        if(success===true){
            navigate('./Login')
        }
      },[success ,navigate])
  
    return (
        <div className='container'>
            <form className='formdiv' onSubmit={handleSubmit} >
              
              
                 <div className='heading'>
                    <h1>Sign Up here </h1>
                       <p>Welcome User!! sign up for better experience</p>
                 </div>



                    <Input
                        type='text'
                        name='name'
                        value={name}
                        placeholder='Enter your name'
                        onChange={(e) => setName(e.target.value)}
                    />





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
    )
}

export default Signup