/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import Pdata from "../Data/base.json";
import axios from "axios";

function Hero() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        category: '',
        top: '',
        minPrice: 0,
        maxPrice: 1000
    });

    const [products, setProducts] = useState([]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log(formData);

            const { companyName, category, top, minPrice, maxPrice } = formData;
            const apiUrl = `http://localhost:8000/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
            console.log(apiUrl);
            const res = await axios.get(apiUrl);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <nav className="bg-slate-900">
                <div className="flex items-center justify-between mx-auto p-4">
                    <a href="/">
                        <span className="text-2xl font-semibold text-white">Project</span>
                    </a>
                    <div>
                        <ul className="flex space-x-8">
                            <li>
                                <a href="/" className="text-blue-300">Home</a>
                            </li>
                            <li>
                                <a href="/product" className='text-white'>Product</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='flex mt-10 p-5'>
                <div className='flex justify-center w-1/2'>
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4 w-[80%]">
                            <div>
                                <label htmlFor="companyName">Company Name</label>
                                <select
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className="w-full pl-3 py-2"
                                >
                                    <option value="">Select a company</option>
                                    <option value="AMZ">AMZ</option>
                                    <option value="FLP">FLP</option>
                                    <option value="SNP">SNP</option>
                                    <option value="MYN">MYN</option>
                                    <option value="AZO">AZO</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full pl-3 py-2"
                                >
                                    <option value="">Select a category</option>
                                    <option value="Phone">Phone</option>
                                    <option value="Pendrive">Pendrive</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Speaker">Speaker</option>
                                    <option value="Headset">Headset</option>
                                    <option value="Laptop">Laptop</option>
                                    <option value="PC">PC</option>
                                    <option value="Computer">Computer</option>
                                    <option value="TV">TV</option>
                                    <option value="Earphone">Earphone</option>
                                    <option value="Tablet">Tablet</option>
                                    <option value="Charger">Charger</option>
                                    <option value="Mouse">Mouse</option>
                                    <option value="Keypad">Keypad</option>
                                    <option value="Bluetooth">Bluetooth</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="top">Top Products</label>
                                <input
                                    type="number"
                                    id="top"
                                    name="top"
                                    value={formData.top}
                                    onChange={handleInputChange}
                                    className="w-full pl-3 py-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="minPrice">Min Price</label>
                                <input
                                    type="range"
                                    id="minPrice"
                                    name="minPrice"
                                    min="0"
                                    max="1000"
                                    value={formData.minPrice}
                                    onChange={handleInputChange}
                                    className="w-full pl-3 py-2"
                                />
                                <span className="text-gray-700">${formData.minPrice}</span>
                            </div>
                            <div>
                                <label htmlFor="maxPrice">Max Price</label>
                                <input
                                    type="range"
                                    id="maxPrice"
                                    name="maxPrice"
                                    min="0"
                                    max="1000"
                                    value={formData.maxPrice}
                                    onChange={handleInputChange}
                                    className="w-full pl-3 py-2"
                                />
                                <span className="text-gray-700">${formData.maxPrice}</span>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 rounded-md text-white bg-indigo-600"
                            >
                                Submit
                            </button>
                        </form>
                    ) : (
                        <div>Products</div>
                    )}
                </div>

            </div>
            <div className='h-72 m-5 flex gap-2'>
                {Pdata.map((data) => (
                    <div className="w-1/5 p-6 bg-slate-800" key={data.productName}>
                        <a href='/'>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.productName}</h5>
                        </a>
                        <p className="mb-3 text-gray-400">Price: {data.price}</p>
                        <p className="mb-3 text-gray-400">Rating: {data.rating}</p>
                        <p className="mb-3 text-gray-400">Discount: {data.discount}</p>
                        <p className="mb-3 text-gray-400">Availability: {data.availability}</p>
                        <a href='/' className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                            Read more
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hero;
