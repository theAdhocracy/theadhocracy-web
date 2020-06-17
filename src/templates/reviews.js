import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Card from "../components/content_card"
import PageNav from "../components/page_nav"

import "../styles/reviews.css"

export default ({ data, pageContext }) => {
	// Set root for data
	const reviews = data.allReviews.nodes

	return (
		<Layout title="Reviews" sidebar={false}>
			<section id="content">
				<header>
					<h1>Explore Reviews</h1>
				</header>
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
