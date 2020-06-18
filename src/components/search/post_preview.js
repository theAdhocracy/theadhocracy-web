import React from "react"
import { Link } from "gatsby"
import { Highlight, connectInfiniteHits } from "react-instantsearch-dom"

import styles from "./search.module.css"

const CustomHitPreview = ({ hits, hasPrevious, refinePrevious, hasMore, refineNext }) => {
	return (
		<section className={styles.search_results}>
			{hits.map((hit, index) => {
				let searchResult = hit.node
				let type = searchResult.contentType.substring(0, searchResult.contentType.length - 1)
				let url = searchResult.contentType === "articles" ? "wrote" : searchResult.contentType === "journals" ? "wrote" : "note"
				return (
					<article className="content-card" key={index}>
						<h2>
							<Highlight attribute="node.title" hit={hit} />
						</h2>
						<p>
							<Highlight attribute="node.sanitised" hit={hit} />
						</p>
						<footer>
							<Link to={`/${url}/${searchResult.slug}`} className="card-button">
								<span role="img" aria-label="Book icon">
									📖
								</span>{" "}
								Read {type}
							</Link>
							<p className="card-button card-info">
								<span role="img" title="Date published" aria-label="Date published">
									📆
								</span>{" "}
								{searchResult.month.slice(0, 3)} {searchResult.year}
							</p>
							<p className="card-divider">
								<span>Categories</span>
							</p>
							<ul className="flat-list">
								{searchResult.categories.map((category, index) => (
									<Link to={`/search/?query=&filter=${category}`} className="card-button card-tag">
										<li key={category}>{category}</li>
									</Link>
								))}
							</ul>
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

export const PostPreview = connectInfiniteHits(CustomHitPreview)
