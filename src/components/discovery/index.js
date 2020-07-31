import React from "react"
import { Link } from "gatsby"

import styles from "./discovery.module.css"

const Discovery = ({ context, title, url }) => {
	// Determine if note or article
	const type = url === "note" ? "Note" : "Article"

	return (
		<section className={styles.discovery}>
			<h2>Explore Other {title}</h2>
			{context.next && (
				<>
					<article>
						<header>
							<p>
								<span role="img" aria-label="Left arrow">
									⬅
								</span>{" "}
								Newer
							</p>
						</header>
						<Link to={`/${url}/${context.next.slug}`}>
							<h3>{context.next.title}</h3>
						</Link>
						<div dangerouslySetInnerHTML={{ __html: context.next.desc }} />
						<footer>
							<Link to={`/${url}/${context.next.slug}`} className={styles.discovery_button}>
								<span role="img" aria-label="Book icon">
									📖
								</span>{" "}
								Read {type}
							</Link>
						</footer>
					</article>
				</>
			)}
			{context.prev && (
				<>
					<article className={styles.older}>
						<header>
							<p>
								Older{" "}
								<span role="img" aria-label="Right arrow">
									➡
								</span>
							</p>
						</header>
						<Link to={`/${url}/${context.prev.slug}`}>
							<h3>{context.prev.title}</h3>
						</Link>
						<div dangerouslySetInnerHTML={{ __html: context.prev.desc }} />
						<footer>
							<Link to={`/${url}/${context.prev.slug}`} className={styles.discovery_button}>
								<span role="img" aria-label="Book icon">
									📖
								</span>{" "}
								Read {type}
							</Link>
						</footer>
					</article>
				</>
			)}
		</section>
	)
}

export default Discovery
