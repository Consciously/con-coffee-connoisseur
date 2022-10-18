import { createContext, useReducer } from 'react';
import { ACTION_TYPES } from './coffeeStore-types';

export const CoffeeStoreContext = createContext({
	latLong: '',
	coffeeStores: [],
});

const storeReducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_LAT_LONG: {
			return { ...state, latLong: action.payload.latLong };
		}
		case ACTION_TYPES.SET_COFFEE_STORES: {
			return { ...state, coffeeStores: action.payload.coffeeStores };
		}
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

const CoffeeStoreContextProvider = ({ children }) => {
	const initialState = {
		latLong: '',
		coffeeStores: [],
	};

	const [state, dispatch] = useReducer(storeReducer, initialState);

	return (
		<CoffeeStoreContext.Provider value={{ state, dispatch }}>
			{children}
		</CoffeeStoreContext.Provider>
	);
};

export default CoffeeStoreContextProvider;
