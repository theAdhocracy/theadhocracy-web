import React from "react"
import algoliasearch from "algoliasearch/lite"
import { orderBy } from "lodash"
import { InstantSearch, PoweredBy } from "react-instantsearch-dom"
// Custom components
import { PostPreview } from "./post_preview"
import { CustomSearchBox, CustomCategoryFilter } from "./search_box"
import { globalHistory } from "@reach/router"

const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY)
const searchIndex = "theAdhocracy_Feed"

export default function Search() {
	let urlQuery = globalHistory.location.search ? globalHistory.location.search.replace("?query=", "").replace(/&filter.*/, "") : ""
	let urlFilter = globalHistory.location.search.search("&filter=") ? decodeURIComponent(globalHistory.location.search.replace(/.*&filter=/, "").replace(/\+/g, " ")).split(",") : ""
	return (
		<>
			<InstantSearch indexName={searchIndex} searchClient={searchClient}>
				<CustomSearchBox defaultRefinement={urlQuery} />
				<CustomCategoryFilter attribute="categories" transformItems={(items) => orderBy(items, ["count", "label"], ["desc", "asc"])} defaultRefinement={urlFilter !== null ? "" : urlFilter} limit={20} />
				<PostPreview />
				<PoweredBy />
			</InstantSearch>
		</>
	)
}
