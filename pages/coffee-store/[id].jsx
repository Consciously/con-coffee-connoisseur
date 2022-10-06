import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import coffeeStoreData from '../../data/coffee-stores.json';

export const getStaticProps = async ({ params }) => {
	return {
		props: {
			coffeeStore: coffeeStoreData.find(store => store.id === params.id),
		},
	};
};

export const getStaticPaths = () => {
	return {
		paths: [
			{
				params: {
					id: '0',
				},
				params: {
					id: '1',
				},
			},
		],
	};
};

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
