import React from "react"
import Layout from "../components/layout"
import Search from "../components/search"

const SearchPage = () => {
	return (
		<Layout title="Search" sidebar={false}>
			<main id="content">
				<header>
					<h1>Archives</h1>
				</header>
				<section>
					<Search searchIndex="theAdhocracy_Feed" />
				</section>
			</main>
		</Layout>
	)
}

export default SearchPage
