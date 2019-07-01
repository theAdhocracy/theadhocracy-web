import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
    const post = data.article
    const body = post.body.replace(/<sup>\[([0-9]*)\]<\/sup>/gi, '<sup id="index$1"><a href="#footnote$1" title="Jump to footnote.">[$1]</a></sup>')

    // let footnotes = '';
    // for (let i = 0; i < post.footnotes.length; i++) {
    //     let j = i + 1;
    //     footnotes += post.footnotes[i].replace(/<p>(.*)<\/p>/gi, '<p id="footnote' + j + '">$1 <a href="#index' + j + '" title="Return to previous location in article.">⬆️</a></p>');
    // }

    return (
        <Layout>
            <main id="content">
                <h1>{post.title}</h1>
                <article dangerouslySetInnerHTML={{ __html: body }} />
                <section>
                    {post.footnotes.forEach(({ footnote }) => console.log(post.footnotes[2]))}
                    {post.footnotes.map(({ footnote, index }) => (
                        // <p id={`footnote${index + 1}`}>{footnote} <Link to={`#index${index + 1}`} title="Return to previous location in article.">⬆️</Link></p>
                        <p>{footnote} test</p>
                    ))}
                    {post.footnotes.map(x => <p>{x} test</p>)}
                </section>
            </main>
        </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
    article(slug: { eq: $slug }) {
      title
      body
      footnotes
    }
  }
`