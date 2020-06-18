import React from "react"
import { graphql, Link } from "gatsby"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, Configure } from "react-instantsearch-dom"
import { globalHistory } from "@reach/router"

import { CustomSearchBox, CustomCategoryFilter } from "../components/search/search_box"
import { ReviewPreview } from "../components/search/review_preview"
import { CustomRatingMenu } from "../components/search/rating"
import Layout from "../components/layout"
import Card from "../components/content_card"

import "../styles/reviews.css"

export default ({ data }) => {
	// Set root pathways for data
	const reviews = data.reviews.nodes
	const series = data.series.nodes
	const collections = data.collections.nodes

	// Search index keys
	const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY)
	const searchIndex = "theAdhocracy_Reviews"

	// Get URL
	let urlQuery = globalHistory.location.search ? decodeURIComponent(globalHistory.location.search.replace("?query=", "").replace(/&filter.*/, "")) : ""

	return (
		<Layout title="Reviews" sidebar={false}>
			<section id="content">
				<header>
					<h1>Ad hoc Reviews</h1>
				</header>
				<h2>Latest Reviews</h2>
				<section className="content-grid">
					{reviews.map((review) => {
						return <Card post={review} type="review" />
					})}
				</section>
				<Link to="/reviews/1">Explore?</Link>
				<h2>Latest Series</h2>
				<section className="content-grid">
					{series.map((post) => {
						return (
							<article className={"content-card"}>
								<header>
									<h2>{post.title}</h2>
								</header>

								<div dangerouslySetInnerHTML={{ __html: `${post.desc}` }} />

								<footer>
									<p className="card-button card-info">{/* <Rating value={post.rating} /> */}</p>
									<Link to={`/review/${post.type}/${post.slug}`} className="card-button">
										<span role="img" aria-label="Book icon">
											📖
										</span>{" "}
										Read Entry
									</Link>
								</footer>
							</article>
						)
					})}
				</section>
				<h2>Latest Collections</h2>
				<section className="content-grid">
					{collections.map((post) => {
						return (
							<article className={"content-card"}>
								<header>
									<h2>{post.title}</h2>
								</header>

								<div dangerouslySetInnerHTML={{ __html: `${post.desc}` }} />

								<footer>
									<p className="card-button card-info">{/* <Rating value={post.rating} /> */}</p>
									<Link to={`/review/${post.type}/${post.slug}`} className="card-button">
										<span role="img" aria-label="Book icon">
											📖
										</span>{" "}
										Read Entry
									</Link>
								</footer>
							</article>
						)
					})}
				</section>
				<h2>Search Reviews</h2>
				<InstantSearch indexName={searchIndex} searchClient={searchClient}>
					<CustomSearchBox defaultRefinement={urlQuery} label="reviews" />
					<Configure hitsPerPage={"6"} />
					<section className="search_control">
						<CustomCategoryFilter attribute="node.type" limit={50} />
						<CustomRatingMenu attribute="node.rating" />
					</section>
					<ReviewPreview />
				</InstantSearch>
			</section>
		</Layout>
	)
}

export const query = graphql`
	{
		reviews: allReviews(limit: 3, sort: { fields: [latestReview, updated], order: [DESC, DESC] }) {
			nodes {
				title
				slug
				desc
				date(formatString: "DD MMM YYYY")
				rating
				type
				series {
					title
					slug
				}
				collections {
					title
					slug
				}
			}
		}
		series: allSeries(limit: 3, sort: { fields: reviews___updated, order: DESC }) {
			nodes {
				title
				slug
				desc
				rating
				type
				collections {
					title
					slug
				}
			}
		}
		collections: allCollections(limit: 3, sort: { fields: reviews___updated, order: DESC }) {
			nodes {
				title
				slug
				desc
			}
		}
	}
`
