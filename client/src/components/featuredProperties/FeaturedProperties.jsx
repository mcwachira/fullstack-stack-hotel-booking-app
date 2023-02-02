import React from 'react'
import "./featuredProperties.css";
import useFetch from '../../Hookes/useFetch';

const FeaturedProperties = () => {
    const { data, loading, error } = useFetch('/hotels/?featured=true&limit=3')
    console.log(data)



    return (
        <div className="fp">
            {loading ? (<> <h1>Loading ... </h1>   </>) : (
                <>
                    {
                        data.map((item, i) => <>
                            <div  key={item._id} className="fpItem" >
                                <img
                                    src={item.pictures[0]}
                                    alt=""
                                    className="fpImg"
                                />
                                <span className="fpName">{item.name}</span>
                                <span className="fpCity">{item.city}</span>
                                <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                                {item.rating && <div className="fpRating">
                                    <button>{item.rating}</button>
                                    <span>Excellent</span>
                                </div>}
                            </div>
                        </>)}

                </>

            )}



        </div >
    );
};

export default FeaturedProperties;