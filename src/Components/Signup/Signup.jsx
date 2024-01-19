import React, { useState,useContext } from 'react';

import Logo from '../../../assets/images/olx-logo.svg';
import './Signup.css';
import { FirebaseContext } from '../../store/firebaseContex';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate=useNavigate()
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')

  const {firebase,db} =useContext(FirebaseContext)
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(username);
    console.log(firebase);
    // firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
    //   result.user.updateProfile({displayName:username})
    // })
    const auth=getAuth(firebase)

    createUserWithEmailAndPassword(auth,email,password).then((result)=>{
      const user=result.user;
      updateProfile(user,{displayName:username})
      .then(()=>{
        addDoc(collection(db,"users"),{id:user.uid,
          username:username,
          email:email,
          password:password,
          phone:phone
        }).then(()=>{
          navigate('/login')
        })
      })
    })
  }


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
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
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login' >
        <a style={{textDecoration:'none'}}>Login</a>
        </Link>
        
      </div>
    </div>
  );
}
