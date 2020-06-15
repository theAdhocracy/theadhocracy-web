import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, meta }) => {
	const { pathname } = useLocation()
	const { site } = useStaticQuery(query)

	const { defaultTitle, titleTemplate, defaultDescription, siteUrl, defaultImage, twitterHandle } = site.siteMetadata

	const seo = {
		title: `${defaultTitle}${title && ` | ${title}`}`,
		description: meta ? meta.desc : defaultDescription,
		image: meta ? meta.image : defaultImage,
		url: `${siteUrl}${pathname}`,
		type: meta ? meta.type : "website"
	}

	return (
		<Helmet title={seo.title} titleTemplate={titleTemplate}>
			{/* Meta Standards */}
			<meta name="title" content={seo.title} />
			<meta name="description" content={seo.description} />
			<meta name="image" content={seo.image} />

			{/* Open Graph (Facebook/LinkedIn) */}
			<meta property="og:type" content={seo.type} />
			<meta property="og:title" content={seo.title} />
			<meta property="og:url" content={seo.url} />
			<meta property="og:description" content={seo.description} />
			<meta property="og:image" content={seo.image} />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:creator" content={twitterHandle} />
			<meta name="twitter:title" content={seo.title} />
			<meta name="twitter:description" content={seo.description} />
			<meta name="twitter:image" content={seo.image} />
		</Helmet>
	)
}

export default SEO

const query = graphql`
	query SEO {
		site {
			siteMetadata {
				defaultTitle: title
				defaultDescription: description
				siteUrl
				defaultImage: siteImage
				twitterHandle
			}
		}
	}
`

SEO.propTypes = {
	title: PropTypes.string,
	meta: PropTypes.array
}

SEO.defaultProps = {
	title: null,
	meta: null
}
