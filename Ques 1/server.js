const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

const productRoutes = require('./routes/product.route');

app.use(
	cors({
		origin: 'http://localhost5173',
	})
);

app.use('/categories', productRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
