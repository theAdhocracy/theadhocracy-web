const axios = require("axios")
const crypto = require("crypto")
const path = require(`path`)

// ******* API NODES

exports.sourceNodes = async ({ actions }) => {
	const { createNode } = actions

	// Fetch data from the input API endpoint
	const fetchPosts = () => axios.get(`https://cms.theadhocracy.co.uk/posts.json`)
	const getHomepageFeed = await fetchPosts()

	const fetchArticles = () => axios.get(`https://cms.theadhocracy.co.uk/articles.json`)
	const getArticles = await fetchArticles()

	const fetchJournals = () => axios.get(`https://cms.theadhocracy.co.uk/journals.json`)
	const getJournals = await fetchJournals()

	const fetchNotes = () => axios.get(`https://cms.theadhocracy.co.uk/notes.json`)
	const getNotes = await fetchNotes()

	const fetchReviews = () => axios.get(`https://cms.theadhocracy.co.uk/reviews.json`)
	const getReviews = await fetchReviews()

	const fetchCollections = () => axios.get(`https://cms.theadhocracy.co.uk/collections.json`)
	const getCollections = await fetchCollections()

	const fetchWholeFeed = () => axios.get(`https://cms.theadhocracy.co.uk/everything.json`)
	const getFeed = await fetchWholeFeed()

	// Map feed and create nodes
	getFeed.data.data.map((post, i) => {
		// Create node object
		const feedNode = {
			// Required fields for Gatsby
			id: `${i}`,
			parent: `__SOURCE__`,
			internal: {
				type: `Feed` // name of the graphQL query --> allFeed {}
			},
			children: [],
			// Fields specific to this endpoint
			entryId: post.id,
			title: post.title,
			slug: post.slug,
			date: post.date,
			month: post.month,
			year: post.year,
			snippet: post.snippet,
			sanitised: post.sanitised,
			silo: post.silo,
			categories: post.categories,
			tags: post.tags,
			contentType: post.type
		}

		// Get content digest of node. (Required field)
		const contentDigest = crypto
			.createHash(`md5`)
			.update(JSON.stringify(feedNode))
			.digest(`hex`)
		feedNode.internal.contentDigest = contentDigest

		// Create node with the gatsby createNode() API
		createNode(feedNode)
	})

	// Map homepage feed (limited to 12 entries) and create nodes
	getHomepageFeed.data.data.map((post, i) => {
		// Create node object
		const postsNode = {
			// Required fields for Gatsby
			id: `${i}`,
			parent: `__SOURCE__`,
			internal: {
				type: `Posts` // name of the graphQL query --> allPosts {}
			},
			children: [],
			// Fields specific to this endpoint
			entryId: post.id,
			title: post.title,
			slug: post.slug,
			date: post.date,
			month: post.month,
			year: post.year,
			snippet: post.snippet,
			categories: post.categories,
			tags: post.tags,
			contentType: post.type
		}

		// Get content digest of node. (Required field)
		const contentDigest = crypto
			.createHash(`md5`)
			.update(JSON.stringify(postsNode))
			.digest(`hex`)
		postsNode.internal.contentDigest = contentDigest

		// Create node with the gatsby createNode() API
		createNode(postsNode)
	})

	// Map articles and create nodes
	getArticles.data.data.map((article, i) => {
		// Create node object
		const articlesNode = {
			// Required fields for Gatsby
			id: `${i}`,
			parent: `__SOURCE__`,
			internal: {
				type: `Article` // name of the graphQL query --> allArticle {}
			},
			children: [],
			// Fields specific to this endpoint
			entryId: article.id,
			title: article.title,
			slug: article.slug,
			date: article.date,
			updated: article.updated,
			body: article.body,
			snippet: article.snippet,
			footnotes: article.footnotes,
			resources: article.resources,
			categories: article.categories,
			tags: article.tags
		}

		// Get content digest of node. (Required field)
		const contentDigest = crypto
			.createHash(`md5`)
			.update(JSON.stringify(articlesNode))
			.digest(`hex`)
		articlesNode.internal.contentDigest = contentDigest

		// Create node with the gatsby createNode() API
		createNode(articlesNode)
	})

	// Map journals and create nodes
	getJournals.data.data.map((journal, i) => {
		// Create node object
		const journalsNode = {
			// Required fields for Gatsby
			id: `${i}`,
			parent: `__SOURCE__`,
			internal: {
				type: `Journals` // name of the graphQL query --> allJournals {}
			},
			children: [],
			// Fields specific to this endpoint
			entryId: journal.id,
			title: journal.title,
			slug: journal.slug,
			date: journal.date,
			updated: journal.updated,
			weekday: journal.weekday,
			day: journal.day,
			month: journal.month,
			year: journal.year,
			dateSuffix: journal.dateSuffix,
			body: journal.body,
			snippet: journal.snippet,
			footnotes: journal.footnotes,
			tags: journal.tags
		}

		// Get content digest of node. (Required field)
		const contentDigest = crypto
			.createHash(`md5`)
			.update(JSON.stringify(journalsNode))
			.digest(`hex`)
		journalsNode.internal.contentDigest = contentDigest

		// Create node with the gatsby createNode() API
		createNode(journalsNode)
	})

	// Map notes and create nodes
	getNotes.data.data.map((note, i) => {
		// Create node object
		const notesNode = {
			// Required fields for Gatsby
			id: `${i}`,
			parent: `__SOURCE__`,
			internal: {
				type: `Notes` // name of the graphQL query --> allNotes {}
			},
			children: [],
			// Fields specific to this endpoint
			entryId: note.id,
			title: note.title,
			slug: note.slug,
			date: note.date,
			body: note.body,
			snippet: note.snippet,
			categories: note.categories,
			tags: note.tags,
			attribution: note.attribution,
			source: note.source,
			tweet: note.tweet
		}

		// Get content digest of node. (Required field)
		const contentDigest = crypto
			.createHash(`md5`)
			.update(JSON.stringify(notesNode))
			.digest(`hex`)
		notesNode.internal.contentDigest = contentDigest

		// Create node with the gatsby createNode() API
		createNode(notesNode)
	})

	// Map reviews and create nodes
	getReviews.data.data.map((review, i) => {
		// Create node object
		const reviewsNode = {
			// Required fields for Gatsby
			id: `${i}`,
			parent: `__SOURCE__`,
			internal: {
				type: `Reviews` // name of the graphQL query --> allNotes {}
			},
			children: [],
			// Fields specific to this endpoint
			entryId: review.id,
			slug: review.slug,
			date: review.date,
			updated: review.updated,
			type: review.type,
			title: review.title,
			desc: review.desc,
			rating: review.rating,
			critiques: review.critiques,
			collections: review.collections
		}

		// Get content digest of node. (Required field)
		const contentDigest = crypto
			.createHash(`md5`)
			.update(JSON.stringify(reviewsNode))
			.digest(`hex`)
		reviewsNode.internal.contentDigest = contentDigest

		// Create node with the gatsby createNode() API
		createNode(reviewsNode)
	})

	// Map reviews and create nodes
	getCollections.data.data.map((collection, i) => {
		// Create node object
		const collectionsNode = {
			// Required fields for Gatsby
			id: `${i}`,
			parent: `__SOURCE__`,
			internal: {
				type: `Collections` // name of the graphQL query --> allNotes {}
			},
			children: [],
			// Fields specific to this endpoint
			entryId: collection.id,
			slug: collection.slug,
			title: collection.title,
			desc: collection.desc,
			reviews: collection.entries
		}

		// Get content digest of node. (Required field)
		const contentDigest = crypto
			.createHash(`md5`)
			.update(JSON.stringify(collectionsNode))
			.digest(`hex`)
		collectionsNode.internal.contentDigest = contentDigest

		// Create node with the gatsby createNode() API
		createNode(collectionsNode)
	})

	return
}

//******* PAGE CREATION

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions
	return graphql(`
		{
			allArticle {
				nodes {
					slug
					snippet
					title
				}
			}
			allJournals {
				nodes {
					slug
					year
					month
					snippet
					title
				}
			}
			allNotes {
				nodes {
					slug
					snippet
					title
				}
			}
			allReviews {
				nodes {
					slug
					type
				}
			}
		}
	`).then((result) => {
		// Create articles
		const posts = result.data.allArticle.nodes
		posts.forEach(({ slug }, index) => {
			createPage({
				path: `/wrote/${slug}`,
				component: path.resolve(`./src/templates/article.js`),
				context: {
					// Data passed to context is available
					// in page queries as GraphQL variables.
					slug: slug,
					next: index === 0 ? null : { slug: posts[index - 1].slug, title: posts[index - 1].title, desc: posts[index - 1].snippet },
					prev: index === posts.length - 1 ? null : { slug: posts[index + 1].slug, title: posts[index + 1].title, desc: posts[index + 1].snippet }
				}
			})
		})

		// Create articles list page
		// const posts = result.data.allArticle.nodes
		const postsPerPage = 12
		const numPages = Math.ceil(posts.length / postsPerPage)
		Array.from({ length: numPages }).forEach((_, i) => {
			createPage({
				path: i === 0 ? `/articles` : `/articles/${i + 1}`,
				component: path.resolve("./src/templates/articles.js"),
				context: {
					limit: postsPerPage,
					skip: i * postsPerPage,
					numPages,
					currentPage: i + 1
				}
			})
		})

		// Create journal entries
		const journals = result.data.allJournals.nodes
		result.data.allJournals.nodes.forEach(({ slug }, index) => {
			createPage({
				path: `/wrote/${slug}`,
				component: path.resolve(`./src/templates/journal_entry.js`),
				context: {
					// Data passed to context is available
					// in page queries as GraphQL variables.
					slug: slug,
					next: index === 0 ? null : { slug: journals[index - 1].slug, title: journals[index - 1].title, desc: journals[index - 1].snippet },
					prev: index === journals.length - 1 ? null : { slug: journals[index + 1].slug, title: journals[index + 1].title, desc: journals[index + 1].snippet }
				}
			})
		})

		// Create journals list page
		const journalsPerPage = 12
		const numJournalPages = Math.ceil(journals.length / journalsPerPage)
		Array.from({ length: numJournalPages }).forEach((_, i) => {
			createPage({
				path: i === 0 ? `/journal` : `/journal/${i + 1}`,
				component: path.resolve("./src/templates/journal.js"),
				context: {
					limit: journalsPerPage,
					skip: i * journalsPerPage,
					numJournalPages,
					currentPage: i + 1
				}
			})
		})

		// Create notes
		const notes = result.data.allNotes.nodes
		result.data.allNotes.nodes.forEach(({ slug }, index) => {
			createPage({
				path: `/note/${slug}`,
				component: path.resolve(`./src/templates/note.js`),
				context: {
					// Data passed to context is available
					// in page queries as GraphQL variables.
					slug: slug,
					next: index === 0 ? null : { slug: notes[index - 1].slug, title: notes[index - 1].title, desc: notes[index - 1].snippet },
					prev: index === notes.length - 1 ? null : { slug: notes[index + 1].slug, title: notes[index + 1].title, desc: notes[index + 1].snippet }
				}
			})
		})

		// Create notes list page
		const notesPerPage = 12
		const numNotesPages = Math.ceil(notes.length / notesPerPage)
		Array.from({ length: numNotesPages }).forEach((_, i) => {
			createPage({
				path: i === 0 ? `/notes` : `/notes/${i + 1}`,
				component: path.resolve("./src/templates/notes.js"),
				context: {
					limit: notesPerPage,
					skip: i * notesPerPage,
					numNotesPages,
					currentPage: i + 1
				}
			})
		})

		// Create reviews
		const reviews = result.data.allReviews.nodes
		reviews.forEach(({ slug, type }, index) => {
			createPage({
				path: `/review/${type.toLowerCase()}/${slug}`,
				component: path.resolve(`./src/templates/review.js`),
				context: {
					// Data passed to context is available
					// in page queries as GraphQL variables.
					slug: slug
				}
			})
		})
	})
}
