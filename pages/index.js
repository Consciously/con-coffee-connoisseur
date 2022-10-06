import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/Banner/Banner.component';
import coffeeStoresData from '../data/coffee-stores.json';
import Card from '../components/Card/Card.component';
import styles from '../styles/Home.module.css';

export const getStaticProps = async context => {
	return {
		props: {
			coffeeStores: coffeeStoresData,
		},
	};
};

export default function Home({ coffeeStores }) {
	const handleOnBannerBtnClick = () => {
		console.log('Hi banner button');
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<Banner
					buttonText='View stores nearby'
					handleOnClick={handleOnBannerBtnClick}
				/>
				<div className={styles.heroImage}>
					<Image
						src='/static/hero-image.png'
						width={700}
						height={400}
						alt='hero-image'
					/>
				</div>
				{coffeeStores.length && (
					<>
						<h2 className={styles.heading2}>Toronto stores</h2>
						<div className={styles.cardLayout}>
							{coffeeStores.map(store => (
								<Card key={store.id} store={store} />
							))}
						</div>
					</>
				)}
			</main>
		</div>
	);
}
