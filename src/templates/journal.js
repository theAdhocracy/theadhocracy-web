import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/content_card"
import PageNav from "../components/page_nav"
import Calendar from "../components/calendar"

class Journal extends React.Component {
    render() {

        // Set root for data
        const entries = this.props.data.allJournals.nodes

        // Create variable to track month values; allows month headers to be placed correctly.
        let loopMonth = ""
        let monthLookup = {
            'January': '01',
            'February': '02',
            'March': '03',
            'April': '04',
            'May': '05',
            'June': '06',
            'July': '07',
            'August': '08',
            'September': '09',
            'October': '10',
            'November': '11',
            'December': '12'
        }

        return (
            <Layout title="theAdhocracy" sidebar={false}>
                <section id="content">
                    <header>
                        <h1>Journal Entries</h1>
                    </header>
                    <main className="content-grid">
                        {entries.map((entry) => {
                            if (entry.month === loopMonth) {
                                return (
                                    <Card post={entry} type="journal" />
                                )
                            } else {
                                loopMonth = entry.month
                                let loopMonthNumDays = new Date(entry.year, monthLookup[loopMonth], 0).getDate();
                                let iterateCount = new Array(loopMonthNumDays)
                                return (
                                    <>
                                        <div className="journal-section">
                                            <h2>{entry.month}</h2>
                                            {/* <ul>{iterateCount.map(index => {
                                                return <li>{index}</li>
                                            })}</ul> */}
                                            <Calendar numDays={loopMonthNumDays} />
                                            {/* TODO: Create calendar component to sit here; allow it to highlight which days have posts */}
                                        </div>
                                        <Card post={entry} type="journal" />
                                    </>
                                )
                            }
                        })}
                        {entries.count < 13 ? <PageNav page={this.props.pageContext} root="journal/" /> : ""}
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
