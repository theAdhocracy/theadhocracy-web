import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
	<form noValidate action="" role="search">
		<input type="search" value={currentRefinement} onChange={(event) => refine(event.currentTarget.value)} placeholder="Search archives" />
		<button onClick={() => refine("")}>Reset query</button>
		{isSearchStalled ? "My search is stalled" : ""}
	</form>
)

export const CustomSearchBox = connectSearchBox(SearchBox)
