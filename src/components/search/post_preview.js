import React from "react"
import { Link } from "gatsby"
import { Highlight, connectHits } from "react-instantsearch-dom"

import styles from "./search.module.css"

const CustomHitPreview = ({ hits }) => {
	return (
		<section className={styles.search_results}>
			{hits.map((hit) => {
				let searchResult = hit.node
				let type = searchResult.contentType.substring(0, searchResult.contentType.length - 1)
				let url = searchResult.contentType === "articles" ? "article" : searchResult.contentType === "journals" ? `journal/${searchResult.year}/${searchResult.month.toLowerCase()}` : searchResult.contentType
				return (
					<article>
						<h2>
							<Highlight attribute="node.title" hit={hit} />
						</h2>
						<p>
							<Highlight attribute="node.sanitised" hit={hit} />
						</p>
						<p>
							<Link to={`${url}/${searchResult.slug}`}>Read the full {type}.</Link> Date posted: {searchResult.month} {searchResult.year}
						</p>
					</article>
				)
			})}
		</section>
	)
}

export const PostPreview = connectHits(CustomHitPreview)
