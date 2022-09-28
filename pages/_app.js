import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
			<footer>
				<p> &copy; 2022 Stefan</p>
			</footer>
		</>
	);
}

export default MyApp;
