import React from "react"
import styled from "styled-components/macro"

const ResourcesStyles = styled.section`
	ul {
		max-width: var(--main);
		line-height: 2;
		list-style: none;
		padding-left: 0;
	}

	li.resource::before {
		content: "📖";
		margin-right: 0.75rem;
		display: inline-block;
	}

	li.resource.bookmark::before {
		content: "🔖";
	}

	li.resource.like::before {
		content: "😍";
	}

	li.resource.noted::before {
		content: "📂";
	}

	.resource-desc {
		margin: 0;
		margin-left: 2.1rem;
		font-style: italic;
		color: var(--grey);
	}

	a {
		margin: 0;
	}

	span {
		margin: 0;
		margin-left: 0.8rem;
		color: var(--lightblue);
		font-size: 0.8rem;
	}

	@media screen and (min-width: 599px) {
		ul {
			padding-left: 1.5rem;
		}
	}
`

const Resources = ({ resources }) => {
	return (
		<ResourcesStyles>
			<h2>Further Reading & Sources</h2>
			<ul>
				{resources.map((item, index) => {
					const type = item.type
					return (
						<>
							<li key={index} className={`resource ${type} h-entry`}>
								<a href={item.url} className={`u-${type}-of h-cite p-name`}>
									{item.title}
								</a>
								<span className="p-author">{item.author}</span>
								{item.desc && <p className="resource-desc e-content">&#11180; {item.desc}</p>}
							</li>
						</>
					)
				})}
			</ul>
		</ResourcesStyles>
	)
}

export default Resources
