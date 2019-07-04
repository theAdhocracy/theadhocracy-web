import React from 'react'
import { Link } from 'gatsby'

export default (props) => (
    <>
        <header id="header">
            <h1>theAdhocracy</h1>
        </header>
        <nav id="nav">
            <ul>
                <li><Link to="/">Home</Link></li>
                {/* <li><Link to="/about/">About</Link></li> */}
                <li><Link to="/articles/">Articles</Link></li>
                {/* <li>Portfolio</li>
                <li>Contact</li> */}
            </ul>
        </nav>
    </>
)