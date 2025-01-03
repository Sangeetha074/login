import React from 'react'
import {BrowserRouter} from 'react-router-dom'

import { Nav } from './nav'
import Router from './router'

export const Browser=()=>{
    return(
        <div>
            <BrowserRouter>
            <Router></Router>
            <Nav></Nav>
            </BrowserRouter>
        </div>
    )
}
