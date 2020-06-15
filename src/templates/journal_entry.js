import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import Discovery from "../components/discovery"
import "../styles/article.css"

export default ({ data, pageContext }) => {
	const post = data.journals
	const body = post.body.replace(/<sup>\[([0-9]*)\]<\/sup>/gi, '<sup id="index$1"><a href="#footnote$1" title="Jump to footnote.">[$1]</a></sup>')

	return (
		<Layout title={post.title} meta={{ desc: post.snippet, type: "article", category: post.silo, published: post.date, updated: post.updated, tags: post.tags }}>
			<main id="content" className="article h-entry">
				<header>
					<h1 className="article-header p-name">{post.title}</h1>
				</header>
				<article className="full-width">
					<ul className="article-details left-side">
						{post.updated && post.updated !== post.date ? (
							<>
								<li>Updated</li>
								<li className="dt-updated">{post.updated}</li>
							</>
						) : (
							""
						)}
						<li>Published</li>
						<li className="dt-published">{post.date}</li>
						<li>Tags</li>
						<li>
							{post.tags.map((tag, index, array) =>
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
					<Discovery context={pageContext} title="Journal Entries" url="wrote" />
					<section className="footnotes">
						{post.footnotes.length >= 1 ? <h2>Footnotes</h2> : null}
						{post.footnotes.map((footnote, index) => {
							let position = index + 1
							return <aside id={`footnote${position}`} dangerouslySetInnerHTML={{ __html: footnote.replace(/^<p>(.*)<\/p>$/gi, '<p>$1 <a class="footnote-return" href="#index' + position + '" title="Return to previous location in article.">⬆️</a></p>') }} key={index} />
						})}
					</section>
				</article>
			</main>
		</Layout>
	)
}

export const query = graphql`
	query($slug: String!) {
		journals(slug: { eq: $slug }) {
			title
			snippet
			body
			footnotes
			tags
			silo
			date(formatString: "DD MMMM YYYY")
			updated(formatString: "DD MMMM YYYY")
		}
	}
`
