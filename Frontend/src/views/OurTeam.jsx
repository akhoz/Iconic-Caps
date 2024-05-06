import React from "react";
import DeveloperCard from "../components/Cards"; 

function OurTeam() {
    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-wrap justify-center gap-8">
                <DeveloperCard
                    name="Adrian Villalobos"
                    image="/img/adrian.jpeg"
                    description="Adrian is an expert developer and he has autism."
                    ig="https://www.instagram.com/adrian_jvp25/"
                    x="https://twitter.com/akhoz69"
                    github= "https://github.com/akhoz"

                />

                <DeveloperCard
                    name="Ramchel Ortiz"
                    image="/img/ram.png"
                    description="Ram is a developer and is in love with Fernanda Vazquez."
                    ig="https://www.instagram.com/ortizbarquero/"
                    x="https://twitter.com/OrtizRamchel"
                    github="https://github.com/RamchelOrtiz"
                />

                <DeveloperCard
                    name="Hector Caravaca"
                    image="/img/hector.png"
                    description="Hector is a developer and thinks he is Andrew Tate."
                    ig="https://www.instagram.com/hector_caravaca/"
                    x="https://twitter.com/hector_cv13"
                    github="https://github.com/hectorcaravacavargas"

                />
            </div>
        </div>
    );
}

export default OurTeam;
