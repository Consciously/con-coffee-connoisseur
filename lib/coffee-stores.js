const getUrlForCoffeeStores = (latLong, query, limit) => {
	return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
	try {
		const apiImgKey = 'bWQ-sPGRCFXvhHxLMPQj9WGvEL2cZYQm9UB5dQg-f04';
		const apiImgUrl = 'https://api.unsplash.com';

		const options = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: process.env.FOURSQUARE_API_KEY,
			},
		};

		const response = await fetch(
			getUrlForCoffeeStores(
				'43.64990206482973%2C-79.38448035304708',
				'coffee',
				6,
			),
			options,
		);
		const data = await response.json();
		return data.results;
	} catch (error) {
		throw new Error(`Something went wrong ${error.message}`);
	}
};
