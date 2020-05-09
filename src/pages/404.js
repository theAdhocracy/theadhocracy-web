import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const FourOhFour = () => {
	return (
		<Layout title="oh no!" sidebar={false}>
			<section id="content">
				<header>
					<h1>
						404: Someone screwed up{" "}
						<span role="image" aria-label="Nervous and sad">
							😥
						</span>
					</h1>
				</header>
				<p>
					Looks like you tried to find a page which doesn't exist. If you think the page <em>used to</em> exist then please let me know and I'll check it out.
				</p>
				<p>
					Otherwise, why not take a look around? Try <Link to="/search/">searching</Link> if you think you were close, or head back <Link to="/">home</Link> to see the latest things going on around here.
				</p>
				<p>
					Thanks for dropping by{" "}
					<span role="image" aria-label="Thumbs up">
						👍
					</span>
				</p>
			</section>
		</Layout>
	)
}

export default FourOhFour
