import PropTypes from 'prop-types';

function Stores (props) {
    return (
        <div className="bg-white p-8">
            <div className="flex flex-row bg-black text-white">
                <div className="w-2/5 p-5">
                    <img src={props.imgSrc} alt="Iconic New York" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="w-3/5 p-5 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">{props.name}</h2>
                        <p>{props.description}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Employees</h3>
                        <ul>
                            <li>{props.employe}</li>
                        </ul>
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">Contact Us</h3>
                            <p>
                                <ul>
                                    <li>{props.email}</li>
                                    <li>{props.phone}</li>
                                </ul>
                            </p>
                        </div>
                        <div>
                            <a href={props.ubication} target="_blank" rel="noopener noreferrer">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-1 mt-1">
                                    See in the Map
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Stores.propTypes = {
    imgSrc: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    employe: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    ubication: PropTypes.string
};

export default Stores;