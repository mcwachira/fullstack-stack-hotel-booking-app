import React, { useState } from 'react'
import './header.css'
import { FaBed, FaPlane, FaCar, FaTaxi, FaCalendarDay } from 'react-icons/fa'
import { GiPerson } from 'react-icons/gi'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
const Header = ({ type }) => {

    const [openDate, setOpenDate] = useState(false)

    const [openOptions, setOpenOptions] = useState(false)
    const [destination, setDestination] = useState('')

    const [options, setOption] = useState({

        adult: 1,
        children: 1,
        room: 1,
    })

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);


    const Navigate = useNavigate()

    const handleOptions = (name, operation) => {
        setOption((prev) => {
            return {
                ...prev,
                [name]: operation === 'i' ? options[name] + 1 : options[name] - 1
            }
        })
    }

    const handleSearch = () => {
        Navigate('/hotels', { state: { destination, options, date } })
    }

    return (
        <div className="header">

            <div className={type === "list" ? "headerContainer listMode" : 'headerContainer'}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FaBed size={30} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FaPlane size={30} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FaCar size={30} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FaBed size={30} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FaTaxi size={30} />
                        <span>Airport taxis</span>
                    </div>
                </div>

                {type !== 'list' && (
                    <>
                        <h1 className="headerTitle">
                            A lifetime of discounts? It's Genius.
                        </h1>
                        <p className="headerDesc">
                            Get rewarded for your travels – unlock instant savings of 10% or
                            more with a free Massai booking account
                        </p>
                        <button className="headerBtn">Sign in / Register</button>
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FaBed size={30} className="headerIcon" />
                                <input
                                    type="text"
                                    placeholder="Where are you going?"
                                    className="headerSearchInput"
                                    onChange={(e) => setDestination(e.target.value)}

                                />
                            </div>
                            <div className="headerSearchItem">
                                <FaCalendarDay size={30} className="headerIcon" />
                                <span className="headerSearchText" onClick={() => setOpenDate(!openDate)}>
                                    {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}
                                </span>
                                {openDate &&
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={item => setDate([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={date}
                                        className='date'
                                    />}
                            </div>
                            <div className="headerSearchItem">
                                <GiPerson size={30} className="headerIcon" />
                                <span className="headerSearchText" onClick={() => setOpenOptions(!openOptions)}>
                                    {`${options.adult} adult - ${options.children} children - ${options.room} room`}
                                </span>

                                {openOptions && <div className="options">
                                    <div className="optionItem">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCounter">
                                            <button
                                                disabled={options.adult <= 1}
                                                onClick={() => handleOptions('adult', 'd')} className="optionCounterButton">-</button>
                                            <span className="optionCounterNumber">{options.adult}</span>
                                            <button onClick={() => handleOptions('adult', 'i')} className="optionCounterButton">+</button>
                                        </div>

                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Children </span>
                                        <div className="optionCounter">
                                            <button disabled={options.children <= 0} onClick={() => handleOptions('children', 'd')} className="optionCounterButton">-</button>
                                            <span className="optionCounterNumber">{options.children}</span>
                                            <button onClick={() => handleOptions('children', 'i')} className="optionCounterButton">+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText"> Room </span>
                                        <div className="optionCounter">
                                            <button disabled={options.room <= 1} onClick={() => handleOptions('room', 'd')} className="optionCounterButton">-</button>
                                            <span className="optionCounterNumber">{options.room}</span>
                                            <button onClick={() => handleOptions('room', 'i')} className="optionCounterButton">+</button>
                                        </div>
                                    </div>
                                </div>}

                            </div>

                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>
                                    Search
                                </button>
                            </div>

                        </div>
                    </>
                )


                }
            </div>

        </div>
    )
}

export default Header