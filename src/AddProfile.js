import React, { useState } from 'react'
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProfile = () => {
  const [name,setName]=useState("");
  const [number,setNumber]=useState("");
  const [email,setEmail]=useState("");
  const [place,setPlace]=useState("");
  const [img,setImg]=useState("");

  const navigate=useNavigate();

  //Creating New Object Format
  const Data={
    name:name,
    number:number,
    email:email,
    place:place,
    imagelink:img
  }

  //Adding the data to JSON server Function
  const handleAdd= async(e) =>{
    e.preventDefault();
    await axios
    .post("http://localhost:5000/data",Data)
    .then((response)=>{
      if(response.status ===201){
        alert("New Data Added Successfully")
        setName("");
        setNumber("");
        setEmail("");
        setPlace("");
        setImg("");
        navigate('/')
      }else{
        alert("Error While Adding New Data")
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  //Back to Home Function
  const goBack=()=>{
    navigate('/');
  }
  return (
    <>
      <header>
        <h2>Add New Profile</h2>
      </header>
      <section className="design">
        <form className='datacontainer'>
          <fieldset>
            <legend>Enter Details</legend>
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
            <button type='submit' className='btn addbtn' onClick={handleAdd}>
              <i className="fa fa-save"></i>
              <p>&nbsp;&nbsp;&nbsp;Add Data</p>
            </button>
            <button type='reset' className=' btn homebtn' onClick={goBack}>
              <i className="fa fa-home"></i>
              <p>&nbsp;&nbsp;&nbsp;Back To Home</p>
            </button>
          </fieldset>
        </form>
      </section>
    </>
  )
}

export default AddProfile