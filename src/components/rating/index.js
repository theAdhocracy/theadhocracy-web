import React from "react"

const Rating = ({ value }) => {
	return (
		<span role="img" aria-label={`Rated ${value} out of 5`}>
			{"⭐".repeat(value)}
			{value % 1 !== 0 ? "½" : null}
		</span>
	)
}

export default Rating
