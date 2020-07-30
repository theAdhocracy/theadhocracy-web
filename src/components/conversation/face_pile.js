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
				const type = face.wmProperty.toLowerCase().replace("-of", "")
				return (
					<li className={`p-${type} h-cite`}>
						<a className="u-url h-card p-author" href={face.wmSource}>
							<img src={face.author.photo || defaultFace(defaultImages)} alt={face.author.name} className="u-photo" />
						</a>
					</li>
				)
			})}
		</Pile>
	)
}

export default FacePile
