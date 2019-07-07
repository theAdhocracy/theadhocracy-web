import React from 'react'
import Header from './header'
import Footer from './footer'
import Sidebar from './sidebar'

export default ({ children, sidebar }) => (
    <>
        <Header></Header>
        {children}
        {sidebar ? <Sidebar></Sidebar> : null}
        <Footer></Footer>
    </>
)