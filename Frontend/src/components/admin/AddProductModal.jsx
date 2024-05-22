import {IoClose} from "react-icons/io5";
import PropTypes from "prop-types";
import {useCallback, useEffect, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import DragFileArea from "../DragFileArea.jsx";
import { GiBilledCap } from "react-icons/gi";
import axios from "axios";

function AddProductModal(props) {
    const URI = 'http://localhost:8000/productos';

    const [lastUploadedFile, setLastUploadedFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        const lastFile = acceptedFiles[acceptedFiles.length - 1];
        setFileName(lastFile.name)
        setLastUploadedFile(URL.createObjectURL(lastFile));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const [model, setModel] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);

    const [invalidProduct, setInvalidProduct] = useState(false);
    const [invalidBrand, setInvalidBrand] = useState(false);
    const [invalidCategory, setInvalidCategory] = useState(false);
    const [invalidStock, setInvalidStock] = useState(false);
    const [invalidPrice, setInvalidPrice] = useState(false);
    const [invalidImage, setInvalidImage] = useState(false);


    const handleModelChange = (event) => {
        setModel(event.target.value);
        setInvalidProduct(false);
    }

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
        setInvalidBrand(false);
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setInvalidCategory(false);
    }

    const handleStockChange = (event) => {
        setStock(event.target.value);
        setInvalidStock(false);
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
        setInvalidPrice(false);
    }

    useEffect(() => {
        if (lastUploadedFile) {
            setInvalidImage(false);
        }
    }, [lastUploadedFile]);


    const handleAddProduct = async () => {
        if (model === '') {
            setInvalidProduct(true);
            return;
        }
        setInvalidProduct(false);
        if (brand === '') {
            setInvalidBrand(true);
            return;
        }
        setInvalidBrand(false);
        if (category === '') {
            setInvalidCategory(true);
            return;
        }
        setInvalidCategory(false);
        if (stock === 0) {
            setInvalidStock(true);
            return;
        }
        setInvalidStock(false);
        if (price === 0) {
            setInvalidPrice(true);
            return;
        }
        setInvalidPrice(false);
        if (lastUploadedFile === null) {
            setInvalidImage(true);
            return;
        }
        setInvalidImage(false);
        const res = await axios.post(URI, {
            Modelo: model,
            Categoria: brand,
            Precio: price,
            ExistenciasDisponibles: stock,
            Img: fileName,
        });
        console.log('Product added');
    }

    return (
        <div className="flex flex-row relative rounded-lg overflow-hidden w-4/5" data-aos="zoom-in">
            <div className="flex flex-col items-center justify-center bg-white w-1/2 py-5 overflow-hidden">
                <h1 className="text-2xl font-bold">
                    Add Product
                </h1>
                <p className="text-md mt-3 w-1/2 text-center">
                    Fill the following fields to add a new product to the store
                </p>
                <input
                    type="text"
                    id="model"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow duration-500
                        ${invalidProduct ? 'border-b-red-500' : ''}`}
                    placeholder="Product Model"
                    onChange={handleModelChange}
                />
                {invalidProduct && (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid product model
                    </p>
                )}
                <input
                    type="text"
                    id="brand"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow
                        ${invalidBrand ? 'border-b-red-500' : ''}`}
                    placeholder="Product Brand"
                    onChange={handleBrandChange}
                />
                {invalidBrand && (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid product brand
                    </p>
                )}
                <input
                    type="text"
                    id="category"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow
                        ${invalidCategory ? 'border-b-red-500' : ''}`}
                    placeholder="Product Category"
                    onChange={handleCategoryChange}
                />
                {invalidCategory && (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid product category
                    </p>
                )}
                <div className="w-1/2 flex flex-row space-x-3">
                    <div className="flex flex-col w-1/2">
                        <input
                            type="number"
                            id="stock"
                            className={`w-full border-0 border-b-2 p-1 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 remove-arrow
                        ${invalidStock ? 'border-b-red-500 mt-8' : 'my-8'}`}
                            placeholder="Initial Stock"
                            onChange={handleStockChange}
                        />
                        {invalidStock && (
                            <p className="text-red-500 text-sm text-start mb-2" data-aos="fade-down">
                                Invalid product stock
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col w-1/2">
                        <input
                            type="number"
                            id="price"
                            className={`w-full border-0 border-b-2 p-1 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 remove-arrow
                        ${invalidPrice? 'border-b-red-500 mt-8' : 'my-8'}`}
                            placeholder="Price"
                            onChange={handlePriceChange}
                        />
                        {invalidPrice && (
                            <p className="text-red-500 text-sm text-start mb-2" data-aos="fade-down">
                                Invalid product price
                            </p>
                        )}
                    </div>
                </div>
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
                    ${invalidProduct || invalidBrand || invalidCategory || invalidStock || invalidPrice || invalidImage ? 'hover:bg-red-500' : 'hover:bg-white hover:text-black hover:border hover:border-black'}`}
                    onClick={handleAddProduct}>
                    Add Product
                </button>
            </div>
            <div className="flex flex-row items-center justify-start bg-white w-1/2 py-20 overflow-hidden">
                <div className="flex flex-row justify-start items-center">
                    {lastUploadedFile && (
                    <img
                        src={lastUploadedFile ? lastUploadedFile : ''}
                        className="object-cover w-1/2"/>
                    )}
                    {!lastUploadedFile && (
                        <GiBilledCap className="text-9xl mr-5"/>
                    )}
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl">
                            {model ? model : 'XY1' }
                        </h1>
                        <p className="text-black text-md">
                            {brand ? brand : 'Brand'}
                        </p>
                        <p className="text-gray-600 text-md">
                            {`Category: ${category}`}
                        </p>
                        <p className="text-gray-600 text-md">
                            {`Initial stock: ${stock}`}
                        </p>
                        <hr className="border-1 border-gray-300 my-1 w-full"/>
                        <p className="font-bold text-md">
                            {`$${price}`}
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


AddProductModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
};


export default AddProductModal;