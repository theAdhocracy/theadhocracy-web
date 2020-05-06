import React, { useState } from "react"
import { connectSearchBox } from "react-instantsearch-dom"

import styles from "./search.module.css"

const handleFocus = (event) => event.target.select()
const updateQuery = (query) => window.history.pushState("", "", `?query=${query}`)

const userSearch = (event, refine) => {
	refine(event.currentTarget.value)
	updateQuery(event.currentTarget.value)
}

const resetSearch = (refine) => {
	refine("")
	updateQuery("")
}

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
	const [lastQuery, setQuery] = useState("")
	return (
		<form className={styles.search_box} noValidate action="javascript:void(0);" role="search" onSubmit={(e) => e.preventDefault()}>
			<input type="search" value={currentRefinement} onChange={(event) => userSearch(event, refine)} placeholder="Search archives" onClick={handleFocus} />
			<button onClick={() => resetSearch(refine)} type="button" title="Reset search">
				🔄
			</button>
			{isSearchStalled ? <p>Sorry, search is stalling, please wait a moment.</p> : ""}
		</form>
	)
}

export const CustomSearchBox = connectSearchBox(SearchBox)
