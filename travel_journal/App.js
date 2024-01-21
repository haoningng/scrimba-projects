import React from "react"
import Navbar from "./Components/Navbar"
import Card from "./Components/Card"
import data from "./data"

export default function App(){
    let i = 0;
    const cards = data.map(item => {
        return <Card 
            key={++i}
            img={item.imageUrl}
            location={item.location}
            map={item.googleMapsUrl}
            title={item.title}
            startDate={item.startDate}
            endDate={item.endDate}
            description={item.description}
            />
    })
    return (
        <div>
            <Navbar />
            {cards}
        </div>
    )
}