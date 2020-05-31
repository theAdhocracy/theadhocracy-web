import React from "react"

import Rating from "../rating"
import styles from "./review.module.css"

const Review = ({ review }) => {
	return (
		<article className={`full-width ${styles.review}`}>
			{review.title ? <h2 id={review.title.toLowerCase()}>{review.title}</h2> : <h2>Review</h2>}
			<aside>
				{review.rewatchList.length > 0 && <span>#1</span>}
				<span>{review.date}</span>
				<Rating value={review.rating} />
				{review.location && <span>{review.location}</span>}
			</aside>
			<div id="article-body" className="e-content" dangerouslySetInnerHTML={{ __html: review.copy }} />
			{review.rewatchList.map((rewatch, index) => {
				return (
					<section key={index}>
						<h3>Rewatch</h3>
						<aside>
							<span>#{index + 2}</span>
							<span>{rewatch.date}</span>
							<Rating value={rewatch.rating} />
							{rewatch.location && <span>{rewatch.location}</span>}
						</aside>
						<div id="article-body" className="e-content" dangerouslySetInnerHTML={{ __html: rewatch.copy }} />
					</section>
				)
			})}
		</article>
	)
}

export default Review
