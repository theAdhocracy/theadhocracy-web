import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/content_card"
import PageNav from "../components/page_nav"

class Notes extends React.Component {
    render() {


        // Set root for data
        const notes = this.props.data.allNotes.nodes

        return (
            <Layout title="theAdhocracy | Notes" sidebar={false}>
                <section id="content">
                    <header>
                        <h1>Explore Notes</h1>
                    </header>
                    <main className="content-grid">
                        {notes.map(note => (
                            <Card post={note} />
                        ))}
                        <PageNav page={this.props.pageContext} root="notes/" />
                    </main>
                </section>
            </Layout>
        )
    }
}

export default Notes

export const query = graphql`
	query AllPostsQuery($skip: Int!, $limit: Int!) {
        allNotes(
            limit: $limit
            skip: $skip
        ) {
            nodes {
                title
                slug
                date(formatString: "DD MMM YYYY")
                categories
                tags
                source
                attribution
                body
            }
        }
	}
`
