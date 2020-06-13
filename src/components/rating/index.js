import React from "react"
import styles from "./rating.module.css"

const Rating = ({ value }) => {
	return (
		<span className={value > 5 && styles.superb} role="img" aria-label={`Rated ${value} out of 5`}>
			{"⭐".repeat(value)}
			{value % 1 !== 0 ? "½" : null}
		</span>
	)
}

export default Rating
