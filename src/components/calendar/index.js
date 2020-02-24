import React from "react"
import { Link } from "gatsby"

import "./calendar.css"

const Calendar = ({ numDays }) => {
    let calendarDays = []
    for (let i = 0; i < numDays; i++) {
        calendarDays.push(<li>{i + 1 < 10 ? "0" + (i + 1) : i + 1}</li>)
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

