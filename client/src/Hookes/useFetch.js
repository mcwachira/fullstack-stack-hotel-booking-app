import axios from 'axios'
import { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)



    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)

                const res = await axios.get(url)

                setData(res.data)


            } catch (error) {
                setError(error)
                console.log(error)
            }
            setLoading(false)
        }


        fetchData()
    }, [url])

    const reFetch = async () => {
        try {
            setLoading(true)

            const res = await axios.get(url)

            setData(res.data)


        } catch (error) {
            setError(error)
            console.log(error)
        }
        setLoading(false)
    }


    return { data, loading, error, reFetch }
}


export default useFetch