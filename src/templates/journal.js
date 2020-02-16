import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/content_card"
import PageNav from "../components/page_nav"

class Journal extends React.Component {
    render() {
        
        // Set root for data
        const entries = this.props.data.allJournals.nodes

        let testMonth = ""

        return (
            <Layout title="theAdhocracy" sidebar={false}>
                <section id="content">
                    <header>
                        <h1>Journal Entries</h1>
                    </header>
                    <main className="content-grid">
                        {entries.map((entry) => {
                            if(entry.month === testMonth) {
                                return (
                                    <Card post={entry} type="journal" />
                                )
                            } else {
                                testMonth = entry.month
                                return (
                                    <>
                                        <div className="journal-section">
                                            <h2>{entry.month}</h2>
                                        </div>
                                        <Card post={entry} type="journal" />
                                    </>
                                )
                            }
                        })}
                        {entries.count < 13 ? <PageNav page={this.props.pageContext} root="journal/"/> : ""}
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
                weekday
                day
                month
                year
                dateSuffix
                snippet
                tags
            }
        }
	}
`
