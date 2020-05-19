import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/content_card"
import PageNav from "../components/page_nav"

class Articles extends React.Component {
	render() {
		// Set root for data
		const articles = this.props.data.allArticle.nodes

		return (
			<Layout title="Articles" sidebar={false}>
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
						{articles.map((article) => (
							<Card post={article} />
						))}
						<PageNav currentPage={this.props.pageContext.currentPage} totalPages={this.props.pageContext.numPages} pageRoot="articles/" />
					</main>
				</section>
			</Layout>
		)
	}
}

export default Articles

export const query = graphql`
	query AllPostsQuery($skip: Int!, $limit: Int!) {
		allArticle(limit: $limit, skip: $skip) {
			nodes {
				title
				slug
				snippet
				date(formatString: "DD MMM YYYY")
				categories
				tags
			}
		}
		feed: allArticle {
			nodes {
				title
				slug
			}
		}
	}
`
