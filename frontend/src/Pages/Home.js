// import React from 'react'

// function Home() {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home


import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../Redux/Home.slice';
import { logoutUser } from '../Redux/login.slice';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData  = useSelector(state => state.home.userData);
//   console.log('mydata',userData)
  const logged = useSelector(state => state.auth.logged);
console.log("logged value" , logged)
  useEffect(() => {
  
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/Login');
  };

  useEffect(() => {
    if (!logged) {
      navigate('/Login');
    }
  }, [logged, navigate]);

  return (
    <div className='container'>
      <div className='headings'>
        <h1>Welcome, {userData.name ? userData.name : 'User'}!</h1>
        <p>You are now logged in.</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
