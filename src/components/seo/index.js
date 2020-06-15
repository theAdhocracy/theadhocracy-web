import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({ title, meta, article }) => (
	// const { pathname } = useLocation()
	<StaticQuery
		query={query}
		render={({
			site: {
				siteMetadata: { defaultTitle, titleTemplate, defaultDescription, siteUrl, defaultImage, twitterUsername }
			}
		}) => {
			const seo = {
				title: `${defaultTitle}${title && ` | ${title}`}`,
				description: meta ? meta.desc : defaultDescription,
				image: meta ? meta.image : defaultImage,
				url: `${siteUrl}${pathname}`
			}
			return (
				<Helmet title={seo.title} titleTemplate={titleTemplate}>
					<meta name="description" content={seo.description} />
					<meta name="image" content={seo.image} />
					{seo.url && <meta property="og:url" content={seo.url} />}
					{(article ? true : null) && <meta property="og:type" content="article" />}
					{seo.title && <meta property="og:title" content={seo.title} />}
					{seo.description && <meta property="og:description" content={seo.description} />}
					{seo.image && <meta property="og:image" content={seo.image} />}
					<meta name="twitter:card" content="summary_large_image" />
					{twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
					{seo.title && <meta name="twitter:title" content={seo.title} />}
					{seo.description && <meta name="twitter:description" content={seo.description} />}
					{seo.image && <meta name="twitter:image" content={seo.image} />}
				</Helmet>
			)
		}}
	/>
)

export default SEO

const query = graphql`
	query SEO {
		site {
			siteMetadata {
				defaultTitle: title
				defaultDescription: description
				siteUrl: siteUrl
				defaultImage: siteImage
				twitterHandle
			}
		}
	}
`

SEO.propTypes = {
	title: PropTypes.string,
	meta: PropTypes.array,
	image: PropTypes.string,
	pathname: PropTypes.string,
	article: PropTypes.bool
}

SEO.defaultProps = {
	title: null,
	meta: null,
	image: null,
	pathname: null,
	article: false
}
