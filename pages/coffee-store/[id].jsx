import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import coffeeStoreData from '../../data/coffee-stores.json';
import Head from 'next/head';
import styles from './Coffee-store.module.css';
import cls from 'classnames';
import Image from 'next/image';

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

	const { address, name, neighbourhood, imgUrl } = coffeeStores;

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
						src={imgUrl}
						alt={name}
						width={600}
						height={360}
						className={styles.storeImg}
					/>
				</div>
				<div className={cls('glass', styles.col2)}>
					<div className={styles.iconWrapper}>
						<Image src='/static/icons/places.svg' width='24' height='24' />
						<p className={styles.text}>{address}</p>
					</div>
					<div className={styles.iconWrapper}>
						<Image src='/static/icons/nearMe.svg' width='24' height='24' />
						<p className={styles.text}>{neighbourhood}</p>
					</div>
					<div className={styles.iconWrapper}>
						<Image src='/static/icons/star.svg' width='24' height='24' />
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
