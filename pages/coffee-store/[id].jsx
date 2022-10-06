import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import coffeeStoreData from '../../data/coffee-stores.json';
import Head from 'next/head';

export const getStaticPaths = () => {
	const paths = coffeeStoreData.map(store => ({
		params: {
			id: store.id.toString(),
		},
	}));
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps = async ({ params }) => {
	return {
		props: {
			coffeeStores: coffeeStoreData.find(
				store => store.id.toString() === params.id,
			),
		},
	};
};

const CoffeeStore = ({ coffeeStores }) => {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const { address, name, neighbourhood } = coffeeStores;
	return (
		<div>
			<Head>
				<title>{name}</title>
			</Head>
			<Link href='/'>
				<a>Back to home</a>
			</Link>
			<p>{address}</p>
			<p>{name}</p>
			<p>{neighbourhood}</p>
		</div>
	);
};

export default CoffeeStore;
