import React from "react"
import { Link } from "gatsby"

import Rating from "../rating"
import "./content_card.css"

const ContentCard = ({ post, type }) => {
	switch (type) {
		case "journal":
			return (
				<section className={"content-card journal-card"}>
					<header>
						<h2>{post.title}</h2>
					</header>
					<article dangerouslySetInnerHTML={{ __html: `${post.snippet}` }} />
					<footer>
						<Link to={`/wrote/${post.slug}`}>
							<span role="img" aria-label="Book icon">
								📖
							</span>{" "}
							Read Entry
						</Link>
						<p>
							<span role="img" title="Date published" aria-label="Date published">
								📆
							</span>{" "}
							{post.date}
						</p>
					</footer>
				</section>
			)
		case "review":
			return (
				<section className={"content-card journal-card"}>
					<header>
						<h2>{post.title}</h2>
					</header>
					<article dangerouslySetInnerHTML={{ __html: `${post.desc}` }} />
					<footer>
						<p>
							<Rating value={post.rating} />
						</p>
						<Link to={`/review/${post.type ? post.type.toLowerCase() : "film"}/${post.slug}`}>
							<span role="img" aria-label="Book icon">
								📖
							</span>{" "}
							Read Entry
						</Link>
					</footer>
				</section>
			)
		default:
			return (
				<section className={"content-card"}>
					<header>
						<h2>{post.title}</h2>
					</header>
					<article dangerouslySetInnerHTML={{ __html: `${post.snippet}` }} />
					<footer>
						<Link to={`/wrote/${post.slug}`}>
							<span role="img" aria-label="Book icon">
								📖
							</span>{" "}
							Read Article
						</Link>
						<p>
							<span role="img" title="Date published" aria-label="Date published">
								📆
							</span>{" "}
							{post.date}
						</p>
						<p>
							<span>Categories</span>
						</p>
						<ul className="flat-list">
							{post.categories.map((category, index) => (
								<li key={index}>{category}</li>
							))}
						</ul>
					</footer>
				</section>
			)
	}
}

export default ContentCard
