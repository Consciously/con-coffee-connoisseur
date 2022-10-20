import {
	table,
	findRecordByFilter,
	getMinifiedRecords,
} from '../../lib/airtable';

const favoriteCoffeeStoreById = async (req, res) => {
	if (req.method === 'PUT') {
		try {
			const { id } = req.body;

			if (id) {
				const records = await findRecordByFilter(id);
				if (records.length) {
					const record = records[0];

					const calculateVoting = +record.voting + 1;

					const updateRecord = await table.update([
						{
							id: record.recordId,
							fields: {
								voting: calculateVoting,
							},
						},
					]);

					if (updateRecord) {
						const minifiedRecords = getMinifiedRecords(updateRecord);
						res.status(200).json(minifiedRecords);
					}
				} else {
					res.status(400).json({ message: 'Coffee store does not exist' });
				}
			} else {
				res.status(400).json({ message: 'Id does not exist' });
			}
		} catch (error) {
			res.status(500).json({ message: 'Error upvoting coffee store', error });
		}
	}
};

export default favoriteCoffeeStoreById;
