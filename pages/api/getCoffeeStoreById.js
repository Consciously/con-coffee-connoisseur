import {
	getMinifiedRecords,
	findRecordByFilter,
	table,
} from '../../lib/airtable';

const getCoffeeStoreById = async (req, res) => {
	const { id } = req.query;
	try {
		if (id) {
			const records = await findRecordByFilter(id);

			if (records.length) {
				res.status(200).json(records);
			} else {
				res.status(200).json({ message: `id could not be found` });
			}
		} else {
			res.status(400).json({ message: 'Id is missing' });
		}
	} catch (error) {
		console.error('Something went wrong', error);
		res.status(500).json({ message: 'Something went wrong', error });
	}
};

export default getCoffeeStoreById;
