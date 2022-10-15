import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import coffeeStoreData from '../../data/coffee-stores.json';
import Head from 'next/head';
import styles from './Coffee-store.module.css';
import cls from 'classnames';
import Image from 'next/image';
import { fetchCoffeeStores } from '../../lib/coffee-stores';

export const getStaticPaths = async () => {
	const coffeeStores = await fetchCoffeeStores();
	const paths = coffeeStores.map(store => ({
		params: {
			id: store.fsq_id.toString(),
		},
	}));
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps = async ({ params }) => {
	const coffeeStores = await fetchCoffeeStores();

	return {
		props: {
			coffeeStores: coffeeStores.find(
				store => store.fsq_id.toString() === params.id,
			),
		},
	};
};

const CoffeeStore = ({ coffeeStores }) => {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const { location, name, imgUrl } = coffeeStores;

	const handleUpvoteButton = () => {
		console.log('handle upvote');
	};

	return (
		<div className={styles.layout}>
			<Head>
				<title>{name}</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.col1}>
					<div className={styles.backToHomeLink}>
						<Link href='/'>
							<a>Back to home</a>
						</Link>
					</div>
					<div className={styles.nameWrapper}>
						<h1 className={styles.name}>{name}</h1>
					</div>
					<Image
						src={
							imgUrl ||
							'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
						}
						alt={name}
						width={600}
						height={360}
						className={styles.storeImg}
					/>
				</div>
				<div className={cls('glass', styles.col2)}>
					<div className={styles.iconWrapper}>
						<Image
							src='/static/icons/places.svg'
							width='24'
							height='24'
							alt='places icon'
						/>
						<p className={styles.text}>{location.address}</p>
					</div>
					<div className={styles.iconWrapper}>
						<Image
							src='/static/icons/nearMe.svg'
							width='24'
							height='24'
							alt='near me icon'
						/>
						<p className={styles.text}>{location.neighborhood[0]}</p>
					</div>
					<div className={styles.iconWrapper}>
						<Image
							src='/static/icons/star.svg'
							width='24'
							height='24'
							alt='rating icon'
						/>
						<p className={styles.text}>1</p>
					</div>
					<button className={styles.upvoteButton} onClick={handleUpvoteButton}>
						UpVote!
					</button>
				</div>
			</div>
		</div>
	);
};

export default CoffeeStore;
