import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import "../styles/article.css"

export default ({ data }) => {
    const post = data.article
    const body = post.body.replace(/<sup>\[([0-9]*)\]<\/sup>/gi, '<sup id="index$1"><a href="#footnote$1" title="Jump to footnote.">[$1]</a></sup>')

    return (
        <Layout>
            <main id="content">
                <header>
                    <h1>{post.title}</h1>
                </header>
                <div className="full-width">
                    <ul className="article-details left-side">
                        <li>Published: 01 Jan 2019</li>
                        <li>Published: 01 Jan 2019</li>
                        <li>Published: 01 Jan 2019</li>
                    </ul>
                    <article dangerouslySetInnerHTML={{ __html: body }} />
                    <section className="footnotes">
                        {post.footnotes.map((footnote, index) => {
                            let position = index + 1
                            return <p id={`footnote${position}`} dangerouslySetInnerHTML={{ __html: footnote.replace(/^<p>(.*)<\/p>$/gi, '$1 <a href="#index' + position + '" title="Return to previous location in article.">⬆️</a>') }}></p>
                        })}
                    </section>
                </div>
            </main>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        article(slug: {eq: $slug }) {
            title
            body
            footnotes
        }
    }
`