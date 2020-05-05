import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

import styles from "./search.module.css"

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
	<form className={styles.search_box} noValidate action="" role="search">
		<input type="search" value={currentRefinement} onChange={(event) => refine(event.currentTarget.value)} placeholder="Search archives" />
		<button onClick={() => refine("")}>Reset query</button>
		{isSearchStalled ? "My search is stalled" : ""}
	</form>
)

export const CustomSearchBox = connectSearchBox(SearchBox)
