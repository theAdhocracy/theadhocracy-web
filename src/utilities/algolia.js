const postQuery = `{
    posts: allFeed {
        edges {
            node {
                title
                slug
                categories
                tags
                contentType
                snippet
                date
                year
                month
            }
        }
    }
  }`

// const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
	{
		query: postQuery,
		transformer: ({ data }) => data.posts.edges,
		indexName: `theAdhocracy_Feed`
		// settings
	}
]

module.exports = queries
