import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import Card from "../components/content_card"

export default ({ data }) => {
	const collection = data.collections
	return (
		<Layout title={collection.title} article={false}>
			<section id="content">
				<header>
					<h1>{collection.title}</h1>
					<p dangerouslySetInnerHTML={{ __html: collection.desc }} />
				</header>
				<main className="content-grid">
					{collection.reviews.map((review) => (
						<Card post={review} type="review" key={review.slug} />
					))}
				</main>
			</section>
		</Layout>
	)
}

export const query = graphql`
	query($slug: String!) {
		collections(slug: { eq: $slug }) {
			title
			desc
			reviews {
				updated(formatString: "DD MMM YYYY")
				desc
				rating
				slug
				title
				type
			}
		}
	}
`
