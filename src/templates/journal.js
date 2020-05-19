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

		// Create variables to track month and year values; allows month headers to be placed correctly.
		let loopMonth = ""
		let loopYear = ""

		return (
			<Layout title="Journal" sidebar={false}>
				<section id="content">
					<header>
						<h1>Journal Entries</h1>
					</header>
					<main className="content-grid">
						{entries.map((entry, index) => {
							if (entry.month === loopMonth) {
								return <Card post={entry} type="journal" />
							} else {
								loopMonth = entry.month // update current month

								// Check current year vs previous and update if needed
								let yearFlag = false
								if (loopYear !== entry.year) {
									yearFlag = true
									loopYear = entry.year
								}

								// Create array of journal entries for the current month + year
								let monthEntries = entries.filter((each) => {
									return each.month === loopMonth && each.year === loopYear
								})

								return (
									<>
										{/* Display year seperator except for the current year */}
										{yearFlag && index > 0 ? (
											<div className="year-break">
												<h3>{entry.year}</h3>
											</div>
										) : (
											""
										)}
										<div className="journal-section">
											<h2>
												{entry.month} {entry.year}
											</h2>
											<Calendar month={loopMonth} year={entry.year} entryArray={monthEntries} />
										</div>
										<Card post={entry} type="journal" />
									</>
								)
							}
						})}
						{entries.count < 13 ? <PageNav page={this.props.pageContext} root="/journal/" /> : ""}
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
				date(formatString: "DD MMM YYYY", locale: "en-GB")
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
