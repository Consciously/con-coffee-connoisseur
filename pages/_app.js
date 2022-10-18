import CoffeeStoreContextProvider from '../store/coffeeStore-context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<CoffeeStoreContextProvider>
			<Component {...pageProps} />
			<footer>
				<p> &copy; 2022 Stefan</p>
			</footer>
		</CoffeeStoreContextProvider>
	);
}

export default MyApp;
