import { useState, useContext } from 'react';
import { ACTION_TYPES } from '../store/coffeeStore-types';
import { CoffeeStoreContext } from '../store/coffeeStore-context';
import Head from 'next/head';
import Image from 'next/image';
import useTrackLocation from '../hooks/use-track-location';
import Banner from '../components/Banner/Banner.component';
import { fetchCoffeeStores } from '../lib/coffee-stores';
import Card from '../components/Card/Card.component';
import styles from '../styles/Home.module.css';

export const getStaticProps = async () => {
	const coffeeStores = await fetchCoffeeStores();

	return {
		props: {
			coffeeStores,
		},
	};
};

export default function Home(props) {
	const { dispatch, state } = useContext(CoffeeStoreContext);

	const { coffeeStores, latLong } = state;
	const [coffeeStoreError, setCoffeeStoreError] = useState(null);
	const {
		locationErrorMsg,
		setLocationErrorMsg,
		isFindingLocation,
		setIsFindingLocation,
	} = useTrackLocation();

	const handleOnBannerBtnClick = () => {
		const getCoffeeStores = async () => {
			if (latLong) {
				try {
					setIsFindingLocation(true);
					setLocationErrorMsg('');
					const res = await fetch(
						`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`,
					);

					const coffeeStores = await res.json();
					dispatch({
						type: ACTION_TYPES.SET_COFFEE_STORES,
						payload: {
							coffeeStores,
						},
					});
					setCoffeeStoreError('');
					setIsFindingLocation(false);
				} catch (error) {
					setCoffeeStoreError(error.message);
					setIsFindingLocation(false);
				}
			}
		};

		getCoffeeStores();
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta
					name='description'
					content='Allows you to discover coffee stores'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<Banner
					buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
					handleOnClick={handleOnBannerBtnClick}
				/>
				{locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
				{coffeeStoreError && <p>Something went wrong: {coffeeStoreError}</p>}
				<div className={styles.heroImage}>
					<Image
						src='/static/hero-image.png'
						width={700}
						height={400}
						alt='hero-image'
					/>
				</div>
				{coffeeStores.length >= 1 && (
					<div className={styles.sectionWrapper}>
						<h2 className={styles.heading2}>Stores near me</h2>
						<div className={styles.cardLayout}>
							{coffeeStores.map(store => {
								return (
									<Card
										key={store.id}
										coffeeStore={store}
										href={`/coffee-store/${store.id}`}
										className={styles.card}
									/>
								);
							})}
						</div>
					</div>
				)}
				{props.coffeeStores.length && (
					<div className={styles.sectionWrapper}>
						<h2 className={styles.heading2}>Toronto stores</h2>
						<div className={styles.cardLayout}>
							{props.coffeeStores.map(store => (
								<Card
									key={store.id}
									coffeeStore={store}
									href={`/coffee-store/${store.id}`}
									className={styles.card}
								/>
							))}
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
