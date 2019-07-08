import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/content_card"

const Articles = ({ data }) => {
    return (
        <Layout title="theAdhocracy" sidebar={false}>
            <section id="content">
                <header>
                    <h1>Explore Articles</h1>
                </header>
                <section>
                    <button>List View</button>
                    <button>Page View</button>
                    <p>Timeline for pagination (some kind of calendar with mapped hot spots and year select at far right)</p>
                </section>
                <main className="content-grid">
                    {data.allArticle.nodes.map(article => (
                        <Card post={article} />
                    ))}
                </main>
            </section>
        </Layout>
    )
}

export default Articles

export const query = graphql`
	query AllPostsQuery {
        allArticle {
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
