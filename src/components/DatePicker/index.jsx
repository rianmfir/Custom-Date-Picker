/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import './datePicker.css';
import { MdNavigateBefore, MdNavigateNext, } from "react-icons/md";
import { days, months, schedule } from '../../helpers';

const DatePicker = (props) => {

    let data = [...new Set(schedule)];
    let date = new Date();
    const [currYear, setCurrYear] = useState(date.getFullYear())
    const [currMonth, setCurrMonth] = useState(date.getMonth())

    let fisrstDayOfMonth = new Date(currYear, currMonth, 1).getDay();//getting first day of month
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();//getting last date of month
    let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();//getting last date of last month
    let liTag = [];

    const renderCalendar = `${months[currMonth]} ${currYear}`;

    const prevDateOfMonth = () => {
        // let index = 0;
        let filtered = data.filter((str) => {
            return str.includes(
                currMonth <= 0 && currYear
                    ? `${months[11]} ${currYear - 1}`
                    : `${months[currMonth - 1]} ${currYear}`
            )
        });

        let index = filtered.length - 1;
        for (let i = fisrstDayOfMonth; i > 0; i--) {
            let isSchedule = "";
            // let dates = new Date(`
            // ${[(currMonth <= 0 && currYear) ? 12 : currMonth]}
            // /${lastDateOfLastMonth - i + 1}
            // /${[(currMonth <= 0 && currYear) ? currYear - 1 : currYear]}`);

            let dates = new Date(`
            ${[(currMonth <= 0 && currYear) ? 12 : currMonth]}
            /${lastDateOfLastMonth + i - fisrstDayOfMonth}
            /${[(currMonth <= 0 && currYear) ? currYear - 1 : currYear]}`);

            let dayName = dates.toLocaleDateString("id", { weekday: "long" })
            let monthName = dates.toLocaleDateString("id", { month: "long" })

            // let prevMonth = currMonth <= 0 && currYear
            //     ? `${dayName}, ${lastDateOfLastMonth - i + 1} ${monthName} ${currYear - 1}`
            //     : `${dayName}, ${lastDateOfLastMonth - i + 1} ${monthName} ${currYear}`;

            let prevMonth = currMonth <= 0 && currYear
                ? `${dayName}, ${lastDateOfLastMonth + i - fisrstDayOfMonth} ${monthName} ${currYear - 1}`
                : `${dayName}, ${lastDateOfLastMonth + i - fisrstDayOfMonth} ${monthName} ${currYear}`;

            // console.log(lastDateOfLastMonth + i - fisrstDayOfMonth);
            // console.log(`${prevMonth} === ${filtered[index]}`);

            if (`${prevMonth}` === filtered[index]) {
                index--;
                isSchedule = "active"
            }

            liTag.push(<li key={prevMonth} className={`inactive ${isSchedule}`}>{lastDateOfLastMonth - i + 1}</li>);
        }
        // return liTag;
    }

    const currDateOfMonth = () => {
        let index = 0;
        //Adding active event
        let filtered = data.filter((str) => {
            return str.includes(renderCalendar)
        });

        for (let i = 1; i <= lastDateOfMonth; i++) {
            let dates = new Date(`${[currMonth + 1]}/${i}/${currYear}`);
            let dayName = dates.toLocaleDateString("id", { weekday: "long" })
            let monthName = dates.toLocaleDateString("id", { month: "long" })
            let chooseDay = `${dayName}, ${i} ${monthName} ${currYear}`;

            let isSchedule = "";
            if (`${chooseDay}` === filtered[index]) {
                index++;
                isSchedule = "active"
            }

            liTag.push(<li key={chooseDay} className={isSchedule} onClick={() => props.handleShow(chooseDay)}>{i}</li>)
        }
        // return liTag;
    }
    const nextDateOfMonth = () => {
        let index = 0;
        let lastDay = fisrstDayOfMonth + lastDateOfMonth;
        let filtered = data.filter((str) => {
            return str.includes(
                currMonth >= 11 && currYear
                    ? `${months[0]} ${currYear + 1}`
                    : `${months[currMonth + 1]} ${currYear}`
            )
        });
        for (let i = lastDay; i < 42; i++) {
            let isSchedule = "";

            let dates = new Date(`${[(currMonth >= 11 && currYear) ? 1 : currMonth + 2]}/${i - lastDay + 1}/${[(currMonth >= 11 && currYear) ? currYear + 1 : currYear]}`);

            let dayName = dates.toLocaleDateString("id", { weekday: "long" })
            let monthName = dates.toLocaleDateString("id", { month: "long" })
            let nextMonth = currMonth >= 11
                ? `${dayName}, ${i - lastDay + 1} ${monthName} ${currYear + 1}`
                : `${dayName}, ${i - lastDay + 1} ${monthName} ${currYear}`;

            if (`${nextMonth}` === filtered[index]) {
                index++;
                isSchedule = "active"
            }
            liTag.push(<li key={nextMonth} className={`inactive ${isSchedule}`}>{i - lastDay + 1}</li>);
        }
        // return liTag;

    }

    const handlePrev = () => {
        if (currMonth <= 0) {
            return (
                setCurrYear(state => state - 1),
                setCurrMonth(11)
            )
        } else {
            return setCurrMonth(state => state - 1);
        }
    }

    const handleNext = () => {

        if ((currMonth + 1) >= 12) {
            return (
                setCurrYear(state => state + 1),
                setCurrMonth(0)
            )
        } else {
            return setCurrMonth(state => state + 1);
        }

    }

    prevDateOfMonth();
    currDateOfMonth();
    nextDateOfMonth();

    return (
        <>
            <div className={`wrapper ${props.show ? 'd-block' : 'd-none'}`}>
                <header>
                    <p className='current-date'>{renderCalendar}</p>
                    <div className='icons'>
                        <span id='prev' onClick={handlePrev}><MdNavigateBefore /></span>
                        <span id='next' onClick={handleNext}><MdNavigateNext /></span>
                    </div>
                </header>
                <div className="calendar">
                    <ul className="weeks">
                        {days.map((state, index) => <li key={index}>{state}</li>)}
                        {/* {days} */}
                    </ul>
                    <ul className="days">
                        {liTag}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default DatePicker;
