import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import axios from "axios";
import { FaStore } from "react-icons/fa";
import {IoClose} from "react-icons/io5";
import {FaS} from "react-icons/fa6";

function AddStoreModal(props) {
    const URI = 'http://localhost:8000/sucursales';
    const [sucursales, setSucursales] = useState([]);

    const [lastUploadedFile, setLastUploadedFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        const lastFile = acceptedFiles[acceptedFiles.length - 1];
        setFileName(lastFile.name);
        console.log(lastFile.name)
        console.log(fileName)
        setLastUploadedFile(URL.createObjectURL(lastFile));
    }, []);


    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const [storeName, setStoreName] = useState('');
    const [phone, setPhone] = useState('');
    const [gmURL, setGMURL] = useState('');
    const [location, setLocation] = useState('');



    const [invalidName, setInvalidName] = useState(false);
    const [invalidPhone, setInvalidPhone] = useState(false);
    const [invalidURL, setInvalidURL] = useState(false);
    const [invalidLocation, setInvalidLocation] = useState(false);
    const [invalidImage, setInvalidImage] = useState(false);

    const handleNameChange = (e) => {
        setStoreName(e.target.value);
        setInvalidName(false);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        setInvalidPhone(false);
    }

    const handleURLChange = (e) => {
        setGMURL(e.target.value);
        setInvalidURL(false);
    }

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
        setInvalidLocation(false);
    }

    useEffect(() => {
        if (lastUploadedFile) {
            setInvalidImage(false);
        }
    }, [lastUploadedFile]);

    useEffect(() => {
        getSucursales();
    }, []);

    const getSucursales = async () => {
        try {
            const res = await axios.get(URI);
            console.log(res.data);
            setSucursales(res.data);
        } catch (error) {
            console.log('Error fetching stores');
        }
    }

    const handleAddStore = async () => {
        if (!storeName) {
            setInvalidName(true);
            return;
        }
        setInvalidName(false);
        if (sucursales.find(sucursal => sucursal.Nombre === storeName)) {
            setInvalidName(true);
            return;
        }
        setInvalidName(false);
        if (!phone) {
            setInvalidPhone(true);
            return;
        }
        setInvalidPhone(false);
        if (!gmURL) {
            setInvalidURL(true);
            return;
        }
        setInvalidURL(false);
        if (!location) {
            setInvalidLocation(true);
            return;
        }
        setInvalidLocation(false);
        if (!lastUploadedFile) {
            setInvalidImage(true);
            return;
        }
        setInvalidImage(false);
        console.log('Add store');
        const res = await axios.post(URI, {
            Nombre: storeName,
            NumeroTelefono: phone,
            LinkGoogleMaps: gmURL,
            Direccion: location,
            Img: lastUploadedFile
        });
        console.log(res);
    }

    return (
        <div className="flex flex-row relative rounded-lg overflow-hidden w-4/5 h-10/12" data-aos="zoom-in">
            <div className="flex flex-col items-center justify-center bg-white w-1/2 py-5 overflow-hidden">
                <h1 className="text-2xl font-bold">
                    Add Store
                </h1>
                <p className="text-md mt-3 w-1/2 text-center">
                    Fill the following fields to add a new store
                </p>
                <input
                    type="text"
                    id="name"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow duration-500
                        ${invalidName ? 'border-b-red-500' : ''}`}
                    placeholder="Store Name"
                    onChange={handleNameChange}
                />
                {invalidName && (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid store name
                    </p>
                )}
                <input
                    type="number"
                    id="phone"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow
                        ${invalidPhone ? 'border-b-red-500' : ''}`}
                    placeholder="Phone Number"
                    onChange={handlePhoneChange}
                />
                {invalidPhone && (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid phone number
                    </p>
                )}
                <input
                    type="text"
                    id="url"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow
                        ${invalidURL ? 'border-b-red-500' : ''}`}
                    placeholder="Google Maps URL"
                    onChange={handleURLChange}
                />
                {invalidURL && (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid Google Maps URL
                    </p>
                )}
                <textarea id="location" rows="2"
                          className={`p-2 w-1/2 text-sm text-gray-900 border rounded-lg focus:ring-0 focus:outline-none my-8
                            ${invalidLocation ? 'border-b-red-500' : 'border-b-gray-300'}`}
                          placeholder="Store Location" required
                          onChange={handleLocationChange}>
                </textarea>
                {invalidLocation&& (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid store location
                    </p>
                )}
                <div
                    {...getRootProps()}
                    className={`flex items-center justify-center rounded-lg overflow-hidden w-1/2 border
                        ${invalidImage ? 'border-red-500' : 'border-gray-300'}`}
                >
                    <input {...getInputProps()} className="w-fit"/>
                    {!lastUploadedFile && (
                        <p className="text-center w-full py-2 px-3">
                            Drag the product image here
                        </p>
                    )}
                    {lastUploadedFile && (
                        <p className="text-center w-full py-2 px-3">
                            {`Image uploaded: ${fileName}`}
                        </p>
                    )}
                </div>
                <button className={`mt-8 rounded-lg w-1/2 py-3 duration-500 bg-black text-white
                    ${invalidName || invalidPhone || invalidLocation || invalidLocation || invalidURL ? 'hover:bg-red-500' : 'hover:bg-white hover:text-black hover:border hover:border-black'}`}
                        onClick={handleAddStore}>
                    Add Product
                </button>
            </div>
            <div className="flex flex-row items-center justify-start bg-white w-1/2 py-20 overflow-hidden">
                <div className="flex flex-row justify-start items-center">
                    {lastUploadedFile && (
                        <img
                            src={lastUploadedFile ? lastUploadedFile : ''}
                            className="object-cover w-1/3 mr-5 rounded-xl"/>
                    )}
                    {!lastUploadedFile && (
                        <FaStore className="text-9xl mr-5"/>
                    )}
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl">
                            {storeName ? storeName : 'Iconic Store' }
                        </h1>
                        <p className="text-black text-md">
                            {`Phone Number: ${phone ? phone : '000-000-0000'}`}
                        </p>
                        <p className="text-gray-600 text-xs w-1/2">
                            {location ? location : 'Store Location'}
                        </p>
                    </div>
                </div>
            </div>
            <button
                onClick={props.handleCloseModal}
                className="absolute right-5 top-5 text-xl text-black transition-transform transform hover:scale-150">
                <IoClose/>
            </button>
        </div>
    );
}

AddStoreModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
}

export default AddStoreModal;