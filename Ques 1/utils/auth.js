const axios = require('axios');

const getAuthToken = async () => {
	const response = await axios.post('http://20.244.56.144/test/auth', {
		companyName: 'GLA University',
		clientID: 'd3c04d71-cb9a-4d0c-9388-c6e63bc6e35c',
		clientSecret: 'JRhnvWmzmrAHZyTc',
		ownerName: 'Srajan Bansal',
		ownerEmail: 'srajan.bansal_cs21@gla.ac.in',
		rollNo: '2115001004',
	});

	console.log(response);

	return {
		tokenType: response.data.token_type,
		accessToken: response.data.access_token,
	};
};

module.exports = { getAuthToken };
