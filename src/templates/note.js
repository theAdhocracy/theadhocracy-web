import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo/seo"

import "../styles/article.css"

export default ({ data }) => {
    const note = data.notes
    const body = note.body

    return (
        <Layout>
            <SEO
                title={note.title}
            />
            <main id="content" className="article h-entry">
                <header>
                    <h1 className="article-header p-name">{note.title} | {note.attribution}</h1>
                </header>
                <article className="full-width">
                    <ul className="article-details left-side">
                        <li>Source</li>
                        <li className="h-cite"><a className="u-url" href={note.source}>Link to Original <span role="img" title="Permalink to note" aria-label="Link icon">🔗</span></a></li>
                        <li className="dt-published">Published</li>
                        <li>{note.date}</li>
                        <li>Categories</li>
                        <li>
                            {note.categories.map((category, index, array) => (index < array.length - 1 ? <a>{category},&nbsp;</a> : <a>{category}</a>))}
                        </li>
                        <li>Tags</li>
                        <li>
                            {note.tags.map((tag, index, array) => (index < array.length - 1 ? <a>{tag},&nbsp;</a> : <a>{tag}</a>))}
                        </li>
                    </ul>
                    <div id="article-body" className="e-content" dangerouslySetInnerHTML={{ __html: body }} />
                </article>
            </main>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        notes(slug: {eq: $slug }) {
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