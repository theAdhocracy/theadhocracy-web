import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/content_card"

class Articles extends React.Component {
    render() {
        // Defining pagination values
        const { currentPage, numPages } = this.props.pageContext
        const pageRoot = "/articles/"
        const isFirst = currentPage === 1
        const isLast = currentPage === numPages
        const prevPage = currentPage - 1 === 1 ? pageRoot : `${pageRoot}${(currentPage - 1).toString()}`
        const nextPage = `${pageRoot}${(currentPage + 1).toString()}`

        // Set root for data
        const articles = this.props.data.allArticle.nodes

        return (
            <Layout title="theAdhocracy" sidebar={false}>
                <section id="content">
                    <header>
                        <h1>Explore Articles</h1>
                    </header>
                    {/* <section>
                        <button>List View</button>
                        <button>Page View</button>
                        <p>Timeline for pagination (some kind of calendar with mapped hot spots and year select at far right)</p>
                    </section> */}
                    <main className="content-grid">
                        {articles.map(article => (
                            <Card post={article} />
                        ))}
                        <footer className="page-navigation">
                            {!isFirst && (
                                <Link to={prevPage} rel="prev">
                                    ← Previous Page
                                </Link>
                            )}
                            {!isLast && (
                                <Link to={nextPage} rel="next">
                                    Next Page →
                                </Link>
                            )}
                        </footer>
                    </main>
                </section>
            </Layout>
        )
    }
}

export default Articles

export const query = graphql`
	query AllPostsQuery($skip: Int!, $limit: Int!) {
        allArticle(
            limit: $limit
            skip: $skip
        ) {
            nodes {
                title
                slug
                date(formatString: "DD MMM YYYY")
                categories
                tags
            }
        }
	}
`
