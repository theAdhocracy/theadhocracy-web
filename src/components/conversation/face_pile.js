import React from "react"
import styled from "styled-components/macro"

const Pile = styled.ul`
	display: flex;
	max-width: var(--main);
	padding-left: 0;
	list-style: none;
	gap: -0.2em;

	& > li {
		height: 2rem;
		width: 2rem;
		justify-self: flex-start;
		margin: 0 0 0 -0.5rem;
	}

	& > li:first-of-type {
		margin-left: 0;
	}
`

const FacePile = ({ pile, defaultFace, defaultImages }) => {
	return (
		<Pile>
			{pile.map((face) => {
				return (
					<li>
						<a href={face.wmSource}>
							<img src={face.author.photo || defaultFace(defaultImages)} alt="" />
						</a>
					</li>
				)
			})}
		</Pile>
	)
}

export default FacePile
