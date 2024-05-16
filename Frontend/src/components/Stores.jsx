import PropTypes from 'prop-types';

function Stores (props) {
    const storeIndex = props.storeIndex;

    return (
        <div className={`flex justify-center items-center md:items-start md:justify-start ${storeIndex % 2 === 0 ? 'bg-white text-black' : 'bg-black text-white'} relative py-5 md:py-10 lg:py-20`}>
            <div
                className={`flex w-full flex-col items-center justify-center mb-10 md:mb-0
                ${storeIndex % 2 === 0 ? 'md:flex-row-reverse text-right bg-white text-black' : 'md:flex-row text-left bg-black text-white'}`}>
                <div className="w-1/2 md:w-2/5 p-5">
                    <img src={props.imgSrc} alt={props.imgSrc} className="w-full h-full object-cover rounded-lg"/>
                </div>
                <div
                    className={`w-1/3 px-5 py-8 flex flex-col ${storeIndex % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} justify-center items-center md:items-start md:justify-between w-full`}>
                    <div className={`flex flex-col mb-5 w-1/2 justify-center items-center ${storeIndex % 2 === 0 ? 'md:items-start' : 'md:items-start'}`}>
                        <h2 className={`text-xl font-semibold ${storeIndex % 2 === 0 ? 'md:ml-20' : 'md:ml-0'}`}>
                            {props.name}
                        </h2>
                        <p className={`${storeIndex % 2 === 0 ? 'md:ml-20' : 'md:mr-20'} text-justify`}>
                            {props.description}
                        </p>
                    </div>
                    <div className={`flex ${storeIndex % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-start md:w-1/2`}>
                        <div className="w-1/2 flex flex-col items-center justify-center md:items-start md:justify-start">
                            <h3 className="text-xl font-semibold">
                                Employees
                            </h3>
                            <div className='flex flex-col'>
                                {props.employees.map((employee, index) => (
                                    <p
                                        key={index}
                                        className="text-center md:text-start">
                                        {employee}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="w-1/2 items-center justify-center md:items-start md:justify-start">
                            <div className="w-full">
                                <h3 className="text-xl text-center font-semibold">Contact Us</h3>
                                <p className="text-center">
                                    <ul>
                                        <li>{props.phone}</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a
                href={props.location}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute ${storeIndex % 2 === 0 ? 'bottom-5 md:left-5' : 'bottom-5 md:right-5'}`}>
                <button
                    className={` ${storeIndex % 2 === 0 ? 'bg-black text-white' : 'bg-white text-black'} font-bold py-2 px-4 rounded-3xl
                     mb-1 mt-1 duration-300 transition-transform transform hover:scale-110`}>
                    See in the Map
                </button>
            </a>
        </div>
    );
}

Stores.propTypes = {
    storeIndex: PropTypes.number,
    imgSrc: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    employees: PropTypes.arrayOf(PropTypes.string),
    phone: PropTypes.string,
    location: PropTypes.string
};

export default Stores;