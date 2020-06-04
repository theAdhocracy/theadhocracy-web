import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import Rating from "../components/rating"
import Review from "../components/review"
import "../styles/article.css"
import "../styles/reviews.css"

export default ({ data }) => {
	const [review, setReview] = useState()

	const series = data.series
	const tldr = series.desc.replace(/^<p>/, "<p><strong>tl;dr: </strong>")
	const reviews = series.reviews

	// Prevent link scroll, set state, and update URL
	function updateSeries(index, event, urlHash) {
		event.preventDefault()
		setReview(index)
		window.history.pushState(null, null, `#${urlHash}`)
		activeSeries(index)
	}

	// Add/remove active class from links to show which series is selected
	function activeSeries(index) {
		let navOptions = document.querySelectorAll(".series-nav > ul > li > a")
		navOptions.forEach((link) => link.classList.remove("active-series"))
		navOptions[index].classList.add("active-series")
	}

	// Initial render as dependency can never change (required for page to work w/o JS and sets initial state)
	useEffect(() => {
		if (reviews.length > 1) {
			let urlHash = window.location.hash
			if (urlHash) {
				// Decode URL hash, find match within critiques
				let slug = decodeURI(urlHash.replace(/^#/, ""))
				let reviewIndex = reviews.findIndex((obj) => obj["slug"] === slug)

				// Set initial state; defaults to 0 to account for typos or broken links
				reviewIndex >= 0 ? setReview(reviewIndex) : setReview(0)
				activeSeries(reviewIndex)
			} else {
				// Default to the first item in the array
				setReview(0)
				activeSeries(0)
			}
		}
	}, [reviews])

	return (
		<Layout title={series.title} article={true}>
			<main id="content" className="article h-entry">
				<header className="review-header">
					<h1 className="article-header p-name">{series.title}</h1>
					<Rating value={series.rating} />
					<p dangerouslySetInnerHTML={{ __html: tldr }} />
					{series.collections.length > 0 && (
						<>
							<h2>Collections</h2>
							<p className="collections">
								{series.collections.map((collection, index, array) => (
									<>
										<Link to={`/review/collection/${collection.slug}`} key={collection.slug}>
											{collection.title}
										</Link>
									</>
								))}
							</p>
						</>
					)}
				</header>
				{reviews.length > 1 && (
					<nav className="series-nav">
						<ul>
							{reviews.map((review, index) => {
								let title = review.title ? review.title : "Title"
								return (
									<li key={review.slug}>
										<a href={`#${review.slug}`} onClick={(event) => updateSeries(index, event, review.slug)}>
											{title}
										</a>
									</li>
								)
							})}
						</ul>
					</nav>
				)}
				{review >= 0 ? <Review review={reviews[review].critiques[0]} title={reviews[review].title} slug={reviews[review].slug} /> : reviews.map((review) => review.critiques.map((critique, index) => <Review review={critique} key={review.slug} title={review.title} slug={review.slug} />))}
			</main>
		</Layout>
	)
}

export const query = graphql`
	query($slug: String!) {
		series(slug: { eq: $slug }) {
			title
			desc
			type
			rating
			collections {
				slug
				title
			}
			reviews {
				date
				desc
				rating
				slug
				title
				critiques {
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
			}
		}
	}
`
