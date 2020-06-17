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

const reviewQuery = `{
      reviews: allReviews {
        edges {
            node {
                title
                slug
                rating
                type
                sanitised
                date
                updated
                latestReview
                author
                series {
                    title
                    slug
                }
                collections {
                    title
                    slug
                }
            }
        }
    }
  }`

const queries = [
	{
		query: postQuery,
		transformer: ({ data }) => data.posts.edges,
		indexName: `theAdhocracy_Feed`
	},
	{
		query: reviewQuery,
		transformer: ({ data }) => data.reviews.edges,
		indexName: `theAdhocracy_Reviews`
	}
]

module.exports = queries
