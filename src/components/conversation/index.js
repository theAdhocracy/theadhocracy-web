import React from "react"

// import CommentForm from "./comment_form"
import styles from "./conversation.module.css"

const Conversation = ({ webmentions }) => {
	// Filter webmentions based on type
	const likes = webmentions.filter((mention) => mention.wmProperty === "like-of")
	const replies = webmentions.filter((mention) => mention.wmProperty === "in-reply-to")
	const bookmarks = webmentions.filter((mention) => mention.wmProperty === "bookmark-of" || mention.wmProperty === "repost-of")
	const mentions = webmentions.filter((mention) => mention.wmProperty === "mention-of")
	const comments = replies.concat(mentions)

	// Default image
	const defaultImageArray = ["https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/theadhocracy-default-avatar-green.svg", "https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/theadhocracy-default-avatar-pink.svg", "https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/theadhocracy-default-avatar-blue.svg", "https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/theadhocracy-default-avatar-orange.svg"]
	const randomImage = (array) => {
		return array[Math.floor(Math.random() * array.length)]
	}

	return (
		<section className={styles.conversation}>
			<h2>Conversation</h2>
			{likes.length > 0 && (
				<>
					<h3>Likes</h3>
					<ul>
						{likes.map((like) => {
							return (
								<li>
									<a href={like.wmSource}>
										<img src={like.author.photo || randomImage(defaultImageArray)} alt="" />
									</a>
								</li>
							)
						})}
					</ul>
				</>
			)}
			{bookmarks.length > 0 && (
				<>
					<h3>Bookmarks</h3>
					<ul>
						{bookmarks.map((bookmark) => {
							return (
								<li>
									<a href={bookmark.wmSource}>
										<img src={bookmark.author.photo || randomImage(defaultImageArray)} alt="" />
									</a>
								</li>
							)
						})}
					</ul>
				</>
			)}
			<h3>Want to take part?</h3>
			<p>
				Comments are powered by <a href="https://indieweb.org/Webmention">Webmentions</a>; if you know what that means, do your thing 👍
			</p>
			{comments.map((mention) => {
				// Date and time
				const pubDate = mention.published ? mention.published : mention.wmReceived
				const date = new Date(pubDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
				const time = new Date(pubDate).toLocaleTimeString("en-GB", { hour: "numeric", minute: "numeric" })

				console.log(pubDate)

				// Source
				const website = mention.wmSource.replace(/^[https:]*\/\/([^/]*)\/.*/i, "$1")

				// Unique ID
				const id = `comment_${mention.id.replace(/[a-z_]*/i, "")}`

				return (
					<article id={id} className="h-entry p-comment h-cite">
						<img className="u-photo" src={mention.author.photo || randomImage(defaultImageArray)} alt="" />
						<header className="p-author">
							<h2 className="p-name">{mention.author.name || "Reply"}</h2>
							<a className="u-url" href={mention.wmSource}>
								{website}
							</a>
						</header>
						<section className="e-content">{mention.content.html ? <div dangerouslySetInnerHTML={{ __html: mention.content.html }} /> : <p>{mention.content.text}</p>}</section>
						<footer>
							<p>
								<span role="img" aria-label="Date posted">
									📅
								</span>
							</p>
							<p>
								<time className="dt-published" dateTime={pubDate}>{`${date} ${time}`}</time>
							</p>
						</footer>
					</article>
				)
			})}
		</section>
	)
}

export default Conversation
