import React from 'react'
import Header from './header'
import Footer from './footer'
import Sidebar from './sidebar'

export default ({ children }) => (
    <>
        <Header></Header>
        {children}
        <Sidebar></Sidebar>
        <Footer></Footer>
    </>
)