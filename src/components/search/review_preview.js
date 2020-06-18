import React from "react"
import { connectInfiniteHits } from "react-instantsearch-dom"

import Card from "../content_card"
import styles from "./search.module.css"

const CustomHitPreview = ({ hits, hasMore, refineNext }) => {
	return (
		<section className={styles.search_results}>
			{hits.map((hit) => {
				return <Card post={hit.node} type="review" search={true} hit={hit} key={hit.node.slug} />
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
