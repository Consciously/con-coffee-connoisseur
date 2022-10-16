import { createApi } from 'unsplash-js';

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
	return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
	const photos = await unsplash.search.getPhotos({
		query: 'coffee shop',
		perPage: 30,
		color: 'green',
	});

	const unsplashResults = photos.response.results;

	return unsplashResults.map(result => result.urls['small']);
};

export const fetchCoffeeStores = async () => {
	try {
		const photos = await getListOfCoffeeStorePhotos();
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
		return data.results.map((result, idx) => {
			const neighborhood = result.location.neighborhood;
			return {
				id: result.fsq_id,
				address: result.location.address,
				name: result.name,
				neighborhood: neighborhood?.length ? neighborhood[0] : '',
				imgUrl: photos.length ? photos[idx] : null,
			};
		});
	} catch (error) {
		throw new Error(`Something went wrong ${error.message}`);
	}
};
