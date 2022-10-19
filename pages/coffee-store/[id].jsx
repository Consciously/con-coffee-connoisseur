import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';
import styles from './Coffee-store.module.css';
import cls from 'classnames';
import Image from 'next/image';
import { fetchCoffeeStores } from '../../lib/coffee-stores';
import { CoffeeStoreContext } from '../../store/coffeeStore-context';
import { isEmpty } from '../../utils';
import { fetcher } from '../../lib/fetcher';

export const getStaticPaths = async () => {
	const coffeeStores = await fetchCoffeeStores();
	const paths = coffeeStores.map(store => ({
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
	const coffeeStores = await fetchCoffeeStores();
	const findCoffeeStoreById = coffeeStores.find(
		store => store.id.toString() === params.id,
	);
	return {
		props: {
			coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
		},
	};
};

const CoffeeStore = initialProps => {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const id = router.query.id;

	const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

	const {
		state: { coffeeStores },
	} = useContext(CoffeeStoreContext);

	const handleCreateCoffeeStore = async coffeeStore => {
		try {
			const { id, name, voting, imgUrl, neighborhood, address } = coffeeStore;
			const response = await fetch('/api/createCoffeeStore', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id,
					name,
					voting: 0,
					imgUrl,
					neighborhood: neighborhood || '',
					address: address || '',
				}),
			});

			const dbCoffeeStore = await response.json();
			console.log({ dbCoffeeStore });
		} catch (error) {
			console.error('Error creating coffee store', error);
		}
	};

	useEffect(() => {
		if (isEmpty(initialProps.coffeeStore)) {
			if (coffeeStores.length) {
				const coffeeStoreFromContext = coffeeStores.find(
					store => store.id.toString() === id,
				);

				if (coffeeStoreFromContext) {
					setCoffeeStore(coffeeStoreFromContext);
					handleCreateCoffeeStore(coffeeStoreFromContext);
				}
			}
		} else {
			handleCreateCoffeeStore(initialProps.coffeeStore);
		}
	}, [id, initialProps, initialProps.coffeeStore]);

	const { address, neighborhood, name, imgUrl } = coffeeStore;

	const [votingCount, setVotingCount] = useState(1);

	const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

	useEffect(() => {
		if (data && data.length) {
			console.log('data from SWR', data);
			setCoffeeStore(data[0]);
			setVotingCount(data[0].voting);
		}
	}, [data]);

	const handleUpvoteButton = () => {
		let count = votingCount + 1;
		setVotingCount(count);
	};

	if (error) {
		return <div>Something went wrong retrieving coffee store page</div>;
	}

	return (
		<div className={styles.layout}>
			<Head>
				<title>{name}</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.col1}>
					<div className={styles.backToHomeLink}>
						<Link href='/'>
							<a>
								<span>&larr;</span>
								<span>Back to home</span>
							</a>
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
					{address && (
						<div className={styles.iconWrapper}>
							<Image
								src='/static/icons/places.svg'
								width='24'
								height='24'
								alt='places icon'
							/>
							<p className={styles.text}>{address}</p>
						</div>
					)}
					{neighborhood && (
						<div className={styles.iconWrapper}>
							<Image
								src='/static/icons/nearMe.svg'
								width='24'
								height='24'
								alt='near me icon'
							/>
							<p className={styles.text}>{neighborhood}</p>
						</div>
					)}
					<div className={styles.iconWrapper}>
						<Image
							src='/static/icons/star.svg'
							width='24'
							height='24'
							alt='rating icon'
						/>
						<p className={styles.text}>{votingCount}</p>
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
