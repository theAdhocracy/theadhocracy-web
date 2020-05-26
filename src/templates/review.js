import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import "../styles/article.css"

export default ({ data }) => {
	const review = data.reviews
	const mainReview = review.critiques[0]
	console.log(mainReview)
	return (
		<Layout title={review.title} article={true}>
			<main id="content" className="article h-entry">
				<header>
					<h1 className="article-header p-name">{review.title}</h1>
					<span role="img" aria-label={`Rated ${review.rating} out of 5`}>
						{"⭐".repeat(review.rating)}
					</span>
					<div dangerouslySetInnerHTML={{ __html: review.desc }} />
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
				<article className="full-width">
					<h2>Review</h2>
					<aside>
						{mainReview.rewatchList.length > 0 && <span>#1</span>}
						<span>{mainReview.date}</span>
						<span role="img" aria-label={`Initially rated ${mainReview.rating} out of 5`}>
							{"⭐".repeat(mainReview.rating)}
						</span>
						{mainReview.location && <span>{mainReview.location}</span>}
					</aside>
					<div id="article-body" className="e-content" dangerouslySetInnerHTML={{ __html: mainReview.copy }} />
					{mainReview.rewatchList.map((rewatch, index) => {
						return (
							<section key={index}>
								<h3>Rewatch</h3>
								<aside>
									<span>#{index + 2}</span>
									<span>{rewatch.date}</span>
									<span role="img" aria-label={`Rewatch rated ${rewatch.rating} out of 5`}>
										{"⭐".repeat(rewatch.rating)}
									</span>
									{rewatch.location && <span>{rewatch.location}</span>}
								</aside>
								<div id="article-body" className="e-content" dangerouslySetInnerHTML={{ __html: rewatch.copy }} />
							</section>
						)
					})}
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
