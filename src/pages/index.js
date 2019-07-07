import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import Card from "../components/content_card"

const IndexPage = ({ data }) => {
    return (
        <Layout title="theAdhocracy" sidebar={true}>
            <section id="about">
                <img className={"profile_photo"} src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/profile-photo-square.jpg" alt="Murray Adcock (site owner) wearing shades and raising a single eyebrow." />
                <h1>oh hi!</h1>
                <p>I'm afraid you've stumbled into the personal playground of Murray Adcock.</p>
                <p>Ad hoc thoughts from an ad hoc mind!</p>
            </section>
            <section id="content">
                <header>
                    <h1>What I'm Up To</h1>
                </header>
                <noscript>
                    <p><strong>JavaScript is Disabled - Cannot Load Latest Posts</strong></p>
                    <p>Sorry, I realise this is a bit rough, but currently articles on theAdhocracy only work with JavaScript. It's something I'm actively looking to address in the future, but right now I'm struggling to find a solution.</p>
                    <p>If you're interested, the reason for the requirement is because the site is hosted on <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">Netlify</a> but dynamically loads content in from a <a href="https://craftcms.com/" target="_blank" rel="noopener noreferrer">Craft CMS</a> instance on an old-school webserver. That leaves me with a choice: client-side content rendering (aka JavaScript) or forcing a rebuild of the whole site for every edit. Neither seem particularly viable, so right now I've chosen JavaScript.</p>
                    <p>If you have any ideas or suggestions, I'm always happy to hear them. Feel free to DM or @ me on Twitter <a href="https://twitter.com/theadhocracy" target="_blank" rel="noopener noreferrer">@theAdhocracy</a> with your thoughts 👍</p>
                </noscript>
                <main className="content-grid">
                    {data.allPosts.edges.map(({ node }) => (
                        <Card post={node} />
                    ))}
                </main>
            </section>
        </Layout>
    )
}

export default IndexPage

export const query = graphql`
	query LatestPostsQuery {
		allPosts {
			edges {
				node {
					title
					slug
					snippet
					categories
					tags
				}
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
