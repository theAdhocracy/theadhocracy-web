import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import Discovery from "../components/discovery"
import "../styles/article.css"

export default ({ data, pageContext }) => {
	const post = data.article
	const body = post.body.replace(/<sup>\[([0-9]*)\]<\/sup>/gi, '<sup id="index$1"><a href="#footnote$1" title="Jump to footnote.">[$1]</a></sup>')
	const resources = post.resources[0].title ? post.resources : false
	return (
		<Layout title={post.title} article={true}>
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
						<li>Categories</li>
						<li>{post.categories.map((category, index, array) => (index < array.length - 1 ? <Link to={`/search/?query=&filter=${category}`}>{category},</Link> : <Link to={`/search/?query=&filter=${category}`}>{category}</Link>))}</li>
						<li>Tags</li>
						<li>{post.tags.map((tag, index, array) => (index < array.length - 1 ? <Link to={`/search/?query=${tag}`}>{tag},</Link> : <Link to={`/search/?query=${tag}`}>{tag}</Link>))}</li>
					</ul>
					<div id="article-body" className="e-content" dangerouslySetInnerHTML={{ __html: body }} />
					<Discovery context={pageContext} title="Articles" url="wrote" />
					{resources && (
						<>
							<section className="resources">
								<h2>Further Reading & Sources</h2>
								<ul>
									{post.resources.map((item) => {
										return (
											<li>
												<a href={item.url}>{item.title}</a>
											</li>
										)
									})}
								</ul>
							</section>
						</>
					)}
					<section className="footnotes">
						{post.footnotes.length >= 1 ? <h2>Footnotes</h2> : null}
						{post.footnotes.map((footnote, index) => {
							let position = index + 1
							// Regex explanation: search for any </li> OR </p> that is NOT followed by any further instance of </li> or </p> i.e. find the last closing tag. The [^] tells it to ignore whitespace/linebreaks when searching ahead i.e. multi paragraph. The first OR is in brackets so that the rendered closing tag is of the correct sort i.e. $1
							return <aside id={`footnote${position}`} key={index} dangerouslySetInnerHTML={{ __html: footnote.replace(/<\/(li|p)>(?![^]*<\/(li|p)>)/im, ' <a class="footnote-return" href="#index' + position + '" title="Return to previous location in article.">⬆️</a></$1>') }} />
						})}
					</section>
				</article>
			</main>
		</Layout>
	)
}

export const query = graphql`
	query($slug: String!) {
		article(slug: { eq: $slug }) {
			title
			body
			footnotes
			categories
			resources {
				title
				url
			}
			tags
			date(formatString: "DD MMMM YYYY")
			updated(formatString: "DD MMMM YYYY")
		}
	}
`
