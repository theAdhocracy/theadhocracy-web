import React from "react"
import { Link } from "gatsby"
import { Highlight } from "react-instantsearch-dom"

import Rating from "../rating"
import "./content_card.css"

const ContentCard = ({ post, type, search, hit, articleUrl }) => {
	switch (type) {
		case "journal":
			return (
				<section className={"content-card"}>
					<header>
						<h2>{post.title}</h2>
					</header>
					<article dangerouslySetInnerHTML={{ __html: `${post.snippet}` }} />
					<footer>
						<Link to={`/wrote/${post.slug}`} className="card-button">
							<span role="img" aria-label="Book icon">
								📖
							</span>{" "}
							Read Entry
						</Link>
						<p className="card-button card-info">
							<span role="img" title="Date published" aria-label="Date published">
								📆
							</span>{" "}
							{post.date}
						</p>
					</footer>
				</section>
			)
		case "review":
			let groups = post.series ? post.series.map((series) => ({ ...series, url: `series\\${post.type}` })).concat(post.collections.map((collection) => ({ ...collection, url: "collection" }))) : post.collections ? post.collections.map((collection) => ({ ...collection, url: "collection" })) : []
			let url = articleUrl ? articleUrl : post.series && post.collections ? `/review/${post.type}/${post.slug}` : !post.series && post.collections ? `/review/series/${post.type}/${post.slug}` : `/review/collection/${post.slug}`
			return (
				<article className={"content-card"}>
					<header>
						{search ? (
							<h2>
								<Highlight attribute="node.title" hit={hit} />
							</h2>
						) : (
							<h2>{post.title}</h2>
						)}
					</header>
					{search ? (
						<p>
							<Highlight attribute="node.sanitised" hit={hit} />
						</p>
					) : (
						<div dangerouslySetInnerHTML={{ __html: `${post.desc}` }} />
					)}
					<footer>
						{post.rating ? (
							<p className="card-button card-info">
								<Rating value={post.rating} />
							</p>
						) : (
							<div></div>
						)}
						<Link to={url} className="card-button">
							<span role="img" aria-label="Book icon">
								📖
							</span>{" "}
							Read Entry
						</Link>
						{groups.length > 0 && (
							<>
								<p className="card-divider">
									<span>Series & Collections</span>
								</p>
								<ul className="flat-list">
									{groups.map((group) => (
										<Link to={`/review/${group.url}/${group.slug}`} className="card-button card-tag" key={`${group.url}_${group.slug}`}>
											<li>{group.title}</li>
										</Link>
									))}
								</ul>
							</>
						)}
					</footer>
				</article>
			)
		default:
			return (
				<section className={"content-card"}>
					<header>
						<h2>{post.title}</h2>
					</header>
					<article dangerouslySetInnerHTML={{ __html: `${post.snippet}` }} />
					<footer>
						<Link to={`/wrote/${post.slug}`} className="card-button">
							<span role="img" aria-label="Book icon">
								📖
							</span>{" "}
							Read Article
						</Link>
						<p className="card-button card-info">
							<span role="img" title="Date published" aria-label="Date published">
								📆
							</span>{" "}
							{post.date}
						</p>
						<p className="card-divider">
							<span>Categories</span>
						</p>
						<ul className="flat-list">
							{post.categories.map((category) => (
								<Link to={`/search/?query=&filter=${category}`} className="card-button card-tag">
									<li key={category}>{category}</li>
								</Link>
							))}
						</ul>
					</footer>
				</section>
			)
	}
}

export default ContentCard
