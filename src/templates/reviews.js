import React from "react"
import { graphql } from "gatsby"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, Hits, RatingMenu } from "react-instantsearch-dom"
import { globalHistory } from "@reach/router"

import { CustomSearchBox, CustomCategoryFilter } from "../components/search/search_box"
import { CustomRatingMenu } from "../components/search/rating"
import Layout from "../components/layout"
import Card from "../components/content_card"
import PageNav from "../components/page_nav"

export default ({ data, pageContext }) => {
	// Set root for data
	const reviews = data.allReviews.nodes

	// Search index keys
	const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY)
	const searchIndex = "theAdhocracy_Reviews"

	// Get URL
	let urlQuery = globalHistory.location.search ? decodeURIComponent(globalHistory.location.search.replace("?query=", "").replace(/&filter.*/, "")) : ""

	return (
		<Layout title="Reviews" sidebar={false}>
			<section id="content">
				<header>
					<h1>Explore Reviews</h1>
				</header>
				<InstantSearch indexName={searchIndex} searchClient={searchClient}>
					<CustomSearchBox defaultRefinement={urlQuery} />
					<CustomCategoryFilter attribute="node.type" limit={50} />
					<CustomRatingMenu attribute="node.rating" />
					<Hits />
				</InstantSearch>
				<main className="content-grid">
					{reviews.map((review, index) => (
						<Card post={review} type="review" key={index} />
					))}
					<PageNav currentPage={pageContext.currentPage} totalPages={pageContext.numPages} pageRoot="/reviews/" />
				</main>
			</section>
		</Layout>
	)
}

export const query = graphql`
	query AllReviewsQuery($skip: Int!, $limit: Int!) {
		allReviews(limit: $limit, skip: $skip, sort: { fields: [latestReview, updated], order: [DESC, DESC] }) {
			nodes {
				title
				slug
				desc
				date(formatString: "DD MMM YYYY")
				rating
				type
			}
		}
	}
`
