import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/content_card"
import PageNav from "../components/page_nav"

class Journal extends React.Component {
    render() {
        
        // Set root for data
        const entries = this.props.data.allJournals.nodes

        return (
            <Layout title="theAdhocracy" sidebar={false}>
                <section id="content">
                    <header>
                        <h1>Journal Entries</h1>
                    </header>
                    <main className="content-grid">
                        {entries.map(entry => (
                            <h2>{entry.title}</h2>
                        ))}
                        <PageNav page={this.props.pageContext}/>
                    </main>
                </section>
            </Layout>
        )
    }
}

export default Journal

export const query = graphql`
	{
        allJournals {
            nodes {
                title
                slug
                date(formatString: "DD MMM YYYY")
                tags
            }
        }
	}
`
