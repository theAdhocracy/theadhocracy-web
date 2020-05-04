import React from "react"
import { Link } from "gatsby"
import { Highlight } from "react-instantsearch-dom"

const HitPreview = ({ hit }) => {
	const searchResult = hit.node
	const type = searchResult.contentType.substring(0, searchResult.contentType.length - 1)
	const url = searchResult.contentType === "articles" ? "article" : searchResult.contentType === "journals" ? `journal/${searchResult.year}/${searchResult.month.toLowerCase()}` : searchResult.contentType
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
}

export default HitPreview
