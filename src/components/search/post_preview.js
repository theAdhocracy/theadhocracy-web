import React from "react"
import { Link } from "gatsby"
import { Highlight, connectHits } from "react-instantsearch-dom"

import styles from "./search.module.css"

const CustomHitPreview = ({ hits }) => {
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
							<Link to={`/${url}/${searchResult.slug}`}>
								<span role="img" aria-label="Book icon">
									📖
								</span>{" "}
								Read {type}
							</Link>
							<p>
								<span role="img" title="Date published" aria-label="Date published">
									📆
								</span>{" "}
								{searchResult.month.slice(0, 3)} {searchResult.year}
							</p>
							<p>
								<span>Categories</span>
							</p>
							<ul className="flat-list">
								{searchResult.categories.map((category, index) => (
									<li key={index}>{category}</li>
								))}
							</ul>
						</footer>
					</article>
				)
			})}
		</section>
	)
}

export const PostPreview = connectHits(CustomHitPreview)
