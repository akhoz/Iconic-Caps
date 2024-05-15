import PropTypes from 'prop-types';
import {useState} from "react";

function Stores (props) {
const storeIndex = props.storeIndex;

    return (
        <div className={`flex w-full ${storeIndex % 2 === 0  ? 'bg-white flex-row-reverse text-black text-right' : 'flex-row bg-black text-white text-left'}`}>
            <div className="w-2/5 p-5">
                <img src={props.imgSrc} alt={props.imgSrc} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="w-3/5 px-5 py-8 flex flex-col justify-between">
                <div className="mb-5">
                    <h2 className="text-xl font-semibold">
                        {props.name}
                    </h2>
                    <p className={`${storeIndex % 2 === 0 ? 'ml-60' : 'mr-60'}`}>
                        {props.description}
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Employees</h3>
                    <div className='flex flex-col'>
                        {props.employees.map((employee, index) => (
                            <p key={index}>{employee}</p>
                        ))}
                    </div>
                    <div className="mt-5">
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <p>
                            <ul>
                                <li>{props.phone}</li>
                            </ul>
                        </p>
                    </div>
                    <div>
                        <a href={props.location} target="_blank" rel="noopener noreferrer">
                            <button className={` ${storeIndex % 2 === 0 ? 'bg-black text-white' : 'bg-white text-black'} font-bold py-2 px-4 rounded mb-1 mt-1 duration-300 transition-transform transform hover:scale-110`}>
                                See in the Map
                            </button>
                        </a>
                    </div>
                </div>
            </div>
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