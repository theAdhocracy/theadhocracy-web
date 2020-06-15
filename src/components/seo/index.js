import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, meta }) => {
	// Determine current URL
	const { pathname } = useLocation()

	// Get infromation from general site config
	const { site } = useStaticQuery(query)
	const { defaultTitle, titleTemplate, defaultDescription, siteUrl, defaultImage, twitterHandle, author } = site.siteMetadata

	// Combine with page-specific overrides passed as prop
	const seo = {
		title: `${defaultTitle}${title ? ` | ${title}` : ""}`,
		description: meta && meta.desc ? meta.desc.replace(/(<([^>]+)>)/gi, "") : defaultDescription,
		image: meta && meta.image ? meta.image : defaultImage,
		url: `${siteUrl}${pathname}`,
		type: meta && meta.type ? meta.type : "website"
	}

	// Create structured data JSON
	const structuredJSON = {
		"@context": "https://schema.org/"
	}

	return (
		<>
			{/* Default metadata for all pages */}
			<Helmet title={seo.title} titleTemplate={titleTemplate}>
				{/* Meta Standards */}
				<meta name="title" content={seo.title} />
				<meta name="description" content={seo.description} />
				<meta name="image" content={seo.image} />
				<meta name="robots" content="index, follow" />
				<meta name="author" content={author} />

				{/* Open Graph (Facebook/LinkedIn) */}
				<meta property="og:type" content={seo.type} />
				<meta property="og:title" content={seo.title} />
				<meta property="og:url" content={seo.url} />
				<meta property="og:description" content={seo.description} />
				<meta property="og:image" content={seo.image} />
				<meta property="og:site_name" content={defaultTitle} />

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:creator" content={twitterHandle} />
				<meta name="twitter:title" content={seo.title} />
				<meta name="twitter:description" content={seo.description} />
				<meta name="twitter:image" content={seo.image} />

				{/* Google Structured Data */}
				<script className="structured-data-list" type="application/ld+json">
					{JSON.stringify(structuredJSON)}
				</script>
			</Helmet>

			{/* Homepage profile information (OpenGraph) */}
			{pathname === "/" && (
				<Helmet>
					<meta property="profile:first_name" content="Murray" />
					<meta property="profile:last_name" content="Adcock" />
				</Helmet>
			)}

			{/* Article details (OpenGraph) */}
			{seo.type === "article" && (
				<Helmet>
					<meta property="article:author" content={siteUrl} />
					{meta.category ? <meta property="article:section" content={meta.category} /> : ""}
					{meta.tags ? <meta property="article:tag" content={meta.tags} /> : ""}
					{meta.published ? <meta property="article:published_time" content={new Date(meta.published).toISOString().split("T")[0]} /> : ""}
					{meta.updated ? <meta property="article:modified_time" content={new Date(meta.updated).toISOString().split("T")[0]} /> : ""}
				</Helmet>
			)}
		</>
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
				author
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
