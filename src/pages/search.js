import React from "react"
import Layout from "../components/layout"
import Search from "../components/search"

const SearchPage = () => {
	return (
		<Layout title="theAdhocracy" sidebar={false}>
			<main id="content">
				<header>
					<h1>Search</h1>
				</header>
				<section>
					<Search />
				</section>
			</main>
		</Layout>
	)
}

export default SearchPage
