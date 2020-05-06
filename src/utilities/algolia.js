const postQuery = `{
    posts: allFeed {
        edges {
            node {
                title
                slug
                categories
                tags
                silo
                contentType
                sanitised
                date
                year
                month
            }
        }
    }
  }`

const queries = [
	{
		query: postQuery,
		transformer: ({ data }) => data.posts.edges.node,
		indexName: `theAdhocracy_Feed`
	}
]

module.exports = queries
