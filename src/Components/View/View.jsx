import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { db, firebase } from '../../firebase/config';
import { FirebaseContext } from '../../store/firebaseContex';
import { collection, getDocs, where } from 'firebase/firestore';
function View() {
  const [userDetails,setUserDetails]=useState()
  const {postDetails}=useContext(PostContext)
  const {firebase}=useContext(FirebaseContext)

  useEffect(()=>{
   console.log(postDetails);
    const fetchData = async()=>{
      const snapshot=await getDocs(collection(db,'users'),where('id','==',postDetails.useId))

      const userDetails=[];
      snapshot.forEach((doc) => {
        // console.log(doc.data());
        userDetails.push(doc.data())
        setUserDetails(userDetails)
        
      });
      console.log(userDetails);
      
    }
    console.log(userDetails);
    fetchData()
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageurl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
       {userDetails && <div className="contactDetails">
          <p>Seller Details</p>
          <p>{userDetails[0].username}</p>
          <p>{userDetails[0].phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
