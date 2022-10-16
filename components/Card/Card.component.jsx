import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cls from 'classnames';
import styles from './Card.module.css';

const Card = ({ store }) => {
	const { name, imgUrl, id } = store;

	return (
		<Link href={`/coffee-store/${id}`}>
			<a className={styles.cardLink}>
				<div className={cls('glass', styles.container)}>
					<div className={styles.cardHeaderWrapper}>
						<h2 className={styles.cardHeader}>{name}</h2>
					</div>
					<div className={styles.cardImageWrapper}>
						<Image
							className={styles.cardImage}
							src={
								imgUrl ||
								'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
							}
							width={260}
							height={160}
							alt={name}
						/>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default Card;
