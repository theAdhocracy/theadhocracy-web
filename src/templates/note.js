import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo/seo"

import "../styles/article.css"

export default ({ data }) => {
    const note = data.note
    const body = note.body.replace(/<sup>\[([0-9]*)\]<\/sup>/gi, '<sup id="index$1"><a href="#footnote$1" title="Jump to footnote.">[$1]</a></sup>')

    return (
        <Layout>
            <SEO
                title={note.title}
            />
            <main id="content" class="article">
                <header>
                    <h1>{note.title} | {note.attribution}</h1>
                </header>
                <div className="full-width">
                    <ul className="article-details left-side">
                        <li>Source</li>
                        <li>{note.source}</li>
                        <li>Published</li>
                        <li>{note.date}</li>
                        <li>Categories</li>
                        <li>
                            {note.categories.map(category => <a>{category}, </a>)}
                        </li>
                        <li>Tags</li>
                        <li>
                            {note.tags.map(tag => <a>{tag}, </a>)}
                        </li>
                    </ul>
                    <article dangerouslySetInnerHTML={{ __html: body }} />
                </div>
            </main>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        note(slug: {eq: $slug }) {
            title
            body
            categories
            tags
            date(formatString: "DD MMMM YYYY")
            attribution
            source
        }
    }
`