import React from "react"
import { Link } from "gatsby"

import "./content_card.css"

const ContentCard = ({ post }) => {
    return (
        <section className={"content-card"}>
            <header>
                <h2>{post.title}</h2>
            </header>
            <article dangerouslySetInnerHTML={{ __html: `${post.snippet}` }} />
            <footer>
                <Link to={`/article/${post.slug}`}><span role="img" aria-label="Book icon">📖</span> Read Article</Link>
                <p><span role="img" title="Date published" aria-label="Date published">📆</span> 01 Jan 2019</p>
                <p><span>Categories</span></p>
                <ul className="flat-list">{post.categories.map(category => <li>{category}</li>)}</ul>
                {/* <p>Article tagged as: {post.tags.map(tag => <em>{tag}, </em>)}</p> */}
            </footer>
        </section>
    )
}

export default ContentCard

