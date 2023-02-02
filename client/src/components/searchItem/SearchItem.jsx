import React from 'react'
import { Link } from 'react-router-dom';

import "./searchItem.css";

const SearchItem = ({ item }) => {
    console.log(item)
    return (
        <div className="searchItem">
            <img
                src={item?.pictures[0]}
                alt=""
                className="siImg"
            />
            <div className="siDesc">
                <h1 className="siTitle">{item?.name}</h1>
                <span className="siDistance">{item?.distance} km from center</span>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">
                    {item?.description}
                </span>
                <span className="siFeatures">
                    Entire studio • 1 bathroom • 21m² 1 full bed
                </span>
                <span className="siCancelOp">Free cancellation </span>
                <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="siDetails">
                <div className="siRating">
                    <span>Excellent</span>
                    <button>{item?.rating}</button>
                </div>
                <div className="siDetailTexts">
                    <span className="siPrice">{item?.cheapestPrice}</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <Link className="siCheckButton" to={`/hotels/${item._id}`}>
                        See availability
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default SearchItem;