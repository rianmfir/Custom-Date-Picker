import React, { useState } from 'react'
import Topbar from '../components/Topbar'
import { schedule } from '../helpers';

const HomePage = () => {
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

    const handleShow = (value) => {
        setShow(state => !state);
        setSelectedDate(value ? value : selectedDate)
    };

    const handleClear = () => {
        setSelectedDate("");
    }
    let filtered = schedule.filter(str => str.includes(selectedDate))


    return (
        <>
            <Topbar
                show={show}
                handleShow={handleShow}
                handleClear={handleClear}
                selectedDate={selectedDate}
            />
            <div>
                {
                    filtered.map((state, i) => {
                        return (
                            <p key={i} className={`alert alert-${i % 2 === 0 ? 'primary' : "secondary"}`}>
                                {state}
                            </p>
                        )
                    })
                }
            </div>
        </>
    )
}

export default HomePage