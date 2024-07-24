const axios = require('axios');
const auth = require('../utils/auth');

const BASE_URL = 'http://20.244.56.144/test/companies';
const companiesList = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
const categoriesList = [
	'Phone',
	'Computer',
	'TV',
	'Earphone',
	'Tablet',
	'Charger',
	'Mouse',
	'Keypad',
	'Bluetooth',
	'Pendrive',
	'Remote',
	'Speaker',
	'Headset',
	'Laptop',
	'PC',
];

const fetchProducts = async (
	company,
	category,
	limit,
	minCost,
	maxCost,
	headers
) => {
	const url = `${BASE_URL}/${company}/categories/${category}/products?top=${limit}&minPrice=${minCost}&maxPrice=${maxCost}`;
	const response = await axios.get(url, { headers });
	return response.data;
};

exports.getAllProducts = async (req, res) => {
	try {
		const { category } = req.params;
		const {
			top = 10,
			minPrice = 0,
			maxPrice = 10000,
			sortBy,
			order = 'asc',
			page = 1,
		} = req.query;

		if (!categoriesList.includes(category)) {
			return res.status(400).json({ error: 'Invalid category' });
		}

		let allProducts = [];
		const { tokenType, accessToken } = await auth.getAuthToken();
		const headers = {
			Authorization: `${tokenType} ${accessToken}`,
		};

		for (const company of companiesList) {
			const products = await fetchProducts(
				company,
				category,
				top,
				minPrice,
				maxPrice,
				headers
			);
			allProducts = allProducts.concat(products);
		}

		if (sortBy) {
			allProducts.sort((a, b) => {
				if (order === 'asc') {
					return a[sortBy] > b[sortBy] ? 1 : -1;
				} else {
					return a[sortBy] < b[sortBy] ? 1 : -1;
				}
			});
		}

		const pageSize = Number(top) | 10;
		const totalProducts = allProducts.length;
		const totalPages = Math.ceil(totalProducts / pageSize);
		const currentPage = Math.min(Math.max(Number(page), 1), totalPages);
		const paginatedProducts = allProducts.slice(
			(currentPage - 1) * pageSize,
			currentPage * pageSize
		);

		res.json({
			products: paginatedProducts,
			page: currentPage,
			totalPages,
			totalProducts,
		});
	} catch (error) {
		console.error('Error fetching products:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

exports.getProductDetails = async (req, res) => {
	try {
		const { category, productId } = req.params;

		let productDetails;
		const { tokenType, accessToken } = await auth.getAuthToken();
		const headers = {
			Authorization: `${tokenType} ${accessToken}`,
		};

		const products = await fetchProducts(
			company,
			category,
			1000,
			0,
			100000,
			headers
		);
		productDetails = products.find((product) => product.id === productId);

		if (!productDetails) {
			return res.status(404).json({ error: 'Product not found' });
		}

		res.json(productDetails);
	} catch (error) {
		console.error('Error fetching product details:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
