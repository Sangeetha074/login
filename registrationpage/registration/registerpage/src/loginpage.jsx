import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const Loginpage=()=>{
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const[users,setUsers]=useState('');
  const Navigate = useNavigate();
  const[filteredusers,setFilteredUsers]=useState('');
  const handleSubmit =async(e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://127.0.0.1:8000/reg', {
              username,
              password,
          });

      //     if (response.data.status === 'Success') {
      //         navigate('/home'); // Redirect to home page
      //     } else {
      //         setError(response.data.message);
      //     }
      // } catch (err) {
      //     console.error('Login error:', err);
      //     setError('Something went wrong. Please try again.');
      // }
      if (response.data.status === "Success") {
        
       
        const usersResponse = await axios.get("http://127.0.0.1:8000/usersinform");
        console.log(usersResponse.data)
        setUsers(usersResponse.data);
        setFilteredUsers(usersResponse.data);
        Navigate('/register',{ state: { users: usersResponse.data } } )
      } 
      else {
        setError(response.data.message);
      }
    } 
    catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }   
  };

    return(
        <div>
      
    <div className='head'>
    <div className='login'>
    <h1>&nbsp;&nbsp;𝐔𝐒𝐄𝐑𝐋𝐎𝐆𝐈𝐍</h1>
    </div>
    <div className='user'>
    {/* <AccountCircleIcon/> */}
    <h3>Username:<input type="text"    placeholder='enter your username'  
    value={username}   onChange={(e) => setUsername(e.target.value)}                 ></input></h3>
    </div>
    <div className='password'>
    <h3>Password:<input type="text" placeholder='enter your password' 
      value={password} onChange={(e) => setPassword(e.target.value)}                  ></input></h3>
    <br></br>
    </div>
    <label>
    <input type="checkbox"></input>remember me&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/password" ><a href='#'>forgot password?</a></Link>
      
   
    
    </label>
    

    <div className='submit'>
    <button onClick={handleSubmit}>Submit</button>
    </div>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <div className='signup'>
    {/* <button onClick={signup}>signup</button> */}
    <p>
        don't have an account?<Link to="/signup">Signup</Link>
    </p>
    </div>
    
    </div>
    </div>
    )
}
export default Loginpage