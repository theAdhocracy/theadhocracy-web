import React from "react"
import { Link } from "gatsby"
import { Highlight, connectInfiniteHits } from "react-instantsearch-dom"

import Rating from "../rating"
import styles from "./search.module.css"

const CustomHitPreview = ({ hits, hasMore, refineNext }) => {
	return (
		<section className={styles.search_results}>
			{hits.map((hit) => {
				let searchResult = hit.node
				let groups = searchResult.series.map((series) => ({ ...series, url: `series\\${searchResult.type}` })).concat(searchResult.collections.map((collection) => ({ ...collection, url: "collection" })))
				return (
					<article className={`content-card`}>
						<h2>
							<Highlight attribute="node.title" hit={hit} />
						</h2>
						<p>
							<Highlight attribute="node.sanitised" hit={hit} />
						</p>
						<footer>
							<p className="card-button card-info">
								<Rating value={searchResult.rating} />
							</p>
							<Link to={`/review/${searchResult.type}/${searchResult.slug}`} className="card-button">
								<span role="img" aria-label="Book icon">
									📖
								</span>{" "}
								Read Entry
							</Link>
							{groups.length && (
								<>
									<p className="card-divider">
										<span>Series & Collections</span>
									</p>
									<ul className="flat-list">
										{groups.map((group) => (
											<Link to={`/review/${group.url}/${group.slug}`} className="card-button card-tag">
												<li key={group}>{group.title}</li>
											</Link>
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
