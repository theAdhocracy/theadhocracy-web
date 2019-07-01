import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
    const post = data.article
    return (
        <Layout>
            <section id="content">
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </section>
        </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
    article(slug: { eq: $slug }) {
      title
      body
    }
  }
`