import DeveloperCard from "../components/DeveloperCard";

function OurTeam() {
    return (
        <div className="container mx-auto py-8" data-aos="zoom-in">
            <h1 className="text-4xl font-bold text-center">Our Team</h1>
            <div className="text-center mb-8 mt-2 ml-4 mr-4 lg:text-xl lg:text-center md:text-center md:text-xl sm:text-center sm:ml-4 sm:mr-4">We are a team of developers who are passionate about technology and programming. We are committed to creating innovative solutions that meet the needs of our customers.</div>
            
            <div className="flex flex-wrap justify-center gap-8 mb-10 mt-10">
                <DeveloperCard
                    name="Adrian Villalobos"
                    image="/img/adrian.jpeg"
                    description="Adrian is a multi-skilled developer with a unique vision on problem solving."
                    ig="https://www.instagram.com/adrian_jvp25/"
                    x="https://twitter.com/akhoz69"
                    github= "https://github.com/akhoz"

                />

                <DeveloperCard
                    name="Ramchel Ortiz"
                    image="/img/ram.png"
                    description="Ramchel is a developer passionate about front end, with multiple experience in the sector."
                    ig="https://www.instagram.com/ortizbarquero/"
                    x="https://twitter.com/OrtizRamchel"
                    github="https://github.com/RamchelOrtiz"
                />

                <DeveloperCard
                    name="Hector Caravaca"
                    image="/img/hector.png"
                    description="Héctor Adrian is a multi-skilled developer with a unique vision on problem solving."
                    ig="https://www.instagram.com/hector_caravaca/"
                    x="https://twitter.com/hector_cv13"
                    github="https://github.com/hectorcaravacavargas"

                />
            </div>
        </div>
    );
}

export default OurTeam;
