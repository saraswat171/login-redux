import React from 'react';
import '../styles/Input.css'
const Input = ({ type, name, placeholder, value, onChange }) => {
    return (
       
            
              <div className='inputdiv'>
                      <input className='inputfield'
                        type={type} 
                        name={name} 
                        id={name} 
                        placeholder={placeholder} 
                        value={value} 
                        onChange={onChange} 
                        required 
                    ></input>
              </div>
              
    );
};

export default Input;
