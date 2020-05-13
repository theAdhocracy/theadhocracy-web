import React from "react"
import SEO from "./seo/seo"
import Header from "./header"
import Footer from "./footer"
import Sidebar from "./sidebar"

export default ({ children, sidebar, title }) => (
	<>
		<SEO title={title} />
		<Header></Header>
		{children}
		{sidebar ? <Sidebar></Sidebar> : null}
		<Footer></Footer>
	</>
)
