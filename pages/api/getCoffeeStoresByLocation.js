import { fetchCoffeeStores } from '../../lib/coffee-stores';

const getCoffeeStoresByLocation = async (req, res) => {
	try {
		const { latLong, limit, radius } = req.query;

		const response = await fetchCoffeeStores(latLong, limit, radius);
		res.status(200).json(response);
	} catch (error) {
		console.err('There is an error: ', error);
		res.status(500).json({ message: 'Oh no! Something went wrong', error });
	}
};

export default getCoffeeStoresByLocation;
