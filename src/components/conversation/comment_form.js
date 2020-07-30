import React from "react"

import styled from "styled-components"

const UserComments = styled.section``

const CommentForm = () => {
	return (
		<UserComments>
			<h3>Want to take part?</h3>
			<p>
				These comments are powered by <a href="https://indieweb.org/Webmention">Webmentions</a>, so if you know what that means send me a ping 👍 No idea what I'm talking about? No worries, that's what this form is for 😍
			</p>
			<form>
				<label for="wm_name">
					Name:
					<input type="text" id="wm_name" />
				</label>
				<label for="wm_url">
					Website:
					<input type="text" id="wm_url" />
				</label>
				<label for="wm_comment">
					Comment:
					<textarea id="wm_comment" />
				</label>
			</form>
		</UserComments>
	)
}

export default CommentForm
