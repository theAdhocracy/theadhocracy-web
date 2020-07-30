import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import Conversation from "../components/conversation"
import Discovery from "../components/discovery"
import "../styles/article.css"

export default ({ data, pageContext }) => {
	const post = data.article
	const body = post.body.replace(/<sup>\[([0-9]*)\]<\/sup>/gi, '<sup id="index$1"><a href="#footnote$1" title="Jump to footnote.">[$1]</a></sup>')
	const resources = post.resources ? (post.resources[0].title ? post.resources : false) : false
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
								<li>
									<time className="dt-updated" dateTime={new Date(`${post.updated} 12:00 GMT`).toISOString()}>
										{post.updated}
									</time>
								</li>
							</>
						) : (
							""
						)}
						<li>Published</li>
						<li>
							<time className="dt-published" dateTime={new Date(`${post.date} 12:00 GMT`).toISOString()}>
								{post.date}
							</time>
						</li>
						<li>Categories</li>
						<li>
							{post.categories.map((category, index, array) =>
								index < array.length - 1 ? (
									<Link to={`/search/?query=&filter=${category}`} key={index} className="p-category">
										{category},
									</Link>
								) : (
									<Link to={`/search/?query=&filter=${category}`} key={index} className="p-category">
										{category}
									</Link>
								)
							)}
						</li>
						<li>Tags</li>
						<li>
							{post.tags.map((tag, index, array) =>
								index < array.length - 1 ? (
									<Link to={`/search/?query=${tag}`} key={index} className="p-category">
										{tag},
									</Link>
								) : (
									<Link to={`/search/?query=${tag}`} key={index} className="p-category">
										{tag}
									</Link>
								)
							)}
						</li>
					</ul>
					<div id="article-body" className="e-content" dangerouslySetInnerHTML={{ __html: body }} />
					<Discovery context={pageContext} title="Articles" url="wrote" />
					{resources && (
						<>
							<section className="resources">
								<h2>Further Reading & Sources</h2>
								<ul>
									{post.resources.map((item, index) => {
										return (
											<li key={index}>
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
					<Conversation webmentions={data.allWebMentionEntry.nodes} />
					<section className="microformats">
						<ul>
							<li className="p-summary">{post.snippet}</li>
						</ul>
						<a rel="author" className="p-author h-card" href={data.site.siteMetadata.siteUrl}>
							{data.site.siteMetadata.author}
						</a>
						<img className="u-photo" src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/murray-headshot-square.jpg" alt="Murray Adcock." />
						<a className="u-url" href={`${data.site.siteMetadata.siteUrl}/wrote/${post.slug}`}>
							Article permalink
						</a>
					</section>
				</article>
			</main>
		</Layout>
	)
}

export const query = graphql`
	query($slug: String!, $url: String!) {
		article(slug: { eq: $slug }) {
			title
			snippet
			body
			footnotes
			categories
			silo
			resources {
				title
				url
			}
			tags
			date(formatString: "DD MMMM YYYY")
			updated(formatString: "DD MMMM YYYY")
			slug
		}
		site {
			siteMetadata {
				author
				siteUrl
			}
		}
		allWebMentionEntry(filter: { wmTarget: { eq: $url } }) {
			nodes {
				wmTarget
				wmSource
				wmProperty
				wmId
				type
				url
				likeOf
				author {
					url
					type
					photo
					name
				}
				content {
					text
				}
			}
		}
	}
`
