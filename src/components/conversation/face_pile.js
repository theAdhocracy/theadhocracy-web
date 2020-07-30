import React from "react"

// import styles from "./conversation.module.css"

const FacePile = ({ pile, defaultFace, defaultImages }) => {
	return (
		<ul>
			{pile.map((face) => {
				return (
					<li>
						<a href={face.wmSource}>
							<img src={face.author.photo || defaultFace(defaultImages)} alt="" />
						</a>
					</li>
				)
			})}
		</ul>
	)
}

export default FacePile
