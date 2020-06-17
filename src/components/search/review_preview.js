import React from "react"
import { Link } from "gatsby"
import { Highlight, connectInfiniteHits } from "react-instantsearch-dom"

import Rating from "../rating"
import styles from "./search.module.css"

const CustomHitPreview = ({ hits, hasPrevious, refinePrevious, hasMore, refineNext }) => {
	return (
		<section className={styles.search_results}>
			{hits.map((hit, index) => {
				let searchResult = hit.node
				let groups = searchResult.series.concat(searchResult.collections)
				let type = "film"
				let url = searchResult.contentType === "articles" ? "wrote" : searchResult.contentType === "journals" ? "wrote" : "note"
				return (
					<article className={`content-card journal-card ${styles.search_card}`}>
						<h2>
							<Highlight attribute="node.title" hit={hit} />
						</h2>
						<p>
							<Highlight attribute="node.sanitised" hit={hit} />
						</p>
						<footer>
							<p>
								<Rating value={searchResult.rating} />
							</p>
							<Link to={`/review/${searchResult.type}/${searchResult.slug}`}>
								<span role="img" aria-label="Book icon">
									📖
								</span>{" "}
								Read Entry
							</Link>
							{groups.length && (
								<>
									<p>
										<span>Series & Collections</span>
									</p>
									<ul className="flat-list">
										{groups.map((group) => (
											<li key={group}>{group.title}</li>
										))}
									</ul>
								</>
							)}
						</footer>
					</article>
				)
			})}
			{hasMore && (
				<footer>
					<button disabled={!hasMore} onClick={refineNext}>
						Show more results
					</button>
				</footer>
			)}
		</section>
	)
}

export const ReviewPreview = connectInfiniteHits(CustomHitPreview)
