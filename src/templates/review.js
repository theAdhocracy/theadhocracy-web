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

	// Prevent link scroll, set state, and update URL
	function updateSeries(index, event, title, urlHash) {
		event.preventDefault()
		setSeries(index)
		window.history.pushState(null, null, `#${urlHash}`)
	}

	// Initial render as dependency can never change (required for page to work w/o JS and sets initial state)
	useEffect(() => {
		let urlHash = window.location.hash
		if (urlHash) {
			// Decode URL hash, find match within critiques
			let title = decodeURI(urlHash.replace("-", " ").replace(/^#/, ""))
			let seriesIndex = review.critiques.findIndex((obj) => obj["title"].toLowerCase() === title)

			// Set initial state; defaults to 0 to account for typos or broken links
			seriesIndex >= 0 ? setSeries(seriesIndex) : setSeries(0)
		} else {
			// Default to the first item in the array
			setSeries(0)
		}
	}, [review.critiques])

	return (
		<Layout title={review.title} article={true}>
			<main id="content" className="article h-entry">
				<header>
					<h1 className="article-header p-name">{review.title}</h1>
					<Rating value={review.rating} />
					<div dangerouslySetInnerHTML={{ __html: tldr }} />
					{review.collections.length > 0 && (
						<>
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
						</>
					)}
					{review.series.length > 0 && (
						<>
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
						</>
					)}
				</header>
				{review.critiques.length > 1 && (
					<nav className="series-nav">
						<ul>
							{review.critiques.map((critique, index) => {
								let title = critique.title ? critique.title : "Title"
								let urlHash = encodeURIComponent(title.toLowerCase().replace(/\s/, "-"))
								return (
									<li key={index}>
										<a href={`#${urlHash}`} onClick={(event) => updateSeries(index, event, title, urlHash)}>
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
