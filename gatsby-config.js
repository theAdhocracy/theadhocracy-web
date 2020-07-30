/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const queries = require("./src/utilities/algolia")

require("dotenv").config()

module.exports = {
	siteMetadata: {
		title: `theAdhocracy`,
		description: `Ad hoc thoughts from an ad hoc mind.`,
		author: `Murray Adcock`,
		siteUrl: `https://theadhocracy.co.uk`,
		siteImage: `https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Logos/adhoc-face.svg`,
		twitterHandle: `@theAdhocracy`,
		version: `3.5.0`
	},
	plugins: [
		{
			resolve: `gatsby-plugin-react-helmet`
		},
		{
			resolve: `gatsby-plugin-sitemap`
		},
		{
			resolve: `gatsby-plugin-robots-txt`
		},
		{
			resolve: `gatsby-plugin-algolia`,
			options: {
				appId: process.env.GATSBY_ALGOLIA_APP_ID,
				apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
				queries,
				chunkSize: 10000
			}
		},
		{
			resolve: `gatsby-plugin-webmention`,
			options: {
				username: "theadhocracy.co.uk", // webmention.io username
				identity: {
					github: "theAdhocracy",
					twitter: "theAdhocracy" // no @
				},
				mentions: true,
				pingbacks: true,
				domain: "theadhocracy.co.uk",
				token: process.env.GATSBY_WEBMENTION_TOKEN
			}
		},
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
					{
						site {
							siteMetadata {
								title
								description
								siteUrl
								site_url: siteUrl
							}
						}
					}
				`,
				feeds: [
					{
						serialize: ({ query: { site, allFeed } }) => {
							return allFeed.edges.map((edge) => {
								let urlSwitch = edge.node.contentType === "notes" ? "note" : "wrote"
								return Object.assign({}, edge.node.title, {
									title: edge.node.title,
									description: edge.node.snippet,
									date: edge.node.date,
									url: site.siteMetadata.siteUrl + "/" + urlSwitch + "/" + edge.node.slug,
									guid: edge.node.slug
								})
							})
						},
						query: `
						{
							allFeed {
								edges {
									node {
										title
										slug
										snippet
										contentType
										date(formatString: "DD MMM YYYY")
									}
								}
							}
						}
						`,
						output: "/rss.xml",
						title: "theAdhocracy | RSS"
					},
					{
						serialize: ({ query: { site, allArticle } }) => {
							return allArticle.edges.map((edge) => {
								return Object.assign({}, edge.node.title, {
									title: edge.node.title,
									description: edge.node.snippet,
									date: edge.node.date,
									url: site.siteMetadata.siteUrl + "/wrote/" + edge.node.slug,
									guid: edge.node.slug
								})
							})
						},
						query: `
							{
								allArticle {
									edges {
										node {
											title
											slug
											snippet
											date(formatString: "DD MMM YYYY")
										}
									}
								}
							}
						`,
						output: "/rss-articles.xml",
						title: "theAdhocracy | Articles",
						match: `^.*/wrote/`
					},
					{
						serialize: ({ query: { site, allJournals } }) => {
							return allJournals.edges.map((edge) => {
								return Object.assign({}, edge.node.title, {
									title: edge.node.title,
									description: edge.node.snippet,
									date: edge.node.date,
									url: site.siteMetadata.siteUrl + "/wrote/" + edge.node.slug,
									guid: edge.node.slug
								})
							})
						},
						query: `
							{
								allJournals {
									edges {
										node {
											title
											slug
											snippet
											date(formatString: "DD MMM YYYY")
											year
											month
										}
									}
								}
							}
						`,
						output: "/rss-journal.xml",
						title: "theAdhocracy | Journal",
						match: `^.*/wrote/`
					},
					{
						serialize: ({ query: { site, allNotes } }) => {
							return allNotes.edges.map((edge) => {
								return Object.assign({}, edge.node.title, {
									title: edge.node.title,
									description: edge.node.snippet,
									date: edge.node.date,
									url: site.siteMetadata.siteUrl + "/note/" + edge.node.slug,
									guid: edge.node.slug
								})
							})
						},
						query: `
							{
								allNotes {
									edges {
										node {
											title
											slug
											snippet
											date(formatString: "DD MMM YYYY")
										}
									}
								}
							}
						`,
						output: "/rss-notes.xml",
						title: "theAdhocracy | Notes",
						match: `^.*/note/`
					},
					{
						serialize: ({ query: { site, allReviews } }) => {
							return allReviews.edges.map((edge) => {
								return Object.assign({}, edge.node.title, {
									title: edge.node.title,
									description: edge.node.sanitised,
									date: edge.node.updated,
									url: site.siteMetadata.siteUrl + "/review/" + edge.node.type + "/" + edge.node.slug,
									guid: edge.node.slug
								})
							})
						},
						query: `
							{
								allReviews(sort: { fields: [latestReview, updated], order: [DESC, DESC] }) {
									edges {
										node {
											title
											slug
											type
											sanitised
											updated(formatString: "DD MMM YYYY")
										}
									}
								}
							}
						`,
						output: "/rss-reviews.xml",
						title: "theAdhocracy | Reviews"
					}
				]
			}
		}
	]
}
