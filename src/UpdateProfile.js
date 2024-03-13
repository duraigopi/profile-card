import React, { useState } from 'react'
import './Profile.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

const UpdateProfile = () => {

  //Receiving Data From goToUpdatePage function  
  const navigate=useNavigate();
  const getData=useLocation();
  const data=getData.state;

  const [name,setName]=useState(data.name);
  const [number,setNumber]=useState(data.number);
  const [email,setEmail]=useState(data.email);
  const [place,setPlace]=useState(data.place);
  const [img,setImg]=useState(data.imagelink)
  const id=data.id;

  //Defining Object Format
  const Data={
    id:id,
    name:name,
    number:number,
    email:email,
    place:place,
    imagelink:img
  }

  //Updating the data to JSON server Function
  const updateData= async(e) =>{
    e.preventDefault();
    await axios
    .put(`http://localhost:5000/data/${id}`,Data)
    .then((response)=>{
      if(response.status===200){
        alert("Data Updated Successfully")
        setName("");
        setNumber("");
        setEmail("");
        setPlace("");        
        setImg("");
        navigate('/')
      }else{
        alert("Error While Updating Data")
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  //Back to Home Function
  const goBack=()=>{
    navigate('/')
  }
  return (
    <>
      <header>
        <h2>Update Profile</h2>
      </header>  
      <section className="design">
        <form className='datacontainer'>
          <fieldset>
            <legend>Enter details</legend>
            <label htmlFor='name'>Name:</label>
            <input 
              type='text' 
              name='name' 
              placeholder='Enter Your Name' 
              value={name} 
              onChange={(e)=>setName(e.target.value)} 
            />
            <label htmlFor='phone'>Phone:</label>
            <input 
              type='text' 
              name='phone' 
              placeholder='Enter Your Number' 
              value={number} 
              onChange={(e)=>setNumber(e.target.value)} 
            />
            <label htmlFor='email'>E-mail:</label>
            <input 
              type='email'
              name='email' 
              placeholder='Enter Your Email' 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)}  
            />
            <label htmlFor='place'>Place:</label>
            <input 
              type='text' 
              name='place' 
              placeholder='Enter Your Place' 
              value={place} 
              onChange={(e)=>setPlace(e.target.value)} 
            />
            <label htmlFor='img'>Image Link:</label>
            <input 
              type='text' 
              name='img' 
              placeholder='Enter Image URL'
              value={img} 
              onChange={(e)=>setImg(e.target.value)} 
            />
            <button type='submit' className='btn editbtn' onClick={updateData}>
              <i className="fa fa-save"></i>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;Update Data</p>
            </button>
            <button type='reset' className='btn homebtn' onClick={goBack}>
              <i className="fa fa-home"></i>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;Back To Home</p>
            </button>
          </fieldset>
        </form>
      </section>
    </>
  )
}

export default UpdateProfile