import React from "react"
import { Link } from "gatsby"

import styled from "styled-components/macro"

const Wrapper = styled.section`
	max-width: var(--main);
	margin-bottom: 2rem;

	h2 + p {
		margin-top: 0;
	}

	section {
		display: grid;
		grid-template-columns: 2rem 1fr;
		gap: 0.7rem;
		margin-top: 1rem;
		padding: 1rem;
		background-color: var(--lightgrey);
		border-radius: 10px;
	}

	header {
		margin: 0;
		display: flex;
		flex-wrap: wrap;
	}

	h2 {
		margin-bottom: 0;
	}

	h3 {
		margin: 0;
	}

	time {
		margin: 0;
		color: var(--green);
		font-size: 0.9rem;
	}

	h2 + p {
		margin: 0;
		font-style: italic;
		font-size: 0.95rem;
	}

	section header a {
		width: 100%;
		margin: 0;
		text-decoration: none;
		text-transform: capitalize;
	}

	header + p {
		grid-column: 1 / -1;
		margin: 0;
		padding: 0 0.5rem;
	}

	a.read_more,
	a.read_more:visited,
	a.read_more:hover,
	a.read_more:active {
		grid-column: 2 / -1;
		justify-self: end;
		height: 100%;
		width: max-content;
		margin: 0 1rem;
		background-color: var(--lightgrey);
		border: 2px solid var(--lightgrey);
		border-radius: 10px;
		font-style: normal;
		text-align: center;
		text-decoration: none;
		line-height: 1.6em;
		padding: 0 0.5rem;
	}

	a.read_more:hover span span,
	a.read_more:focus span span {
		color: var(--green);
		-webkit-text-fill-color: var(--green);
	}
`

const RelatedContent = ({ webmentions }) => {
	// Extract self-links from webmentions
	const related = webmentions.filter((mention) => mention.wmSource.includes("theadhocracy.co.uk"))

	return (
		<>
			{related.length > 0 && (
				<Wrapper>
					<h2>Related Content</h2>
					<p>Other articles and notes that cross-link here.</p>
					{related.map((mention) => {
						// Date and time
						const date = new Date(mention.published).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })

						// Extract post content from URL
						const title = mention.wmSource.replace(/^[https:]*\/\/[^/]*\/[^/]*\/([^/]*)/i, "$1").replace(/-/g, " ")
						const type = mention.wmSource.replace(/^[https:]*\/\/[^/]*\/([^/]*)\/[^/]*/i, "$1")

						return (
							<section>
								<p>
									<span role="img" aria-label={type}>
										{type === "note" ? "🔖" : "📜"}
									</span>
								</p>
								<header>
									<Link href={mention.wmSource}>
										<h3>{title}</h3>
									</Link>
									<time dateTime={mention.published}>{date}</time>
								</header>
								<p dangerouslySetInnerHTML={{ __html: mention.summary.value }} />
								<Link to={mention.wmSource} className="read_more">
									<span role="img" aria-label="Read content.">
										<span>➡</span> 📖
									</span>{" "}
								</Link>
							</section>
						)
					})}
				</Wrapper>
			)}
		</>
	)
}

export default RelatedContent
