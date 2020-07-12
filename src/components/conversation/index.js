import React from "react"

import styles from "./conversation.module.css"

const Conversation = ({ url, mentions }) => {
	return (
		<section className={styles.conversation}>
			<h2>Conversation</h2>
			{mentions.map((mention) => {
				// Date and time
				const pubDate = mention.published ? mention.published : mention.wmReceived
				const date = new Date(pubDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
				const time = new Date(pubDate).toLocaleTimeString("en-GB", { hour: "numeric", minute: "numeric" })

				// Source
				const website = mention.wmSource.replace(/^[https:]*\/\/([^/]*)\/.*/i, "$1")

				// Default image
				// TODO: REPLACE
				const defaultImage = "https://cms.theadhocracy.co.uk/assets/theadhocracy/website/murray-headshot-square.jpg"

				return (
					<article>
						<header>
							<img src={mention.author.photo || defaultImage} alt="" />
							<h2>{mention.author.name || "Reply"}</h2>
							<p>
								<time dateTime={mention.published}>{`${date} ${time}`}</time>
							</p>
							<a href={mention.wmSource}>{website}</a>
						</header>
						{mention.content.html ? <div dangerouslySetInnerHTML={{ __html: mention.content.html }} /> : <p>{mention.content.text}</p>}
					</article>
				)
			})}
		</section>
	)
}

export default Conversation
