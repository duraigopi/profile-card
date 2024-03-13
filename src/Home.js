import React, { useState,useEffect } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () =>{

  const [profiles,setProfiles]=useState([]);
  const [search,setSearch]=useState([]);
  const navigate=useNavigate();

  //Get Data From Api
  const getApiData= async() =>{
    await axios
    .get("http://localhost:5000/data")
    .then((response)=>{
      setProfiles(response.data)
      setSearch(response.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getApiData();
  },[])

  //Delete Function
  const handleDelete=async(id)=>{
    await axios
    .delete(`http://localhost:5000/data/${id}`)
    .then((response)=>{
      setProfiles(profiles.filter((profile)=>profile.id !== id))
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  
  //Passing the Properties to Update page
  const goToUpdatePage=(profile)=>{
    navigate('/edit',{state:profile})
  }

  //Search Function
  const handleSearch=(e)=>{
    const searchText=e.target.value.toLowerCase();
    const search=profiles.filter((profile)=>
      profile.name.toLowerCase().includes(searchText) || 
      profile.number.toLowerCase().includes(searchText) || 
      profile.email.toLowerCase().includes(searchText) || 
      profile.place.toLowerCase().includes(searchText)
    )
    setSearch(search)
  }

  return (
    <>
      <header className='heading'>
        <h1>Profile Card</h1>
      </header>
      <nav>
        <label htmlFor='search' className='label' >Search :</label>
        <input 
          type='search'
          placeholder='Search Data'
          onChange={handleSearch}
        /> 
        <Link to='/add'>
          <button className='add'>
            <i className="fa fa-user-plus"></i>&nbsp;&nbsp;&nbsp;&nbsp;Add New Profile
          </button>
        </Link>
      </nav>
      <main className='main'>
        {search.map((profile)=>(
          <div className="container"  key={profile.id} > 
            <figure className='figure'>
              <img className='img' src={profile.imagelink} alt="Profile" title='Profile' />
            </figure>
            <table className='table'>
              <thead>
                <tr>
                  <td>
                    <h3>Name</h3>
                  </td>
                  <td>
                    <h3>:</h3>
                  </td>
                  <td className='td'>{profile.name}</td>
                </tr>
              </thead>  
              <tbody>
                <tr>
                  <td>
                    <h3>Phone</h3>
                  </td>
                  <td>
                    <h3>:</h3>
                  </td>
                  <td className='td'>{profile.number}</td>
                </tr>
                <tr>
                  <td>
                    <h3>E-Mail</h3>
                  </td>
                  <td>
                    <h3>:</h3>
                  </td>
                  <td className='td'>{profile.email}</td>
                </tr>
                <tr>
                  <td>
                    <h3>Place</h3>
                  </td>
                  <td >
                    <h3>:</h3>
                  </td>
                  <td className='td'>{profile.place}</td>
                </tr>
              </tbody>
              <tfoot>   
                <tr>
                  <td>
                    <button className='button editbtn' onClick={()=>goToUpdatePage(profile)}>
                      <i className="fa fa-edit" ></i>&nbsp;Edit
                    </button>
                  </td>
                  <td></td>
                  <td>
                    <button  className='button deletebtn'  onClick={()=>handleDelete(profile.id)} >
                      <i className="fa fa-trash" ></i>&nbsp;&nbsp;Delete
                    </button>
                  </td>
                </tr>
              </tfoot> 
            </table>
          </div>
        ))}
      </main> 
      <footer>
        <p>Website Developed by Duraigopal S.</p>
        <p>&copy;Copyright:2024</p>
      </footer>
    </>
  )
}

export default Home