/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	siteMetadata: {
		title: `theAdhocracy`,
		description: `Ad hoc thoughts from an ad hoc mind.`,
		siteUrl: `https://theadhocracy.co.uk/`,
		siteImage: `static/favicon.svg`,
		twitterHandle: `@theAdhocracy`,
		version: `3.2.4`
	},
	plugins: [
		{
			resolve: `gatsby-plugin-react-helmet`
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
						serialize: ({ query: { site, allPosts } }) => {
							return allPosts.edges.map((edge) => {
								return Object.assign({}, edge.node.title, {
									title: edge.node.title,
									description: edge.node.snippet,
									date: edge.node.date,
									url: site.siteMetadata.siteUrl + "articles/" + edge.node.slug,
									guid: site.siteMetadata.siteUrl + "articles/" + edge.node.slug
								})
							})
						},
						query: `
						{
							allPosts {
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
						output: "/rss.xml",
						title: "theAdhocracy RSS Feed: All Posts"
					},
					{
						serialize: ({ query: { site, allArticle } }) => {
							return allArticle.edges.map((edge) => {
								return Object.assign({}, edge.node.title, {
									title: edge.node.title,
									description: edge.node.snippet,
									date: edge.node.date,
									url: site.siteMetadata.siteUrl + "/articles/" + edge.node.slug,
									guid: site.siteMetadata.siteUrl + "/articles/" + edge.node.slug
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
						title: "theAdhocracy RSS Feed: Articles Only",
						match: `^.*/article/`
					},
					{
						serialize: ({ query: { site, allJournals } }) => {
							return allJournals.edges.map((edge) => {
								return Object.assign({}, edge.node.title, {
									title: edge.node.title,
									description: edge.node.snippet,
									date: edge.node.date,
									url: site.siteMetadata.siteUrl + "/journal/" + edge.node.year + "/" + edge.node.month + "/" + edge.node.slug,
									guid: site.siteMetadata.siteUrl + "/journal/" + edge.node.year + "/" + edge.node.month + "/" + edge.node.slug
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
						title: "theAdhocracy RSS Feed: Journal Only",
						match: `^.*/journals/`
					},
					{
						serialize: ({ query: { site, allNotes } }) => {
							return allNotes.edges.map((edge) => {
								return Object.assign({}, edge.node.title, {
									title: edge.node.title,
									description: edge.node.snippet,
									date: edge.node.date,
									url: site.siteMetadata.siteUrl + "/notes/" + edge.node.slug,
									guid: site.siteMetadata.siteUrl + "/notes/" + edge.node.slug
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
						title: "theAdhocracy RSS Feed: Notes Only",
						match: `^.*/notes/`
					}
				]
			}
		}
	]
}
