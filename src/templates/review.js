import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import "../styles/article.css"

export default ({ data }) => {
	const review = data.reviews
	return (
		<Layout title={review.title} article={true}>
			<main id="content" className="article h-entry">
				<header>
					<h1 className="article-header p-name">{review.title}</h1>
				</header>
				<article className="full-width">
					<ul className="article-details left-side">
						{review.updated && review.updated !== review.date ? (
							<>
								<li>Updated</li>
								<li className="dt-updated">{review.updated}</li>
							</>
						) : (
							""
						)}
						<li>Published</li>
						<li className="dt-published">{review.date}</li>
						<li>Collections</li>
						<li>
							{review.collections.map((tag, index, array) =>
								index < array.length - 1 ? (
									<Link to={`/search/?query=${tag}`} key={index}>
										{tag},
									</Link>
								) : (
									<Link to={`/search/?query=${tag}`} key={index}>
										{tag}
									</Link>
								)
							)}
						</li>
					</ul>
					<div id="article-body" className="e-content" dangerouslySetInnerHTML={{ __html: review.desc }} />
				</article>
			</main>
		</Layout>
	)
}

export const query = graphql`
	query($slug: String!) {
		reviews(slug: { eq: $slug }) {
			title
			desc
			rating
			collections
			critiques {
				title
				copy
				date
				rating
				location
				rewatchList {
					copy
					date
					rating
					location
				}
			}
			date(formatString: "DD MMMM YYYY")
			updated(formatString: "DD MMMM YYYY")
		}
	}
`
