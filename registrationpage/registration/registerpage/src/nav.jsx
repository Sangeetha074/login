import React from'react'
import {Link} from 'react-router-dom'
export const Nav=()=>{
    return(
        <div>
            <Link to="/"></Link>
            <Link to="/signup"></Link>
            <Link to="/register"></Link>
            <Link to="/page"></Link>
        </div>
    )
}