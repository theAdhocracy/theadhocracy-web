import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import Discovery from "../components/discovery"
import RelatedContent from "../components/related_content"
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
						<li>
							<a className="u-bookmark-of" href={note.source}>
								Link to Original{" "}
								<span role="img" title="Permalink to note" aria-label="Link icon">
									🔗
								</span>
							</a>
						</li>
						<li>Published</li>
						<li>
							<time className="dt-published" dateTime={new Date(`${note.date} 12:00 GMT`).toISOString()}>
								{note.date}
							</time>
						</li>
						<li>Categories</li>
						<li>
							{note.categories.map((category, index, array) =>
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
							{note.tags.map((tag, index, array) =>
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
					<RelatedContent webmentions={data.allWebMentionEntry.nodes} />
					<Discovery context={pageContext} title="Notes" url="note" />
					<section className="microformats">
						<ul>
							<li className="p-summary">{note.snippet}</li>
							<li>
								<time className="dt-updated" dateTime={new Date(`${note.updated} 12:00 GMT`).toISOString()}>
									{note.updated}
								</time>
							</li>
							<li className="h-card">
								<a rel="author" className="p-name p-author u-url" href={data.site.siteMetadata.siteUrl}>
									{data.site.siteMetadata.author}
								</a>
								<img className="u-photo" src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/murray-headshot-square.jpg" alt="Murray Adcock." />
							</li>
						</ul>
						<a className="u-url" href={`${data.site.siteMetadata.siteUrl}/note/${note.slug}`}>
							Journal permalink
						</a>
					</section>
				</article>
			</main>
		</Layout>
	)
}

export const query = graphql`
	query($slug: String!, $url: String!) {
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
				id
				wmTarget
				wmSource
				wmProperty
				wmReceived
				type
				url
				likeOf
				author {
					url
					photo
					name
				}
				published
				content {
					text
					html
				}
				summary {
					value
				}
			}
		}
	}
`
