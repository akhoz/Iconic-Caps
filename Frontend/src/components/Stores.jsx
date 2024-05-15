import PropTypes from 'prop-types';

function Stores (props) {
    const storeIndex = props.storeIndex;

    return (
        <div className={`flex w-full ${storeIndex % 2 === 0 ? 'flex-row-reverse text-right bg-white text-black' : 'flex-row text-left bg-black text-white relative'}`}>
            <div className="w-2/5 p-5">
                <img src={props.imgSrc} alt={props.imgSrc} className="w-full h-full object-cover rounded-lg"/>
            </div>
            <div
                className={`w-1/3 px-5 py-8 flex ${storeIndex % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} justify-between w-full`}>
                <div className="flex flex-col mb-5 w-1/2">
                    <h2 className="text-xl font-semibold">
                        {props.name}
                    </h2>
                    <p className={`${storeIndex % 2 === 0 ? 'ml-20' : 'mr-20'} text-justify`}>
                        {props.description}
                    </p>
                </div>
                <div className="w-1/3">
                    <h3 className="text-xl font-semibold">Employees</h3>
                    <div className='flex flex-col'>
                        {props.employees.map((employee, index) => (
                            <p key={index}>{employee}</p>
                        ))}
                    </div>
                </div>
                <div className="w-1/3">
                    <div>
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <p>
                            <ul>
                                <li>{props.phone}</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
            <a
                href={props.location}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute ${storeIndex % 2 === 0 ? 'left-5' : 'bottom-5 right-5'}`}>
                <button
                    className={` ${storeIndex % 2 === 0 ? 'bg-black text-white' : 'bg-white text-black'} font-bold py-2 px-4 rounded mb-1 mt-1 duration-300 transition-transform transform hover:scale-110`}>
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