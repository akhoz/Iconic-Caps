import {IoClose} from "react-icons/io5";
import PropTypes from "prop-types";
import {useCallback, useEffect, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import { IoSearchOutline } from "react-icons/io5";
import { GiBilledCap } from "react-icons/gi";
import axios from "axios";
import product from "../Product.jsx";

function AddProductModal(props) {
    const URI = 'http://localhost:8000/productos';

    const [lastUploadedFile, setLastUploadedFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        const lastFile = acceptedFiles[acceptedFiles.length - 1];
        const formattedFileName = lastFile.name.replace(/\s+/g, '');
        setFileName(formattedFileName.toLowerCase());
        setLastUploadedFile(URL.createObjectURL(lastFile));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const [model, setModel] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);

    const [invalidProduct, setInvalidProduct] = useState(false);
    const [invalidBrand, setInvalidBrand] = useState(false);
    const [invalidCategory, setInvalidCategory] = useState(false);
    const [invalidStock, setInvalidStock] = useState(false);
    const [invalidPrice, setInvalidPrice] = useState(false);

    const [provedor, setProvedor] = useState(0);

    const getProvedores = async () => {
        if (brand) {
            const formattedBrand = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
            try {
                const res = await axios.get(`http://localhost:8000/provedores/${formattedBrand.trim().replace(/\s+/g, '')}`);
                setProvedor(res.data.IdentificadorFiscal);
            } catch (error) {
                console.log('Error fetching provedores');
                setProvedor(0);
            }
        }
    }

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
        console.log('Brand changed:', brand);
        getProvedores();
    }, [brand]);

    useEffect(() => {
        getProducts();
    }, [model]);

    const getProducts = async () => {
        try {
            const res = await axios.get(URI);
            console.log(URI);
            const product = res.data.find(product => product.Modelo === model);
            console.log(product);
            if (product) {
                setBrand(product.Provedor.NombreEmpresa);
                setCategory(product.Categoria);
                setPrice(product.Precio);
                setStock(product.ExistenciasDisponibles);
                setImage(product.Img)
                setFileName(product.Img)
            } else {
                setBrand('');
                setCategory('');
                setPrice(0);
                setStock(0);
                setImage(null);
                setFileName('');
            }
        } catch (error) {
            console.log(error);
        }
    }

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
        if (provedor === 0) {
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


        const res = await axios.put(URI + `/${model}`, {
            Categoria: category,
            Precio: price,
            ExistenciasDisponibles: stock,
            Img: fileName,
            IdentificadorFiscalProvedor: provedor
        });
        console.log(res.data)
        console.log('Product modified');
        props.handleCloseModal();
    }

    return (
        <div className="flex flex-row relative rounded-lg overflow-hidden w-4/5" data-aos="zoom-in">
            <div className="flex flex-col items-center justify-center bg-white w-1/2 py-5 overflow-hidden">
                <h1 className="text-2xl font-bold">
                    Modify Product
                </h1>
                <p className="text-md mt-3 w-1/2 text-center">
                    Fill the following fields to modify a product
                </p>
                <div className="relative w-1/2 mt-8">
                    <IoSearchOutline className="absolute left-2 top-2.5 text-gray-400"/>
                    <input
                        type="text"
                        id="model"
                        className={`border border-1 border-gray-300 focus:ring-0 focus:outline-0 w-full pl-8 remove-arrow duration-500 rounded-xl py-1 
                    ${invalidProduct ? 'border-b-red-500' : ''}`}
                        placeholder="Product Model"
                        onChange={handleModelChange}
                        value={model}
                    />
                </div>
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
                    value={brand}
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
                    value={category}
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
                            value={stock ? stock : ''}
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
                        ${invalidPrice ? 'border-b-red-500 mt-8' : 'my-8'}`}
                            placeholder="Price"
                            onChange={handlePriceChange}
                            value={price ? price : ''}
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
                    className={`flex items-center justify-center rounded-lg overflow-hidden w-1/2 border border-gray-300`}
                >
                    <input {...getInputProps()} className="w-fit"/>
                    {!lastUploadedFile && !image && (
                        <p className="text-center w-full py-2 px-3">
                            Drag the product image here
                        </p>
                    )}
                    {lastUploadedFile || image && (
                        <p className="text-center w-full py-2 px-3">
                            {`Image uploaded: ${fileName ? fileName : image}`}
                        </p>
                    )}
                </div>
                <button className={`mt-8 rounded-lg w-1/2 py-3 duration-500 bg-black text-white
                    ${invalidProduct || invalidBrand || invalidCategory || invalidStock || invalidPrice ? 'hover:bg-red-500' : 'hover:bg-white hover:text-black hover:border hover:border-black'}`}
                        onClick={handleAddProduct}>
                    Modify Product
                </button>
            </div>
            <div className="flex flex-row items-center justify-start bg-white w-1/2 py-20 overflow-hidden">
                <div className="flex flex-row justify-start items-center">
                    {lastUploadedFile || image && (
                        <img
                            src={lastUploadedFile ? lastUploadedFile : `img/caps/${image}`}
                            className="object-cover w-1/2"/>
                    )}
                    {!lastUploadedFile && !image && (
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