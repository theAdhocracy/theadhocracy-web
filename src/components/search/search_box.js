import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

import styles from "./search.module.css"

const handleFocus = (event) => event.target.select()

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
	<form className={styles.search_box} noValidate action="javascript:void(0);" role="search" onSubmit={(e) => e.preventDefault()}>
		<input type="search" value={currentRefinement} onChange={(event) => refine(event.currentTarget.value)} placeholder="Search archives" onClick={handleFocus} />
		<button onClick={() => refine("")} type="button">
			🔄
		</button>
		{isSearchStalled ? <p>Sorry, search is stalling, please wait a moment.</p> : ""}
	</form>
)

export const CustomSearchBox = connectSearchBox(SearchBox)
