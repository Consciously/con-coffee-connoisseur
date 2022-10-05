import React from 'react';
import { useRouter } from 'next/router';

const CoffeeStore = () => {
	const router = useRouter();
	const { id } = router.query;
	return <div>CoffeeStore {id}</div>;
};

export default CoffeeStore;
