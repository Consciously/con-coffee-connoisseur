import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CoffeeStore = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<div>
			CoffeeStore {id}
			<Link href='/'>
				<a>Back to home</a>
			</Link>
			<Link href='/coffee-store/id'>
				<a>Go to page dynamic</a>
			</Link>
		</div>
	);
};

export default CoffeeStore;
