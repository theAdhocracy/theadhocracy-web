import React from "react"
import SEO from "./seo"
import Header from "./header"
import Footer from "./footer"
import Sidebar from "./sidebar"

export default ({ children, sidebar, title, meta }) => (
	<>
		<SEO title={title} meta={meta} />
		<Header></Header>
		{children}
		{sidebar ? <Sidebar></Sidebar> : null}
		<Footer></Footer>
	</>
)
