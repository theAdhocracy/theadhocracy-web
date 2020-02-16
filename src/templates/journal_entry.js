import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo/seo"

import "../styles/article.css"

export default ({ data }) => {
    const post = data.journals
    const body = post.body.replace(/<sup>\[([0-9]*)\]<\/sup>/gi, '<sup id="index$1"><a href="#footnote$1" title="Jump to footnote.">[$1]</a></sup>')

    return (
        <Layout>
            <SEO
                title={post.title}
            />
            <main id="content" class="article">
                <header>
                    <h1>{post.title}</h1>
                </header>
                <div className="full-width">
                    <ul className="article-details left-side">
                        <li>Updated</li>
                        <li>{post.date}</li>
                        <li>Published</li>
                        <li>{post.date}</li>
                        <li>Tags</li>
                        <li>
                            {post.tags.map(tag => <a>{tag}, </a>)}
                        </li>
                    </ul>
                    <article dangerouslySetInnerHTML={{ __html: body }} />
                    <section className="footnotes">
                        {post.footnotes.length >= 1 ? <h2>Footnotes</h2> : null}
                        {post.footnotes.map((footnote, index) => {
                            let position = index + 1
                            return <aside id={`footnote${position}`} dangerouslySetInnerHTML={{ __html: footnote.replace(/^<p>(.*)<\/p>$/gi, '<p>$1 <a class="footnote-return" href="#index' + position + '" title="Return to previous location in article.">⬆️</a></p>') }} />
                        })}
                    </section>
                </div>
            </main>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        journals(slug: {eq: $slug }) {
            title
            body
            footnotes
            tags
            date(formatString: "DD MMMM YYYY")
        }
    }
`