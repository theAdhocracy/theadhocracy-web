import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import Rating from "../components/rating"
import Review from "../components/review"
import "../styles/article.css"
import "../styles/reviews.css"

export default ({ data }) => {
	const [series, setSeries] = useState()

	const review = data.reviews
	const tldr = review.desc.replace(/^<p>/, "<p><strong>tl;dr: </strong>")

	// Set state and prevent link scroll
	function updateSeries(index, event) {
		setSeries(index)
		event.preventDefault()
	}

	// Initial render (required to progressively enhance page)
	useEffect(() => {
		setSeries(0)
	}, [])

	return (
		<Layout title={review.title} article={true}>
			<main id="content" className="article h-entry">
				<header>
					<h1 className="article-header p-name">{review.title}</h1>
					<Rating value={review.rating} />
					<div dangerouslySetInnerHTML={{ __html: tldr }} />
					<p>Collections</p>
					<p>
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
					</p>
					<p>Series</p>
					<p>
						{review.series.map((series, index, array) =>
							index < array.length - 1 ? (
								<Link to={`/search/?query=${series}`} key={index}>
									{series},
								</Link>
							) : (
								<Link to={`/search/?query=${series}`} key={index}>
									{series}
								</Link>
							)
						)}
					</p>
				</header>
				{review.critiques.length > 1 && (
					<nav className="series-nav">
						<ul>
							{review.critiques.map((critique, index) => {
								let title = critique.title ? critique.title : "Title"
								return (
									<li key={index}>
										<a href={`#${title.toLowerCase()}`} onClick={(event) => updateSeries(index, event)}>
											{title}
										</a>
									</li>
								)
							})}
						</ul>
					</nav>
				)}
				{series >= 0 ? <Review review={review.critiques[series]} /> : review.critiques.map((critique, index) => <Review review={critique} key={index} />)}
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
			series
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
