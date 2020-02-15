import React from "react"
import { Link } from "gatsby"

import "./page_nav.css"

const PageNav = ({page}) => {
    // Defining pagination values
    const { currentPage, numPages } = page
    const pageRoot = "/articles/"
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? pageRoot : `${pageRoot}${(currentPage - 1).toString()}`
    const nextPage = `${pageRoot}${(currentPage + 1).toString()}`

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

export default PageNav