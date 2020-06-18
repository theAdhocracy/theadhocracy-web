import React, { useState, useEffect } from "react"
import { connectRange } from "react-instantsearch-dom"

import styles from "./search.module.css"

const RatingMenu = ({ refine, min, max, count }) => {
	const [minRange, setMin] = useState(min || 0)
	const [maxRange, setMax] = useState(max || 6)

	// Update query limits on range state change or category filter (count.length)
	useEffect(() => {
		let minValue = minRange < min ? min : minRange
		let maxValue = maxRange > max ? max : maxRange
		refine({ max: maxValue, min: minValue })
		setMax(parseInt(maxValue, 10))
		setMin(parseInt(minValue, 10))
		console.log(`Max: ${maxRange} | Min: ${minRange}`)
	}, [minRange, maxRange, count.length])

	// Update user selected range and UI
	function updateRange() {
		// Retrieve checkbox elements
		const checkboxes = document.querySelectorAll("input[type=checkbox][name=rating]")

		// Create array of checked values & set bounds
		const checkboxRange = Array.from(checkboxes)
			.map((box) => (box.checked ? box.value : null))
			.filter(Number)
		const minBox = checkboxRange[0]
		const maxBox = checkboxRange[checkboxRange.length - 1]

		// Update visuals to match selected range (fills in blanks)
		checkboxes.forEach((box) => (maxBox >= box.value && box.value >= minBox ? (box.checked = true) : (box.checked = false)))
		checkboxes.forEach((box) => box.classList.remove(styles.range_limit))

		// Deal with 0 star selection; else update to range selected based on value array
		if (!checkboxRange.length) {
			setMax(0)
			setMin(0)
		} else {
			// calculate min/max based on current search boundaries
			let minValue = minBox < min ? min : minBox
			let maxValue = maxBox > max ? max : maxBox
			setMax(parseInt(maxValue, 10))
			setMin(parseInt(minValue, 10))

			// set range limit UI
			checkboxes[minBox - 1].classList.add(styles.range_limit)
			checkboxes[maxBox - 1].classList.add(styles.range_limit)
		}
	}

	return (
		<section>
			<span className="label">Rating range:</span>
			<span className={styles.rating_menu}>
				{new Array(max).fill(null).map((__, index) => {
					let key = index + 1
					return (
						<label htmlFor={`rating${key}`} key={`rating${key}`}>
							<input
								type="checkbox"
								id={`rating${key}`}
								name="rating"
								value={key}
								defaultChecked
								onClick={() => {
									updateRange()
								}}
								className={index === min || index === max - 1 ? styles.range_limit : ""}
							/>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-labelledby={`star_icon_${key}`} role="img">
								<title id={`star_icon_${key}`}>Select {key} star reviews.</title>
								<path className="cls-1" d="M510.37,183.83a21.33,21.33,0,0,0-19.71-13.17H334.79L276,13.84a21.33,21.33,0,0,0-39.95,0L177.21,170.66H21.33A21.33,21.33,0,0,0,6.25,207.08L125.71,326.54,86,485.48A21.34,21.34,0,0,0,119.07,508L256,410.21,392.93,508A21.34,21.34,0,0,0,426,485.48L386.29,326.54,505.75,207.08A21.33,21.33,0,0,0,510.37,183.83Z" />
							</svg>
						</label>
					)
				})}
			</span>
		</section>
	)
}

export const CustomRatingMenu = connectRange(RatingMenu)
