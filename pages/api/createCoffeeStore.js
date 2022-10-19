import {
	table,
	getMinifiedRecords,
	findRecordByFilter,
} from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
	if (req.method === 'POST') {
		const { id, name, neighborhood, address, voting, imgUrl } = req.body;
		try {
			if (id) {
				const records = await findRecordByFilter(id);

				if (records.length) {
					res.status(200).json(records);
				} else {
					if (name) {
						const createRecords = await table.create([
							{
								fields: {
									id,
									name,
									address,
									neighborhood,
									voting,
									imgUrl,
								},
							},
						]);

						const records = getMinifiedRecords(createRecords);
						res.status(201).json(records);
					} else {
						res.status(400).json({ message: 'Id or name is missing' });
					}
				}
			} else {
				res.status(400).json({ message: 'Id is missing' });
			}
		} catch (error) {
			console.error('Error creating or finding a store', error);
			res.status(400).json({ message: 'Error creating or finding a store' });
		}
	}
};

export default createCoffeeStore;
