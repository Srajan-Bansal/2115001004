const express = require('express');
const app = express();
const port = 8000;

const productRoutes = require('./routes/product.route');

app.use('/categories', productRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
