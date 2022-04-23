import React from "react"
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './NotFound.css'

export let NotFound = (props: any) => {
    return (
        <div className="NotFound">
            <h1>404 Page Not Found</h1>
            <Link to='/'>Return Home</Link>
        </div>
    )
}