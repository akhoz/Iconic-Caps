import React from "react";
import DeveloperCard from "../components/Cards.jsx";
import Header from '../components/Header.jsx';


const DevelopersInformation = {
    "developers": [
        {
            "name": "Adrian Villalobos",
            "imageUrl": "../../public/img/adrian.jpeg",
            "description": "Adrian is a developer and has autism."
        },
        {
            "name": "Ramchel Ortiz",
            "imageUrl": "../../public/img/ram.png",
            "description": "Ramchel is a developer and is in love with Fernanda"
        },
        {
            "name": "Héctor Caravaca",
            "imageUrl": "../../public/img/hector.png",
            "description": "Hector is developer and think is Andrew Tate"
        }
    ]
};

function OurTeam () {
    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-wrap justify-center gap-8">
                {DevelopersInformation.developers.map((developer, index) => (
                    <DeveloperCard key={index} name={developer.name} imageUrl={developer.imageUrl} description={developer.description} />
                ))}
            </div>
        </div>
    );
}

export default OurTeam;
