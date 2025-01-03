import React from 'react'
import {Routes,Route} from'react-router-dom'
import Loginpage from './loginpage'
import Signup from './signup'
import Register from './register'
import Page from './page'
import Password from './password'
const Router = () => {
    return (
      <div>
        <Routes>
          <Route>
            <Route path="/" element={<Loginpage/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/page" element={<Page/>}></Route>
            <Route path="/password" element={<Password/>}></Route>
          </Route>
        </Routes>
      
      
      </div>
    )
  }
  export default Router