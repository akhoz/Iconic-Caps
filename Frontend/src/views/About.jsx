
import AboutImage from "../../public/img/about-banner.png";
import Line from "../../public/img/line.png";


function About() {
    return (
        <div className="flex flex-col justify-start items-center w-screen min-h-screen">
            
            <div className="bg-about bg-contain bg-no-repeat bg-start w-full h-24 flex justify-center items-center lg:h-96">
                <p className="text-white text-xl font-bold text-center lg:text-5xl">We Are Iconic</p>
            </div>
            
            <div className="text-center p-4 lg:mx-96">
                <h1 className="text-xl font-bold lg:text-4xl">History</h1>
                <p className="text-black lg:mx-52 lg:text-2xl">Iconic Caps was founded in 2024 and is a company that promotes values such as discipline and sportsmanship.</p>
            </div>
            
            <img src={Line} alt="Line" className="w-9 object-cover"/>
            
            <div className="text-center p-4 lg:mx-96" >
                <h1 className="text-xl font-bold lg:text-4xl">Mission</h1>
                <p className="text-gray-600 lg:mx-52 lg:text-2xl">We are a premium cap store offering top-quality caps from various categories and leading brands.</p>
            </div>
            
            <img src={Line} alt="Line" className="w-9 object-cover"/>
            
            <div className="text-center p-4 lg:mx-96">
                <h1 className="text-xl font-bold lg:text-4xl">Colaborations</h1>
                <p className="text-gray-600 lg:mx-52 lg:text-2xl">Throughout our years of history, renowned brands like Nike and professional sports teams such as Real Madrid and AC Milan have collaborated with Iconic Caps, showcasing the commitment and quality we offer.</p>
            </div>
        </div>
    );
}

export default About;