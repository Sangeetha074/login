import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


 const Signup = () => {
  
  const Navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      // Sending POST request to FastAPI backend
      const response = await axios.post('http://127.0.0.1:8000/insert', {
        username: username,
        password: password,
      });

      
      setMessage(response.data.message || 'Signup successful!');
      setTimeout(() => {
        Navigate('/page');
      }, 5000); 
    } catch (error) {
      setMessage('Error inserting data. Please try again.');
      console.error(error);
    }
  };


  return (
    <div>
    <div className='head'>
    <h1>𝐒𝐈𝐆𝐍𝐔𝐏</h1>
    <form onSubmit={handleSubmit}>
    <div className='user'>
    
    <h3>username:<input type="text" placeholder='Enter your username'  value={username}onChange={(e) => setUsername(e.target.value)}
                required ></input></h3>
    </div>
    <div className='password'>
    <h3>Password:<input type="text" placeholder=' Enter your password' value={password}
                onChange={(e) => setPassword(e.target.value)}
                required ></input></h3>
    </div>
    <div className='password'>
    <h3>Confrompassword:<input type="text" placeholder='Enter Your confrompassword' value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                ></input></h3>
    </div>
    <button >submit</button>
    </form>
    {message && <p style={{ color: 'red' }}>{message}</p>}
    <div>
    <p>
        Already have an account?<Link to="/">login</Link>
    </p>
    </div>
    </div>
    </div>
  );
};
export default Signup
