import React from "react"
import { Link } from "gatsby"

import "./calendar.css"

const Calendar = ({ numDays }) => {
    let calendarDays = []
    for (let i = 0; i < numDays; i++) {
        calendarDays.push(<li>{i + 1}</li>)
    }
    return (
        <ul>
            {calendarDays}
        </ul>
    )
}

export default Calendar

