import React from "react"
import { Link } from "gatsby"

import "./calendar.css"

// TODO: Give days specific background if post exists

const Calendar = ({ month, year }) => {
    let calendarDays = []
    let monthLookup = {
        'January': '01',
        'February': '02',
        'March': '03',
        'April': '04',
        'May': '05',
        'June': '06',
        'July': '07',
        'August': '08',
        'September': '09',
        'October': '10',
        'November': '11',
        'December': '12'
    }
    let numDays = new Date(year, monthLookup[month], 0).getDate();
    let firstDayOfMonth = new Date(year, monthLookup[month], 0).getDay();
    // Creates offset to align with right day of the week; +6 accounts for Sunday being first day of the week in JS
    firstDayOfMonth === 0 ? firstDayOfMonth = firstDayOfMonth + 6 : firstDayOfMonth = firstDayOfMonth - 1
    numDays = numDays + firstDayOfMonth
    let j = 0
    for (let i = 0; i < numDays; i++) {
        if(i < firstDayOfMonth){
            calendarDays.push(<li>&nbsp;</li>)
        } else {
            calendarDays.push(<li>{j + 1 < 10 ? "0" + (j + 1) : j + 1}</li>)
            j++
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

