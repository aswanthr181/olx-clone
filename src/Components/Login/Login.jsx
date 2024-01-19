import React, { useContext, useState } from 'react';
import {FirebaseContext} from '../../store/firebaseContex'

import Logo from '../../../assets/images/olx-logo.svg';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const navigate=useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const auth=getAuth(firebase)
  const handleLogin=(e)=>{
    e.preventDefault()

    signInWithEmailAndPassword(auth,email,password).then(()=>{
      alert('logged in')
      navigate('/')
    }).catch((error)=>{
      alert(error.message)
    })

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            
          />
          <br />
          <br />
          
          <button>Login</button>
         
        </form>
        <Link to='/signup' >
        <a style={{textDecoration:'none'}} >Signup</a>
        </Link>
      </div>
    </div>
  );
}

export default Login;
