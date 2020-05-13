import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import Card from "../components/content_card"

const IndexPage = ({ data }) => {
	return (
		<Layout title="theAdhocracy" sidebar={false}>
			<section id="about" className="h-card">
				<a className="u-url u-uid" href="https://theadhocracy.co.uk" rel="me">
					<img className={"profile_photo u-photo"} src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/profile-photo-square.jpg" alt="Murray Adcock (site owner) wearing shades and raising a single eyebrow." />
				</a>
				<h1>oh hi!</h1>
				<p>
					I'm afraid you've stumbled into the personal playground of <span className="p-name">Murray Adcock.</span>
				</p>
				<p className="p-note">Ad hoc thoughts from an ad hoc mind!</p>
			</section>
			<section id="content">
				<header>
					<h1>What I'm Up To</h1>
				</header>
				<main className="content-grid">
					{/* TODO: Add Notes back onto homepage but in a more simplified manner */}
					{data.allPosts.nodes.map((node, index) => (
						<Card key={index} post={node} type={node.contentType === "journals" ? "journal" : ""} />
					))}
					<a href="/articles/">Explore?</a>
				</main>
			</section>
		</Layout>
	)
}

export default IndexPage

export const query = graphql`
	query LatestPostsQuery {
		allPosts {
			nodes {
				title
				slug
				snippet
				categories
				tags
				date(formatString: "DD MMM YYYY")
				month
				year
				contentType
			}
		}
	}
`

// <!doctype html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8">
//     <title>theAdhocracy</title>
//     <meta name="description" content="theAdhocracy">
//     <meta name="author" content="Murray Adcock">
//     <link rel="stylesheet" href="css/adhoc.css?v=1.0">
//     <script src="functions.js"></script>
//   </head>
