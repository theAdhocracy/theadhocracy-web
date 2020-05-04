import React from "react"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, SearchBox, Hits, PoweredBy } from "react-instantsearch-dom"

import styles from "./search.css"
import PostPreview from "./post_preview"

const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY)
const searchIndex = "theAdhocracy_Feed"

export default function Search() {
	return (
		<>
			<InstantSearch indexName={searchIndex} searchClient={searchClient}>
				<SearchBox />
				<Hits hitComponent={PostPreview} />
				<PoweredBy />
			</InstantSearch>
		</>
	)
}
