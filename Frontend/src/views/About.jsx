import Product from "../components/Product.jsx";
import FAQ from "../components/FAQ.jsx";

function About() {
    const line = "img/line.png";

    return (
        <div className="flex flex-col justify-start items-center w-screen min-h-screen">

            <div className="bg-about bg-cover bg-no-repeat bg-start w-full h-full flex justify-center items-center py-10 lg:mb-10 md:py-20 lg:py-0 lg:h-96 relative"
                 data-aos="fade-up">
                <div className="flex justify-center items-center w-full overflow-hidden">
                    <p className="w-full text-white text-xl font-bold text-center lg:text-5xl relative z-10">We Are
                        Iconic</p>
                    <div className="absolute inset-0 bg-black opacity-45"></div>
                </div>
            </div>


            <div className="flex flex-col justify-center items-center text-center py-6 w-5/6" data-aos="fade-up">
                <h1 className="text-xl font-bold lg:text-4xl">History</h1>
                <p className="text-black lg:mx-52 pb-1 lg:pb-3 lg:text-2xl">Iconic Caps was founded in 2024 and is a company that
                    promotes values such as discipline and sportsmanship.</p>
            </div>

            <img src={line} alt="Line" className="w-9 object-cover" data-aos="fade-up"/>

            <div className="flex flex-col justify-center items-center text-center p-6 w-5/6" data-aos="fade-up">
                <h1 className="text-xl font-bold pb-1 lg:pb-3 lg:text-4xl">Mission</h1>
                <p className="text-black lg:mx-52 lg:text-2xl">We are a premium cap store offering top-quality caps
                    from various categories and leading brands.</p>
            </div>

            <img src={line} alt="Line" className="w-9 object-cover" data-aos="fade-up"/>

            <div className="flex flex-col justify-center items-center text-center pt-6 pb-16 w-5/6" data-aos="fade-up">
                <h1 className="text-xl font-bold pb-1 lg:pb-3 lg:text-4xl ">Collaborations</h1>
                <p className="text-black lg:mx-52 lg:text-2xl">Throughout our years of history, renowned brands like
                    Nike and professional sports teams such as Real Madrid and AC Milan have collaborated with Iconic
                    Caps, showcasing the commitment and quality we offer.</p>
            </div>
       
            <div className="text-center my-10">
                <FAQ />
            </div>
        </div>

      
    );
}

export default About;