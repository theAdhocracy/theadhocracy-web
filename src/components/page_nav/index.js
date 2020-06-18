import React from "react"
import { Link } from "gatsby"

import "./page_nav.css"

const PageNav = ({ currentPage, totalPages, pageRoot, type }) => {
	// Defining pagination values
	const isFirst = currentPage === 1
	const isLast = currentPage === totalPages
	const prevPage = currentPage - 1 === 1 ? pageRoot : `${pageRoot}${(currentPage - 1).toString()}`
	const nextPage = `${pageRoot}${(currentPage + 1).toString()}`

	switch (type) {
		case "review":
			return (
				<footer className="page-navigation">
					{!isFirst ? (
						<Link to={`${pageRoot}${(currentPage - 1).toString()}`} rel="prev">
							← Previous Page
						</Link>
					) : (
						<Link to={"/reviews/"} rel="prev">
							← Reviews Hub
						</Link>
					)}
					{!isLast && (
						<Link to={nextPage} rel="next">
							Next Page →
						</Link>
					)}
				</footer>
			)
		default:
			return (
				<footer className="page-navigation">
					{!isFirst && (
						<Link to={prevPage} rel="prev">
							← Previous Page
						</Link>
					)}
					{!isLast && (
						<Link to={nextPage} rel="next">
							Next Page →
						</Link>
					)}
				</footer>
			)
	}
}

export default PageNav
