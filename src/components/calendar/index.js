import React from "react"
import { Link } from "gatsby"

import "./calendar.css"

// TODO: Give days specific background if post exists

const Calendar = ({ month, year }) => {
	let calendarDays = []
	let monthLookup = {
		January: "01",
		February: "02",
		March: "03",
		April: "04",
		May: "05",
		June: "06",
		July: "07",
		August: "08",
		September: "09",
		October: "10",
		November: "11",
		December: "12"
	}
	// Work in two ways: months in JS start at 0, so passing in "April" returns "4", which gives you May. By setting day value to "0" it's equivalent to "1st of May - 1", so lets us get the month we expects (i.e. April) last day and therefore the month length. For the first day, we specify day 1 on the month before to account of JS 0-indexed the month array.
	let numDays = new Date(year, monthLookup[month], 0).getDate()
	let firstDayOfMonth = new Date(year, monthLookup[month] - 1, 1).getDay()
	// Creates offset to align with right day of the week; +6 accounts for Sunday being first day of the week in JS; -1 aligns with a 0-index i value
	firstDayOfMonth === 0 ? (firstDayOfMonth = firstDayOfMonth + 6) : (firstDayOfMonth = firstDayOfMonth - 1)
	numDays = numDays + firstDayOfMonth
	let dayNumeric = 1
	for (let i = 0; i < numDays; i++) {
		if (i < firstDayOfMonth) {
			calendarDays.push(<li>&nbsp;</li>)
		} else {
			calendarDays.push(<li>{dayNumeric < 10 ? "0" + dayNumeric : dayNumeric}</li>)
			dayNumeric++
		}
	}
	return (
		<ul className="calendar-list">
			<li className="calendar-title">M</li>
			<li className="calendar-title">T</li>
			<li className="calendar-title">W</li>
			<li className="calendar-title">T</li>
			<li className="calendar-title">F</li>
			<li className="calendar-title">S</li>
			<li className="calendar-title">S</li>
			{calendarDays}
		</ul>
	)
}

export default Calendar
