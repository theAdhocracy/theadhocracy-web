import React from "react"
import styled from "styled-components/macro"

const Pile = styled.ul`
	display: flex;
	max-width: var(--main);
	padding-left: 0;
	list-style: none;
	gap: -0.2em;

	& > li {
		height: 3rem;
		width: 3rem;
		justify-self: flex-start;
		margin: 0 0 0 -0.5rem;
	}

	& > li:first-of-type {
		margin-left: 0;
	}

	& > li:hover {
		z-index: 3;
		width: 3.5rem;
		height: 3.5rem;
		margin-top: -0.5rem;
	}

	img {
		border-radius: 50%;
		border: 3px solid #ffffff;
	}

	@media screen and (min-width: 400px) {
		margin-top: 0.25em;
	}
`

const FacePile = ({ pile, defaultFace, defaultImages }) => {
	return (
		<Pile>
			{pile.map((face) => {
				const handle = face.author.url.replace(/http.*twitter.com\//, "")
				const type = face.wmProperty.toLowerCase().replace("-of", "")
				const typed = `${type.replace(/e$/, "")}ed`
				const tooltip = `${face.author.name} (@${handle}) ${typed} on Twitter`
				return (
					<li className={`p-${type} h-cite`}>
						<a className="u-url h-card p-author" href={face.author.url} title={tooltip}>
							<img src={face.author.photo || defaultFace(defaultImages)} alt={tooltip} className="u-photo" />
						</a>
					</li>
				)
			})}
		</Pile>
	)
}

export default FacePile
