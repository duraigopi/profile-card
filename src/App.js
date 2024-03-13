import Home from './Home'
import { Route, Routes } from 'react-router-dom'
import AddProfile from './AddProfile'
import UpdateProfile from './UpdateProfile'

const App = () => {
  
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
       <Route path='/add' element={<AddProfile />} />
      <Route path='/edit' element={<UpdateProfile />}/>
    </Routes>    
  );
}

export default App