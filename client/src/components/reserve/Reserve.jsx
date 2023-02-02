import React, { useContext, useState } from 'react'
import './reserve.css'
import { AiFillCloseCircle } from 'react-icons/ai'
import useFetch from '../../Hookes/useFetch'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Reserve = ({ setOpen, hotelId }) => {

    const { data, loading, error } = useFetch(`/room/${hotelId}`)

    const Navigate = useNavigate()
    const [selectedRooms, setSelectedRooms] = useState([])

    console.log("🚀 ~ file: Reserve.jsx:10 ~ Reserve ~ data", data)

    const { dates } = useContext(SearchContext)
    const getDateInRange = (startDate, endDate) => {
        const start = new Date(startDate)

        const date = new Date(start.getTime())

        const end = new Date(endDate)

        const dates = []

        while (date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }

        return dates
    }


    const allDates = getDateInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) => allDates.includes(new Date(date).getTime()))

        return !isFound
    }
    const handleSelect = (e) => {

        const checked = e.target.checked;
        const value = e.target.value

        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value))
    }

    console.log(selectedRooms)



    const handleClick = async () => {

        try {
            await Promise.all(selectedRooms.map(roomId => {
                const res = axios.put(`/room/availability/${roomId}`, {
                    dates: allDates
                });
                return res.data
            }))

            setOpen(false)

            Navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="reserve">

            <div className="rContainer">
                <AiFillCloseCircle size={30} className='rClose' onClick={() => setOpen(false)} />

                <span>
                    Select your rooms:
                </span>

                {data.map((item) => (
                    <div className="rItem">

                        <div className="rItemInfo">
                            <div className="rItem">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">
                                Max People <b> {item.maxPeople}</b>
                            </div>
                            <div className="rPrice">{item.price}</div>
                        </div>

                        <div className="rSelectRooms">


                            <div className="room">
                                {item.roomsNumbers.map((roomNumber) => (
                                    <div className="room">
                                        <label htmlFor="">{roomNumber.number}</label>
                                        <input type='checkbox' value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                                    </div>
                                )

                                )}

                                <button onClick={handleClick} className="rButton">
                                    Reserve Now!
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reserve