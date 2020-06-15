import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import Discovery from "../components/discovery"
import "../styles/article.css"

export default ({ data, pageContext }) => {
	const note = data.notes
	const body = note.body

	return (
		<Layout title={note.title} meta={{ desc: note.snippet, type: "article", category: note.silo, published: note.date, updated: note.updated, tags: note.tags }}>
			<main id="content" className="article h-entry">
				<header>
					<h1 className="article-header p-name">
						{note.title} | {note.attribution}
					</h1>
				</header>
				<article className="full-width">
					<ul className="article-details left-side">
						<li>Source</li>
						<li className="h-cite">
							<a className="u-url" href={note.source}>
								Link to Original{" "}
								<span role="img" title="Permalink to note" aria-label="Link icon">
									🔗
								</span>
							</a>
						</li>
						<li className="dt-published">Published</li>
						<li>{note.date}</li>
						<li>Categories</li>
						<li>
							{note.categories.map((category, index, array) =>
								index < array.length - 1 ? (
									<Link to={`/search/?query=&filter=${category}`} key={index}>
										{category},
									</Link>
								) : (
									<Link to={`/search/?query=&filter=${category}`} key={index}>
										{category}
									</Link>
								)
							)}
						</li>
						<li>Tags</li>
						<li>
							{note.tags.map((tag, index, array) =>
								index < array.length - 1 ? (
									<Link to={`/search/?query=${tag}`} key={index}>
										{tag},
									</Link>
								) : (
									<Link to={`/search/?query=${tag}`} key={index}>
										{tag}
									</Link>
								)
							)}
						</li>
					</ul>
					<div id="article-body" className="e-content" dangerouslySetInnerHTML={{ __html: body }} />
					<Discovery context={pageContext} title="Notes" url="note" />
				</article>
			</main>
		</Layout>
	)
}

export const query = graphql`
	query($slug: String!) {
		notes(slug: { eq: $slug }) {
			title
			body
			snippet
			silo
			categories
			tags
			date(formatString: "DD MMMM YYYY")
			updated(formatString: "DD MMMM YYYY")
			attribution
			source
		}
	}
`
