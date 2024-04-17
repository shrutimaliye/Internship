import React,{ useState } from 'react'
import axios from 'axios';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
width: 75%;
min-height: 100vh;
margin:0 auto;
display: flex;
justify-content: center;
align-items:center;
`
function Userlogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userNotification, setUserNotification] = useState(null);
  const navigate =useNavigate('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmituser = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/login', { username, password })
    .then(result =>{
      console.log(result)
      if(result.data ==="Success"){
        setUserNotification("Logged in successfully");
        navigate('/MACAddressInput')
      }
      else{
        setUserNotification(result.data);
      }
    })
    .catch(err => console.log(err))
   
  };
    return (
        <Container>
          <div className="section">
        <h2>Login User</h2>
        <form onSubmit={handleSubmituser}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        {userNotification && <p>{userNotification}</p>}
      </form>
      </div>
        </Container>
    )
 
}

export default Userlogin;
