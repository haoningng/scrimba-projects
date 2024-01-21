import React from "react"

export default function Card(props) {
    console.log(props)
    return (
        <div className="card-slot">
            <img className="travel-photo" src={props.img}/>
            <div className="card-right">
                <div className="location-text">
                    <p className="location"><span>
                    <img className="map-logo" src="../Images/map-icon.jpg"/>
                    </span>   {props.location.toUpperCase()}</p>
                    <a href={props.map}>View on Google Maps</a>
                </div>
                <h2 className="title">{props.title}</h2>
                <p className="date">{props.startDate} - {props.endDate}</p>
                <p className="description">{props.description}</p>
            </div>
        </div>
    )
}