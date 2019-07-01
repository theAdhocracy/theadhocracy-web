import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
    const post = data.article
    const body = post.body.replace(/<sup>\[([0-9]*)\]<\/sup>/gi, '<sup id="index$1"><a href="#footnote$1" title="Jump to footnote.">[$1]</a></sup>')

    return (
        <Layout>
            <main id="content">
                <h1>{post.title}</h1>
                <article dangerouslySetInnerHTML={{ __html: body }} />
                <section className="footnotes">
                    {post.footnotes.map((footnote, index) => {
                        let position = index + 1
                        return <p id={`footnote${position}`} dangerouslySetInnerHTML={{ __html: footnote.replace(/^<p>(.*)<\/p>$/gi, '$1 <a href="#index' + position + '" title="Return to previous location in article.">⬆️</a>') }}></p>
                    })}
                </section>
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